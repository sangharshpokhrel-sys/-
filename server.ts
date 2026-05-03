import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";
import cron from "node-cron";
import { addDays, format, isSameDay, parseISO } from "date-fns";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  status: "Received" | "Processing" | "Confirmed";
  reminderSent: boolean;
}

const bookings: Booking[] = [];

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
        if (data.type === "subscribe") {
          clientId = data.email || data.phone;
          if (clientId) {
            clients.set(clientId, ws);
            console.log(`Client subscribed: ${clientId}`);
          }
        }
      } catch (e) {
        console.error("WS Message Error:", e);
      }
    });

    ws.on("close", () => {
      if (clientId) clients.delete(clientId);
    });
  });

  // Cron job for reminders (runs every minute for demo, normally would be more frequent check or once a day)
  cron.schedule("* * * * *", async () => {
    const tomorrow = addDays(new Date(), 1);
    const tomorrowStr = format(tomorrow, "yyyy-MM-dd");
    
    console.log(`Checking for reminders for ${tomorrowStr}...`);

    for (const booking of bookings) {
      if (booking.status === "Confirmed" && booking.date === tomorrowStr && !booking.reminderSent) {
        console.log(`Sending reminder for booking ${booking.id} to ${booking.name}`);
        
        const clientId = booking.email || booking.phone;
        const client = clients.get(clientId);

        // In-App Reminder via WebSocket
        if (client && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ 
            type: "reminder", 
            title: "Reminder",
            message: `Your ${booking.service} is scheduled for tomorrow at ${booking.time}.`,
            bookingId: booking.id
          }));
        }

        // Email Reminder via Resend
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey && booking.email) {
          try {
            const resend = new Resend(resendKey);
            await resend.emails.send({
              from: 'Spiritual Reminders <onboarding@resend.dev>',
              to: [booking.email],
              subject: `Reminder: Your ${booking.service} Appointment is Tomorrow`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h1 style="color: #ff9933; text-align: center;">नमस्ते ${booking.name},</h1>
                  <p style="font-size: 16px; color: #333;">तपाईँको भोलिको बुकिङ बारे सम्झाउनी।</p>
                  <div style="background-color: #fffaf0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h2 style="font-size: 18px; margin-top: 0; color: #4a2c0a;">बुकिङ विवरण (Booking Details):</h2>
                    <ul style="list-style: none; padding: 0;">
                      <li style="margin-bottom: 10px;"><strong>सेवा:</strong> ${booking.service}</li>
                      <li style="margin-bottom: 10px;"><strong>मिति:</strong> ${booking.date} (भोलि)</li>
                      <li style="margin-bottom: 10px;"><strong>समय:</strong> ${booking.time}</li>
                      <li style="margin-bottom: 10px;"><strong>बुकिङ आइडी (ID):</strong> <span style="font-family: monospace; background: #eee; padding: 2px 4px; border-radius: 4px;">${booking.id}</span></li>
                    </ul>
                  </div>
                  <p style="color: #666; font-size: 14px;">हामी तपाईँको सेवाका लागि प्रतिक्षारत छौँ।</p>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                  <p style="text-align: center; color: #999; font-size: 12px;">ॐ नमो भगवते वासुदेवाय 🙏</p>
                </div>
              `,
            });
            console.log(`Email reminder sent to ${booking.email}`);
          } catch (emailErr) {
            console.error("Email Reminder Error:", emailErr);
          }
        }

        booking.reminderSent = true;
      }
    }
  });

  // API Routes
  app.post("/api/book", async (req, res) => {
    const { service, date, time, name, phone, email } = req.body;
    const bookingId = Math.random().toString(36).substring(7);

    const newBooking: Booking = {
      id: bookingId,
      service,
      date,
      time,
      name,
      phone,
      email,
      status: "Received",
      reminderSent: false
    };

    bookings.push(newBooking);

    // Notify client via WebSocket about "Received" status immediately
    const clientId = email || phone;
    const client = clients.get(clientId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "status_update", status: "Received", message: "We have received your request." }));
      
      // Simulate status progression for real-time demo
      setTimeout(() => {
        newBooking.status = "Processing";
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "status_update", status: "Processing", message: "Our practitioner is reviewing your schedule." }));
        }
      }, 3000);

      setTimeout(async () => {
        newBooking.status = "Confirmed";
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "status_update", status: "Confirmed", message: "Your booking is now officially confirmed!" }));
        }

        // Send Final Confirmation Email
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey && email) {
          try {
            const resend = new Resend(resendKey);
            await resend.emails.send({
              from: 'Spiritual Services <onboarding@resend.dev>',
              to: [email],
              subject: `Booking CONFIRMED: ${service}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fdfcfb;">
                  <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 40px;">🚩</span>
                  </div>
                  <h1 style="color: #4a2c0a; text-align: center;">शुभकामना, ${name}!</h1>
                  <p style="font-size: 16px; color: #333; text-align: center;">तपाईँको बुकिङ अहिले <strong>सुनिश्चित (Confirmed)</strong> भएको छ।</p>
                  
                  <div style="background-color: #fffaf0; padding: 20px; border: 2px solid #ff9933; border-radius: 12px; margin: 25px 0;">
                    <h2 style="font-size: 18px; margin-top: 0; color: #ff9933; text-transform: uppercase; letter-spacing: 1px;">बुकिङ विबरण (Confirmed Details):</h2>
                    <ul style="list-style: none; padding: 0; font-size: 15px;">
                      <li style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong>सेवा:</strong> ${service}</li>
                      <li style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong>मिति:</strong> ${date}</li>
                      <li style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong>समय:</strong> ${time}</li>
                      <li style="margin-bottom: 12px;"><strong>बुकिङ आइडी (Booking ID):</strong> <span style="font-family: monospace; background: #fff; border: 1px solid #ff9933; padding: 2px 6px; border-radius: 4px; color: #ff9933;">${newBooking.id}</span></li>
                    </ul>
                  </div>
                  
                  <p style="color: #666; font-size: 14px; line-height: 1.6;">हाम्रा विद्वानहरू तपाईँको सेवाका लागि तयारी अवस्थामा रहनेछन्। यदि केहि परिवर्तन गर्नु परेमा कृपया हामीलाई समयमै जानकारी गराउनुहोला।</p>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 20px;">
                    <p style="color: #999; font-size: 12px; font-style: italic;">ॐ शान्ति: शान्ति: शान्ति: 🙏</p>
                  </div>
                </div>
              `,
            });
            console.log(`Final confirmation email sent to ${email}`);
          } catch (err) {
            console.error("Final Confirmation Email Error:", err);
          }
        }
      }, 7000);
    }

    // Initial "Request Received" Email
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && email) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: 'Spiritual Services <onboarding@resend.dev>',
          to: [email],
          subject: `Booking Request Received: ${service}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h1 style="color: #ff9933; text-align: center;">नमस्ते ${name},</h1>
              <p style="font-size: 16px; color: #333;">तपाईँको बुकिङ अनुरोध सफलतापूर्वक <strong>प्राप्त (Received)</strong> भएको छ।</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9933;">
                <h2 style="font-size: 16px; margin-top: 0; color: #4a2c0a;">प्रक्रियामा रहेको विवरण:</h2>
                <ul style="list-style: none; padding: 0;">
                  <li style="margin-bottom: 8px;"><strong>सेवा:</strong> ${service}</li>
                  <li style="margin-bottom: 8px;"><strong>मिति:</strong> ${date}</li>
                  <li style="margin-bottom: 8px;"><strong>समय:</strong> ${time}</li>
                  <li style="margin-bottom: 8px;"><strong>बुकिङ आइडी (ID):</strong> <span style="font-family: monospace;">${bookingId}</span></li>
                </ul>
              </div>
              <p style="color: #666; font-size: 14px;">हाम्रा प्रतिनिधिले तपाईँको समय तालिका समीक्षा गर्दैछन्। बुकिङ सुनिश्चित भएपछि तपाईँलाई अर्को इमेल पठाइनेछ।</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="text-align: center; color: #999; font-size: 12px;">धन्यवाद, Spiritual Services Team 🙏</p>
            </div>
          `,
        });
      } catch (err) {
        console.error("Initial Request Email Error:", err);
      }
    }

    res.json({ status: "ok", message: "Booking process started." });
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
