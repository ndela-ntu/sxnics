import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    alert(body);

    if (body.event === "payment.succeeded") {
      const paymentDetails = body.data;

      // Call the function to handle checkout submission
      await submitCheckoutDetails(paymentDetails);

      return NextResponse.json({
        status: "success",
        message: "Payment processed and checkout details submitted",
      });
    }

    return NextResponse.json(
      { status: "ignored", message: "Event ignored" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error handling webhook event:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to process event" },
      { status: 500 }
    );
  }
}
