import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
      cancelUrl: "https://sxnics.vercel.app/shop/checkout",
      successUrl: "https://sxnics.vercel.app/shop/success",
      failureUrl: "https://sxnics.vercel.app/shop/failure",
    }),
  });

  const data = await response.json();
  console.log(data);

  // Redirect URL for Yoco checkout page
  const redirectUrl = data.redirectUrl;

  return NextResponse.json({ redirectUrl });
}
