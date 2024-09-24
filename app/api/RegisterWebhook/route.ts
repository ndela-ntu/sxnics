import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const response = await fetch("https://payments.yoco.com/api/webhooks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
    },
    body: JSON.stringify({
      name: "Checkout-Webhook",
      url: process.env.WEBHOOK_URL,
    }),
  });
  const data = await response.json();
  alert(data);

  return NextResponse.json({ mode: data.mode });
}
