"use client";

import MainWrapper from "../ui/MainWrapper";
import Logo from "../ui/Logo";
import NavbarRoutes from "./NavbarRoutes";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { ModeToggle } from "@/components/theme/ModeToggle";

function Navbar() {
  const isScrolled = useScroll();
  const { data: session, isPending } = authClient.useSession();

  return (
    <header
      className={cn(
        "sticky top-2 z-40 transition-all duration-200 h-18",
        isScrolled &&
          "top-0 border-b border-opacity-50 h-16 bg-card/80 backdrop-blur-sm",
      )}
    >
      <MainWrapper className="flex h-full items-center justify-between">
        <div className="flex flex-1 gap-x-12">
          <Logo />
        </div>
        <div className="flex flex-1 justify-center">
          <NavbarRoutes />
        </div>
        <div className="flex flex-1 justify-end items-center gap-x-4">
          {/*<ModeToggle />*/}
          <ModeToggle />
          <div className="hidden items-center gap-x-4 md:flex">
            {isPending ? null : session ? (
              <>
                <UserDropdown
                  name={
                    session?.user.name && session.user.name.length > 0
                      ? session.user.name
                      : (session?.user.email?.split("@")[0] ?? "")
                  }
                  email={session.user.email}
                  image={
                    session?.user.image ??
                    `https://avatar.vercel.sh/${session?.user.email}`
                  }
                />
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className={buttonVariants({ variant: "default" })}
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </MainWrapper>
    </header>
  );
}
export default Navbar;
