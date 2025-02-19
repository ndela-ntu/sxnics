import { IShopItemVariant } from "@/models/ShopItemVariant";
import { supabase } from "@/utils/supabase";
import nodemailer from "nodemailer";

export default async function sendConfirmationEmail(
  email: string,
  orderedVariants: (IShopItemVariant & {quantity: number})[],
  amount: number
) {
  console.log(orderedVariants);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions1 = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Payment Confirmation",
    html: generateOrderEmail(orderedVariants ?? [], false, amount),
  };

  const mailOptions2 = {
    from: process.env.EMAIL_USER,
    to: "ntulilindelani4@gmail.com",
    subject: "Order Submitted",
    html: generateOrderEmail(orderedVariants ?? [], true, amount),
  };

  try {
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);
    console.log("Confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

const generateOrderEmail = (orderItems: (IShopItemVariant & {quantity: number})[], forAdmin: boolean, amount: number) => {
  const header = forAdmin
    ? `<h2 style="color: #333;">Order Confirmation</h2>
  <p>Thank you for your order! Here are the details:</p>
  `
    : `<h2 style="color: #333;">Order Confirmation</h2>
  <p>Order submitted: Details</p>
  `;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      ${header}
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 10px;">Item</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 10px;">Quantity</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 10px;">Price</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 10px;">Color</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 10px;">Size</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 10px;">Image</th>
          </tr>
        </thead>
        <tbody>
          ${orderItems
            .map(
              (item) => `
              <tr>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">${
                  item.shop_items.name
                }</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">R${item.quantity}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">R${item.shop_items.price.toFixed(
                  2
                )}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">${
                  item.color.name
                }</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">${
                  item.size.name
                }</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">
                  <img src="${item.image_url}" alt="${
                item.shop_items.name
              }" style="width: 50px; height: 50px; border-radius: 5px;">
                </td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
      <div style="padding: 10px">Total: R${amount}</div>
      <p style="margin-top: 20px;">If you have any questions, please reply to this email.</p>
    </div>
  `;
};
