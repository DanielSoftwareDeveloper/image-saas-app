import Logo from "../ui/Logo";
import MainWrapper from "../ui/MainWrapper";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { siteConfig } from "@/config/site-config";
import { navbarRoutes } from "../navbar/navbar-routes";

function Footer() {
  return (
    <footer className="bg-card border-t py-20">
      <MainWrapper className="">
        <div className="mb-16 grid grid-cols-2 gap-10 lg:grid-cols-3">
          <div className="col-span-4 md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-sm">{siteConfig.description}</p>
          </div>
          <div className="">
            <h4 className="font-semibold">Plataforma</h4>
            <Separator className="my-4" />
            <ul className="space-y-1">
              {navbarRoutes.map((route) => (
                <li key={route.id}>
                  <Link href={route.path} className="text-sm">
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h4 className="font-semibold">Legal</h4>
            <Separator className="my-4" />
            <ul className="space-y-1">
              <li>
                <Link href="#" className="text-sm">
                  Termns and conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm">
                  Cookies termns
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            <span>{siteConfig?.title}</span>
            <span className="mx-2">|</span>
            <span>&copy; {new Date().getFullYear()} All Rights Reserved</span>
          </p>
        </div>
      </MainWrapper>
    </footer>
  );
}
export default Footer;
