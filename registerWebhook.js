import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config();

async function registerWebhook() {
  const webhookUrl = process.env.WEBHOOK_URL;

  try {
    const response = await fetch("https://payments.yoco.com/api/webhooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
      body: JSON.stringify({
        name: "Checkout-Webhook",
        url: webhookUrl,
      }),
    });

    const data = await response.json();
    console.log("Webhook registered:", data);
  } catch (error) {
    console.error("Failed to register webhook:", error);
  }
}

registerWebhook();
