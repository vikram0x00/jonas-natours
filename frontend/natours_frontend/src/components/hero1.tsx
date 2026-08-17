import { buttonVariants } from "@/components/ui/button";
import Image from "@/components/ui/tour-1-1.jpg";
import { Link } from "react-router";

export default function Basic() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-balance text-2xl font-bold tracking-tighter md:text-4xl">
          Explore the World with Smarter Bookings
        </h1>
        <p className="mt-2 text-muted-foreground md:text-balance">
          Empower your travel planning with intelligent insights that turn destinations into unforgettable adventures.
		  Book your next journey with confidence.
        </p>
        <div className="mt-6 flex gap-2">
          <Link to="/register" className={buttonVariants()}>
            Register
          </Link>
          <Link to="/sign-in" className={buttonVariants({ variant: "outline" })}>
            Sign In
          </Link>
        </div>
      </div>
      <div>
        <img loading="lazy" decoding="async"
          src={Image}
          className="h-96 w-full rounded border object-cover object-top-left"
          alt="Dashboard"
        />
      </div>
    </section>
  );
}
