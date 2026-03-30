import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string; // → Badge pequeño (etiqueta superior)
  subtitle?: string; // → Título principal grande
  description?: string; // → Texto descriptivo
  className?: string;
  align?: "center" | "left";
}

function SectionTitle({
  title,
  subtitle,
  description,
  className,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mx-auto",
        align === "center" ? "text-center" : "text-left",
        "mb-10 lg:mb-16",
        className,
      )}
    >
      {/* Badge / Label (usa la prop 'title') */}
      <div className="mb-4 inline-flex items-center justify-center">
        {title && (
          <>
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              {title}
            </p>
          </>
        )}
      </div>

      {/* Main Heading (usa la prop 'subtitle') */}
      {subtitle && (
        <h2
          className={cn(
            "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
            "text-foreground",
            // Opcional: Efecto gradiente en el texto
            // "bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600",
            "text-balance",
          )}
        >
          {subtitle}
        </h2>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed",
            "text-balance",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
