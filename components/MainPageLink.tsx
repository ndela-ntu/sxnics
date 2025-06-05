import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function MainPageLink({ href }: { href: string }) {
  return (
    <Link
      className="md:bg-white md:text-black px-3 py-1 flex items-center space-x-2.5 md:text-lg"
      href={href}
    >
      <span>View All</span>
      <span>
        <FaArrowRight className="h-3 w-3 md:h-5 md:w-5" />
      </span>
    </Link>
  );
}
