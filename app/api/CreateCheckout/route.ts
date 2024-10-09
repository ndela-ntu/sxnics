import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, metadata } = await req.json(); // Expecting payment details from the frontend

    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        metadata,
        cancelUrl: "https://sxnics.com/shop/checkout",
        successUrl: "https://sxnics.com/shop/success",
        failureUrl: "https://sxnics.com/shop/failure",
      }),
    });

    const data = await response.json();
    console.log(data);

    // Redirect URL for Yoco checkout page
    const redirectUrl = data.redirectUrl;

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error(error);
  }
}
