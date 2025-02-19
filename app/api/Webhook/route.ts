import sendConfirmationEmail from "@/lib/send-confirmation";
import { IShopItemVariant } from "@/models/ShopItemVariant";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.payload.status === "succeeded") {
      console.log("Succeeded");
      const metadata = body.payload.metadata;
      const { data } = await supabase
        .from("checkout_details")
        .select("*")
        .eq("uuid", metadata.uuid);
      const itemsArray: { id: number; total: number; quantity: number }[] =
        metadata.items;

      if (data === null || data.length === 0) {
        const { data, error } = await supabase
          .from("checkout_details")
          .insert({
            uuid: metadata.uuid,
            fullname: metadata.fullname,
            email: metadata.email,
            phone: metadata.phone,
            streetAddress: metadata.streetAddress,
            suburb: metadata.suburb,
            city: metadata.city,
            postalCode: metadata.postalCode,
            items: itemsArray,
            total: metadata.total,
          })
          .select("id");

        if (error) {
          throw new Error(error?.message);
        }

        let orderedVariants: IShopItemVariant[] = [];
        itemsArray.forEach(async (item) => {
          const { data: shopItemVariant, error } = await supabase
            .from("shop_item_variant")
            .select("*, shop_items(*), color(*), size(*)")
            .eq("id", item.id)
            .single();

          if (error) {
            throw new Error("Item not found");
          }

          orderedVariants.push(shopItemVariant);
          
          console.log(`Route1: ${shopItemVariant}`);

          const quantity = shopItemVariant.quantity > 0 ? shopItemVariant.quantity - item.quantity : 0;

          await supabase
            .from("shop_item_variant")
            .update({ quantity })
            .eq("id", item.id);
        });

        console.log(`Route2: ${orderedVariants}`);

        await sendConfirmationEmail(
          metadata.email,
          orderedVariants,
          metadata.total
        );
      }

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
