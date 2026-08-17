import { buttonVariants } from "@/components/ui/button";

export default function _4041() {
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-32">
      <div className="space-y-2 text-center">
        <span className="font-semibold uppercase text-muted-foreground">
          404
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="text-balance text-muted-foreground">
          We couldn't find what you were looking for. Please check and try
          again.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <a href="#" className={buttonVariants({ size: "sm" })}>
          Go Back Home
        </a>
        <a
          href="#"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Contact Support
        </a>
      </div>
    </section>
  );
}
