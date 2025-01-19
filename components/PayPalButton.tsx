"use client";

import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PayPalButtonProps {
  onSubscriptionSuccess?: (subscriptionId: string) => void;
  onError?: (error: any) => void;
}

export default function PayPalButton({ 
  onSubscriptionSuccess, 
  onError 
}: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isSDKLoading, setIsSDKLoading] = useState(true);
  const buttonsRendered = useRef(false);
  const scriptLoaded = useRef(false);
  const buttonInstance = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const createPayPalButtons = () => {
      if (!window.paypal) return null;
      
      return window.paypal.Buttons({
        style: {
          shape: "rect",
          color: "black",
          layout: "vertical",
          label: "subscribe",
        },
        createSubscription: (data: any, actions: any) => {
          return actions.subscription.create({
            plan_id: "P-83338587AK9402734M4MPQBY",
          });
        },
        onApprove: (data: any, actions: any) => {
          if (onSubscriptionSuccess) {
            onSubscriptionSuccess(data.subscriptionID);
          } else {
            alert(`Subscription ID: ${data.subscriptionID}`);
          }
        },
        onError: (err: any) => {
          console.error("PayPal Subscription Error:", err);
          onError?.(err);
        },
      });
    };

    const renderPayPalButtons = async () => {
      if (!window.paypal || !paypalRef.current || buttonsRendered.current) return;

      try {
        // Close any existing button instance
        if (buttonInstance.current) {
          try {
            await buttonInstance.current.close();
          } catch (err) {
            console.warn("Error closing previous PayPal buttons:", err);
          }
        }

        // Create new button instance
        buttonInstance.current = createPayPalButtons();
        if (!buttonInstance.current) return;

        await buttonInstance.current.render(paypalRef.current);
        buttonsRendered.current = true;
        
        if (isMounted) {
          setIsSDKLoading(false);
        }
      } catch (err) {
        console.error("PayPal render error:", err);
        if (isMounted) {
          setIsSDKLoading(false);
        }
        onError?.(err);
      }
    };

    const loadPayPalScript = () => {
      // Check if script already exists and is loaded
      const existingScript = document.querySelector("#paypal-sdk");
      if (existingScript && window.paypal) {
        scriptLoaded.current = true;
        renderPayPalButtons();
        return;
      }

      // Load the PayPal SDK script
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AU0bVMiYyK2tTO6zgMqh5_EY-FoVG9CP5mhc1U_FnMl-2bWoy8grSeFwj6yvsQ31B2ZyA-xctzyfP6yV&vault=true&intent=subscription";
      script.async = true;
      script.id = "paypal-sdk";
      
      script.onload = () => {
        scriptLoaded.current = true;
        if (isMounted) {
          renderPayPalButtons();
        }
      };

      script.onerror = (err) => {
        console.error("Failed to load PayPal SDK:", err);
        if (isMounted) {
          setIsSDKLoading(false);
        }
        onError?.(err);
      };

      document.body.appendChild(script);
    };

    // Reset button state on mount
    buttonsRendered.current = false;

    if (!scriptLoaded.current) {
      loadPayPalScript();
    } else {
      renderPayPalButtons();
    }

    return () => {
      isMounted = false;
      
      // Cleanup button instance
      if (buttonInstance.current) {
        try {
          buttonInstance.current.close();
        } catch (err) {
          console.warn("Error closing PayPal buttons during cleanup:", err);
        }
      }
      buttonInstance.current = null;
      buttonsRendered.current = false;
    };
  }, [onSubscriptionSuccess, onError]);

  return (
    <div className="min-h-[150px]">
      <div id="paypal-button-container" ref={paypalRef}></div>
      {isSDKLoading && (
        <div className="text-center p-4">
          <Loader className="sm:h-8 sm:w-8 md:h-16 md:w-16 text-white animate-spin" />
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    paypal: any;
  }
}