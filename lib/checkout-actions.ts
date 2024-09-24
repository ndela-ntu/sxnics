"use server";

import CheckoutDetail from "@/models/CheckoutDetail";
import connectMongo from "@/utils/ConnectMongo";
import { redirect } from "next/navigation";
import { z } from "zod";

const ItemSchema = z.object({
  id: z.string(),
  total: z.number().positive(),
  quantity: z.number().int().positive(),
});

const CheckoutSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine(
    (val) => {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      return phoneRegex.test(val);
    },
    { message: "Invalid phone number" }
  ),
  streetAddress: z.string().min(5, "Address must be at least 5 characters"),
  suburb: z.string().min(2, "City must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(5, "Zip code must be at least 5 characters"),
  items: z.array(ItemSchema).nonempty("At least one item is required"),
  total: z.number().positive("Total must be a positive number"),
});

export type CheckoutFormState = {
  errors: {
    fullname?: string[];
    email?: string[];
    phone?: string[];
    streetAddress?: string[];
    suburb?: string[];
    city?: string[];
    postalCode?: string[];
  };
  message?: string | null;
  isSuccess?: boolean;
};

export async function saveCheckoutDetails(
  prevState: CheckoutFormState,
  formData: FormData
) {
  const validatedFields = CheckoutSchema.safeParse({
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    streetAddress: formData.get("streetAddress"),
    suburb: formData.get("suburb"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    items: JSON.parse(formData.get("items") as string),
    total: parseFloat(formData.get("total") as string),
  });

  if (!validatedFields.success) {
    return <CheckoutFormState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missed fields, failed to create checkout.",
      isSuccess: false,
    };
  }

  try {
    const {
      fullname,
      email,
      phone,
      streetAddress,
      suburb,
      city,
      postalCode,
      items,
      total,
    } = validatedFields.data;

    const metadata = {
      fullname,
      email,
      phone,
      streetAddress,
      suburb,
      city,
      postalCode,
      items,
      total,
    };

    const hookExists = await checkoutWHExists();
    let redirectURL;
    if (!hookExists) {
      const mode = await registerWebhook();

      if (mode === "live") {
        redirectURL = await handleCheckout(metadata);
      } else {
        throw new Error("Unable to register hook");
      }
    } else {
      redirectURL = handleCheckout(metadata);
    }

    /*await connectMongo();
    await CheckoutDetail.create({
      fullname,
      email,
      phone,
      streetAddress,
      suburb,
      city,
      postalCode,
      items,
      total,
    });*/
    redirect(redirectURL);
  } catch (e) {
    return <CheckoutFormState>{
      message: "Error from server",
      isSuccess: false,
      errors: []
    };
  }
}

const checkoutWHExists = async () => {
  const response = await fetch("/api/ListWebhooks", {
    method: "GET",
  });

  const data = await response.json();

  return data.hookExists;
};

const registerWebhook = async () => {
  const response = await fetch("api/RegisterWebhook", {
    method: "POST",
  });

  const data = await response.json();

  return data.mode;
};

const handleCheckout = async (metadata: {
  fullname: string;
  email: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  city: string;
  postalCode: string;
  items: { id: string; total: number; quantity: number }[];
  total: number;
}) => {
  const response = await fetch("/api/CreateCheckout", {
    method: "POST",
    body: JSON.stringify({
      amount: 900,
      currency: "ZAR",
      metadata,
    }),
  });

  const data = await response.json();
  return data;
};
