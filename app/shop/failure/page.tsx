import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <span>Failed to submit transaction </span>
      <Link href="/shop">Back</Link>
    </div>
  );
}
