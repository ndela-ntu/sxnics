import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://payments.yoco.com/api/webhooks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    console.log(data);
    const subscriptions = data.subscriptions;
    const hookExists =
      subscriptions.find(
        (subscription: {
          id: string;
          name: string;
          url: string;
          mode: string;
        }) => subscription.name === "Checkout-Webhook"
      ) !== undefined;

    /*const subscriptions = data.subscriptions;
  subscriptions.forEach(async (sub: { id: string }) => {
    const response = await fetch("http://localhost:3000/api/DeleteWebhook", {
      method: "DELETE",
      body: JSON.stringify({
        id: sub.id,
      }),
    });

    const result = await response.json();

    console.log(result.message);
  });*/

    return NextResponse.json({ hookExists });
  } catch (error) {
    console.error(error);
  }
}
