import Link from "next/link";
import React from "react";
import { RiCalendarEventLine } from "react-icons/ri";

const Logo = () => {
  return (
    <Link href="/" className="w-36 flex items-center gap-2">
      <RiCalendarEventLine className="w-8 h-8 text-primary" />
      <span className="text-lg font-semibold">bookEvent</span>
    </Link>
  );
};

export default Logo;
