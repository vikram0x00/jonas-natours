import Logo from "@/components/ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Cog, Home, Users } from "@mynaui/icons-react";

export default function AppHeaders4() {
  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* App Logo */}
          <Logo />

          {/* Breadcrumbs */}
          <nav className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <a
              href="/"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <Home className="size-4 stroke-2" />
              <span>Dashboard</span>
            </a>

            <ChevronRight className="size-3.5" />

            <a
              href="/team"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <Users className="size-4 stroke-2" />
              <span>Team</span>
            </a>

            <ChevronRight className="size-3.5" />

            <a
              href="/team/settings"
              className="flex items-center gap-1 text-foreground"
            >
              <Cog className="size-4 stroke-2" />
              <span className="font-medium">Settings</span>
            </a>
          </nav>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium">Sarah Wilson</div>
            <div className="text-xs text-muted-foreground">Product Manager</div>
          </div>
          <Avatar className="size-8">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Sarah Wilson"
            />
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
