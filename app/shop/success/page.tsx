import Link from "next/link";

export default function Page() {
  return (
    <div>
      <span>Success, your order has been placed</span>
      <Link href="/shop">Continue Shopping</Link>
    </div>
  );
}
