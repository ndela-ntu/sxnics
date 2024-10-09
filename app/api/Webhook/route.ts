import sendConfirmationEmail from "@/lib/send-confirmation";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.payload.status === "succeeded") {
      const metadata = body.payload.metadata;
      const itemsArray: { id: number; total: number; quantity: number }[] =
        metadata.items;

      const { data, error } = await supabase
        .from("checkout_details")
        .insert({
          fullname: metadata.fullname,
          email: metadata.email,
          phone: metadata.phone,
          streetAddress: metadata.streetAddress,
          suburb: metadata.suburb,
          city: metadata.city,
          postalCode: metadata.postalCode,
          items: JSON.stringify(itemsArray),
          total: metadata.total,
        })
        .select("id");

      itemsArray.forEach(async (item) => {
        const { data: shopItem, error } = await supabase
          .from("shop_items")
          .select("*")
          .eq("id", item.id)
          .single();

        if (error) {
          throw new Error("Item not found");
        }
        await supabase
          .from("shop_items")
          .update({ quantity: shopItem.quantity - item.quantity });
      });

      const { id } = data![0];
      await sendConfirmationEmail(metadata.email, id, metadata.total);

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
