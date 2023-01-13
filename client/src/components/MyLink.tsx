import React, { JSXElementConstructor, ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const MyLink = ({
  children,
  href,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  href: string;
}) => {
  const child = React.Children.only(children);
  const router = useRouter();

  return (
    <Link href={href} color="white">
      {React.cloneElement(child, {
        "aria-current": router.pathname === href ? "page" : null,
      })}
    </Link>
  );
};
