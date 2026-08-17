import Logo from "@/components/ui/logo.png";

export default function Footer2() {
  return (
    <footer className="mx-auto max-w-7xl border-t">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center space-y-5 px-4 py-12 md:items-start">
        <img src={Logo} alt="Natours" />
        <nav className="flex flex-col flex-wrap items-center space-y-4 text-xs font-medium text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
          <a href="#" className="hover:text-foreground">
            Status
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Docs
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            API
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
