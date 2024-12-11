import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Animated Medical Cross */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse">
              <svg
                className="h-32 w-32 text-primary/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" />
              </svg>
            </div>
            <svg
              className="relative h-32 w-32 text-primary"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 8V16M8 12H16" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Sahifa topilmadi
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Oops! Bu sahifa kasal bo'lib qolganga o'xshaydi. Xavotir olmang, boshqa sahifalarimiz sog'lom.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/">
              Bosh sahifaga qaytish
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link
              href="/articles"
              className="flex items-center gap-x-2"
            >
              Boshqa kasalliklar
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>

        {/* Medical Decoration */}
        <div className="mt-16 grid grid-cols-3 gap-4 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
            >
              <svg
                className={`h-8 w-8 text-muted-foreground transform ${
                  i % 2 === 0 ? "rotate-45" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
