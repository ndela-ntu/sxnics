import Link from "next/link";

export default function Page() {
  return (
    <div>
      <span>Failed to submit transaction. Please try again.</span>
      <Link className="bg-white text-black px-2.5 py-1.5" href="/shop/checkout">
        Checkout
      </Link>
    </div>
  );
}
