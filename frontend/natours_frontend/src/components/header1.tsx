import { buttonVariants } from "@/components/ui/button";
import { Menu } from "@mynaui/icons-react";
import Logo from "@/components/ui/logo.png";
import { Link } from "react-router";

export default function Basic() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link to="/">
			<img src={Logo} alt="Natours" />
		</Link>
        <div className="flex items-center gap-1">
          <div className="hidden items-center text-muted-foreground md:inline-flex">
            <Link
              to="#"
              className={buttonVariants({ variant: "ghost" })}
            >
              Features
            </Link>
            <Link
              to="#"
              className={buttonVariants({ variant: "ghost" })}
            >
              Pricing
            </Link>
            <Link
              to="#"
              className={buttonVariants({ variant: "ghost" })}
            >
              Blog
            </Link>
            <Link
              to="/tours"
              className={buttonVariants({ variant: "ghost" })}
            >
              Tours
            </Link>
            <p
              aria-hidden="true"
              className="hidden select-none text-border sm:block"
            >
              |
            </p>
            <Link
              to="/sign-in"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign In
            </Link>
          </div>
          <Link to="/register" className={buttonVariants({ variant: "default" })}>
            Register
          </Link>
          <button className="inline-flex p-1.5 md:hidden">
            <Menu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
