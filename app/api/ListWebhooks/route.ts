import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://payments.yoco.com/api/webhooks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
    },
  });

  const data = await response.json();

  console.log(data);
  // Redirect URL for Yoco checkout page
  const subscriptions = data.subscriptions;
  const hookExists =
    subscriptions.find(
      (subscription: { id: string; name: string; url: string; mode: string }) =>
        subscription.name === "Checkout-Webhook"
    ) !== undefined;

  return NextResponse.json({ hookExists });
}
