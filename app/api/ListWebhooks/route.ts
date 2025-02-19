import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

export async function GET() {
  try {
    const response = await fetch("https://payments.yoco.com/api/webhooks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
    });
    console.log(response);

    const data = await response.json();
    console.log(data);

    const subscriptions = data.subscriptions;
    console.log(subscriptions);
    const existingWebhooks: any[] = subscriptions.filter(
      (sub: { name: string }) => sub.name === "Await-Webhook"
    );

    if (existingWebhooks.length > 1) {
      for (let i = 1; i < existingWebhooks.length; i++) {
        const sub = existingWebhooks[i];
        try {
          const response = await fetch("https://sxnics.com/api/DeleteWebhook", {
            method: "DELETE",
            body: JSON.stringify({
              id: sub.id,
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to delete webhook with ID: ${sub.id}`);
          }

          console.log(`Deleted webhook with ID: ${sub.id}`);
        } catch (error) {
          console.error(`Error deleting webhook with ID: ${sub.id}:`, error);
        }
      }
    }

    const hookExists =
      subscriptions.find(
        (subscription: { name: string }) =>
          subscription.name === "Await-Webhook"
      ) !== undefined;

    return NextResponse.json({ hookExists, subscriptions });
  } catch (error) {
    console.error(error);
  }
}
