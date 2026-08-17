import Logo from "@/components/ui/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export default function Basic() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-muted py-5 md:min-h-screen">
      <img src={Logo} alt="Natours" />
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border bg-background p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started with Natours today.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              autoComplete="username"
              placeholder="example@natours.app"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              required
              id="password"
              type="password"
              placeholder="••••••••••"
              autoComplete="current-password"
            />
            <p className="text-sm text-muted-foreground">
              Must be at least 6 characters long.
            </p>
          </div>
          <Button type="submit" className="w-full">
            Create Account →
          </Button>
        </div>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline">
            Sign In
          </Link>
        </p>
      </div>
      <p className="text-sm text-muted-foreground">© 2026 Natours</p>
    </section>
  );
}
