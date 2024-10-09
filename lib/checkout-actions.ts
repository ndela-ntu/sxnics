"use server";

import CheckoutDetail from "@/models/CheckoutDetail";
import connectMongo from "@/utils/ConnectMongo";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

const ItemSchema = z.object({
  id: z.number(),
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
  postalCode: z.string().min(2, "Zip code must be at least 2 characters"),
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
    console.log(validatedFields.error.flatten().fieldErrors);
    return <CheckoutFormState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missed fields, failed to create checkout.",
      isSuccess: false,
    };
  }

  let redirectURL = "/shop/failure";

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
    const {hookExists, subscriptions} = await checkWHExists();
    console.log(hookExists, subscriptions);
    if (!hookExists) {
      const mode = await registerWebhook();
      console.log(mode);

      if (mode === "test" || mode === "live") {
        const response = await handleCheckout(metadata);
        redirectURL = response.redirectUrl;
      } else {
        throw new Error("Unable to register hook");
      }
    } else {
      const response = await handleCheckout(metadata);
      redirectURL = response.redirectUrl;
    }
  } catch (e) {
    return <CheckoutFormState>{
      message: "Error from server",
      isSuccess: false,
      errors: [],
    };
  }
  console.log(redirectURL);
  redirect(redirectURL);
}

const BASE_URL = 'https://sxnics.com';
const LOCAL_URL = 'http://localhost:3000';

const checkWHExists = async () => {
  try {
    console.log("List webhooks");
    const response = await fetch(`${BASE_URL}/api/ListWebhooks`, {
      method: "GET",
    });

    const data = await response.json();

    //return data.hookExists;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const registerWebhook = async () => {
  try {
    console.log("Register webhook");
    const response = await fetch(`${BASE_URL}/api/RegisterWebhook`, {
      method: "POST",
    });

    const data = await response.json();

    return data.mode;
  } catch (error) {
    console.error(error);
  }
};

const handleCheckout = async (metadata: {
  fullname: string;
  email: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  city: string;
  postalCode: string;
  items: { id: number; total: number; quantity: number }[];
  total: number;
}) => {
  try {
    console.log("Create checkout");
    const response = await fetch(`${BASE_URL}/api/CreateCheckout`, {
      method: "POST",
      body: JSON.stringify({
        amount: metadata.total * 100,
        currency: "ZAR",
        metadata: {uuid: uuidv4(), ...metadata},
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
