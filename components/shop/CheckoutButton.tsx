import Link from "next/link";

export default function CheckoutButton({ total }: { total: number }) {
  return (
    <div
      
      className="bg-white text-black fixed flex flex-col items-center  w-full bottom-6 font-bold py-1 px-2.5"
    >
      <div className="flex w-full justify-between items-center">
        <span>Total: </span>
        <span>R{total}</span>
      </div>
      <Link href="/shop/checkout" className="bg-black text-white p-1.5">Proceed to Checkout</Link>
    </div>
  );
}
