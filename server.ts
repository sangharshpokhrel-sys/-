import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer });

  app.use(express.json());

  // WebSocket connection handling
  const clients = new Map<string, WebSocket>();

  wss.on("connection", (ws) => {
    let clientId: string | null = null;

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === "subscribe" && data.email) {
          clientId = data.email;
          clients.set(clientId!, ws);
          console.log(`Client subscribed: ${clientId}`);
        }
      } catch (e) {
        console.error("WS Message Error:", e);
      }
    });

    ws.on("close", () => {
      if (clientId) clients.delete(clientId);
    });
  });

  // API Routes
  app.post("/api/book", async (req, res) => {
    const { service, date, time, name, phone, email } = req.body;

    // Notify client via WebSocket about "Received" status immediately
    // Using phone as client identifier if email is missing
    const clientId = email || phone;
    const client = clients.get(clientId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "status_update", status: "Received", message: "We have received your request." }));
      
      // Simulate status progression for real-time demo
      setTimeout(() => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "status_update", status: "Processing", message: "Our practitioner is reviewing your schedule." }));
        }
      }, 3000);

      setTimeout(() => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "status_update", status: "Confirmed", message: "Your booking is now officially confirmed!" }));
        }
      }, 7000);
    }

    // Check for Resend API Key and email availability
    const resendKey = process.env.RESEND_API_KEY;
    
    if (!resendKey || !email) {
      console.log(`Booking received for ${name} (${phone}). skipping email notification.`);
      return res.json({ 
        status: "ok", 
        message: "Booking received! (Real-time updates active)",
        details: { service, date, time, name }
      });
    }

    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: 'Spiritual Services <onboarding@resend.dev>',
        to: [email],
        subject: `Booking Confirmed: ${service}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #ff9933; text-align: center;">नमस्ते ${name},</h1>
            <p style="font-size: 16px; color: #333;">तपाईँको बुकिङ अनुरोध सफलतापूर्वक प्राप्त भएको छ।</p>
            <div style="background-color: #fffaf0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h2 style="font-size: 18px; margin-top: 0; color: #4a2c0a;">बुकिङ विवरण (Booking Details):</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>सेवा:</strong> ${service}</li>
                <li style="margin-bottom: 10px;"><strong>मिति:</strong> ${date}</li>
                <li style="margin-bottom: 10px;"><strong>समय:</strong> ${time}</li>
              </ul>
            </div>
            <p style="color: #666; font-size: 14px;">हामी तपाईँलाई चाँडै ह्वाट्सएप वा फोन मार्फत सम्पर्क गर्नेछौँ।</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="text-align: center; color: #999; font-size: 12px;">ॐ नमो भगवते वासुदेवाय 🙏</p>
          </div>
        `,
      });

      res.json({ status: "ok", message: "Booking confirmed and email sent!" });
    } catch (err) {
      console.error("Booking API Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
