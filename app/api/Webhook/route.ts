import CheckoutDetail from "@/models/CheckoutDetail";
import connectMongo from "@/utils/ConnectMongo";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.payload.status === "succeeded") {
      const metadata = body.payload.metadata;

      await connectMongo();
      const result = await CheckoutDetail.create({
        fullname: metadata.fullname,
        email: metadata.email,
        phone: metadata.phone,
        streetAddress: metadata.streetAddress,
        suburb: metadata.suburb,
        city: metadata.city,
        postalCode: metadata.postalCode,
        items: metadata.items,
        total: metadata.total,
      });

      await sendConfirmationEmail(metadata.email, result._id.toString(), metadata.total); 

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

async function sendConfirmationEmail(email: string, orderId: string, amount: number) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions1 = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Payment Confirmation',
    text: `Your payment for order ${orderId} of R${amount / 100} has been successfully processed.`,
  };

  const mailOptions2 = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Order Submitted',
    text: `Order submitted for ${orderId} of R${amount / 100}`,
  }

  try {
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);
    console.log('Confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}
