import Link from "next/link";

interface NavbarRouteProps {
  label: string;
  path: string;
}

function NavbarRoute({ label, path }: NavbarRouteProps) {
  return (
    <Link href={path} className="text-sm text-foreground/80">
      {label}
    </Link>
  );
}
export default NavbarRoute;
