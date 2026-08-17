import Logo from "@/components/ui/logo.png";

export default function Footer5() {
  return (
    <footer className="bg-black flex flex-wrap border-t sticky bottom-0 w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between space-y-6 space-y-reverse p-3 text-sm font-medium text-muted-foreground md:flex-row md:items-start md:space-y-0">
        <div className="flex items-center gap-1.5 text-foreground">
        <img src={Logo} alt="Natours" />
        </div>
        <nav className="flex flex-col flex-wrap items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <a href="#" className="hover:text-foreground">
            Status
          </a>
          <a href="#" className="hover:text-foreground">
            Twitter
          </a>
          <a href="#" className="hover:text-foreground">
            Contact
          </a>
          <a href="#" className="hover:text-foreground">
            Docs
          </a>
          <a href="#" className="hover:text-foreground">
            API
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
