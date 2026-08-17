import Logo from "@/components/ui/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export default function Basic() {
  return (
    <section className="flex flex-col items-center gap-14 bg-muted py-20 md:min-h-screen">
      <img src={Logo} alt="Natours" />
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border bg-background p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Reset Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
        </div>
        <form className="grid gap-4">
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
          <Button type="submit" className="w-full">
            Send Reset Email
          </Button>
        </form>
        <p className="text-sm">
          ← Back to{" "}
          <Link to="/sign-in" className="underline">
            Login
          </Link>
        </p>
      </div>
      <p className="text-sm text-muted-foreground">© 2026 Natours</p>
    </section>
  );
}
