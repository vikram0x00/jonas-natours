import Logo from "@/components/ui/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export default function Basic() {
  return (
    <section className="flex flex-col items-center gap-10 bg-muted py-20 md:min-h-screen">
      <img src={Logo} alt="Natours" />
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border bg-background p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your details below to login
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
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              placeholder="••••••••••"
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
          <Link to="/forgot-password" className="underline">
            Forgot your password?
          </Link>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">© 2026 Natours</p>
    </section>
  );
}
