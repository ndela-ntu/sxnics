import sendConfirmationEmail from "@/lib/send-confirmation";
import CheckoutDetail from "@/models/CheckoutDetail";
import ShopItem from "@/models/ShopItem";
import connectMongo from "@/utils/ConnectMongo";
import { NextRequest, NextResponse } from "next/server";

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

      metadata.items.forEach(
        async (item: { id: string; quantity: number}) => {
          const shopItem = await ShopItem.findById(item.id)
          await ShopItem.findByIdAndUpdate(item.id, {
            quantity: shopItem.quantity - item.quantity,
          });
        }
      );

      await sendConfirmationEmail(
        metadata.email,
        result._id.toString(),
        metadata.total
      );

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
