"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="w-full py-4 px-6     top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src={"/icons/logo.svg"}
            alt="Books-Planet logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-semibold text-white hidden sm:block">
            Books-Planet
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/library"
            className={cn(
              "text-base font-medium hover:text-white transition-colors",
              pathname === "/library" ? "text-white" : "text-gray-400"
            )}
            aria-current={pathname === "/library" ? "page" : undefined}
          >
            Library
          </Link>

          <Link
            href="/my-profile"
            className="hover:opacity-80 transition-opacity"
            aria-label="My profile"
          >
            <Avatar>
              <AvatarFallback className=" bg-primary">
                {getInitials(session.user?.name || "") ||
                  session.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
