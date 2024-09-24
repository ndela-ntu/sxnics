"use client";

import { useCart } from "@/context/CartContext";
import { useItemTotals } from "@/context/ItemTotalsContext";
import { CheckoutFormState, saveCheckoutDetails } from "@/lib/checkout-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CheckoutForm() {
  const { cart } = useCart();
  const { itemTotals } = useItemTotals();
  const { pending } = useFormStatus();

  const initialState: CheckoutFormState = {
    message: null,
    errors: {},
  };

  const [state, dispatch] = useFormState(saveCheckoutDetails, initialState);

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <span>Cart is empty.</span>
        <Link className="bg-white text-black px-2.5 py-1.5" href="/shop">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <form
      action={(formData) => {
        let items = itemTotals.map((itemTotal) => {
          const cartItem = cart.find(
            (cartItem) => cartItem.id.toString() == itemTotal.id
          );

          if (itemTotal.id === cartItem?.id.toString()) {
            return {
              id: itemTotal.id,
              total: itemTotal.total,
              quantity: itemTotal.total / cartItem.price,
            };
          }

          return { id: itemTotal.id, total: itemTotal.total, quantity: 1 };
        });
        const total = items.reduce((a, v) => a + v.total, 0);
        formData.append("items", JSON.stringify(items));
        formData.append("total", total.toString());

        dispatch(formData);
      }}
    >
      <div className="flex flex-col space-y-5 w-full">
        <h1 className="text-lg">Cart</h1>
        <h1 className="text-2xl">Personal Details</h1>
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 space-y-2.5 lg:space-y-0 lg:gap-5">
          <div className="flex flex-col">
            <label htmlFor="fullname">Full name</label>
            <input
              type="text"
              name="fullname"
              className="border p-1.5 bg-transparent"
              placeholder="Full name"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.fullname &&
                state.errors.fullname.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="border p-1.5 bg-transparent"
              placeholder="Email"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="border p-1.5 bg-transparent"
              placeholder="Phone Number"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.phone &&
                state.errors.phone.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <h1 className="text-2xl">Shipping Details</h1>
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 space-y-2.5 lg:space-y-0 lg:gap-5 pb-16">
          <div className="flex flex-col">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              className="border p-1.5 bg-transparent"
              placeholder="Street Address"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.streetAddress &&
                state.errors.streetAddress.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="suburb">Suburb</label>
            <input
              type="text"
              name="suburb"
              className="border p-1.5 bg-transparent"
              placeholder="Suburb"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.suburb &&
                state.errors.suburb.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              className="border p-1.5 bg-transparent"
              placeholder="City"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.city &&
                state.errors.city.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              className="border p-1.5 bg-transparent"
              placeholder="Postal Code"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.postalCode &&
                state.errors.postalCode.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full font-bold fixed bottom-0 left-0 bg-white text-black py-2.5"
        >
          {pending ? (
            <Loader2 className="w-8 h-8 animate-spin text-black" />
          ) : (
            "Complete Checkout"
          )}
        </button>
      </div>
    </form>
  );
}
