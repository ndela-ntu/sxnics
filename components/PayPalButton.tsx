"use client";

import { useEffect, useRef } from "react";

export default function PayPalButton() {
  const paypalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure the script is loaded only once
    if (paypalRef.current && !document.querySelector("#paypal-sdk")) {
      // Load the PayPal SDK script
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AU0bVMiYyK2tTO6zgMqh5_EY-FoVG9CP5mhc1U_FnMl-2bWoy8grSeFwj6yvsQ31B2ZyA-xctzyfP6yV&vault=true&intent=subscription";
      script.async = true;
      script.id = "paypal-sdk";
      script.onload = () => {
        // Render the PayPal button after the SDK loads
        if (window.paypal) {
          window.paypal
            .Buttons({
              style: {
                shape: "rect",
                color: "black",
                layout: "vertical",
                label: "subscribe",
              },
              createSubscription: (data: any, actions: any) => {
                return actions.subscription.create({
                  plan_id: "P-83338587AK9402734M4MPQBY", // PayPal Plan ID
                });
              },
              onApprove: (data: any, actions: any) => {
                alert(`Subscription ID: ${data.subscriptionID}`);
                // Handle the subscription approval (you can save subscriptionID on the backend)
              },
              onError: (err: any) => {
                console.error("PayPal Subscription Error:", err);
              },
            })
            .render(paypalRef.current);
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return <div id="paypal-button-container" ref={paypalRef}></div>;
}
