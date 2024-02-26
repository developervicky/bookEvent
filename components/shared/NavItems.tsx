"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathName = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((header, index) => {
        const isActive = pathName === header.route;
        return (
          <li
            key={index}
            className={`${
              isActive && "text-primary-500 "
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={header.route}>{header.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
