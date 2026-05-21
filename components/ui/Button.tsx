import { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "filled" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
}

const variants: Record<Variant, string> = {
  filled:
    "bg-amber text-obsidian border border-amber hover:bg-amber/90 hover:shadow-[0_8px_32px_rgba(201,137,58,0.35)]",
  outline:
    "bg-transparent text-amber border border-amber hover:bg-amber/10",
  ghost:
    "bg-transparent text-ivory border border-ivory/30 hover:border-ivory hover:bg-ivory/5",
};

export default function Button({
  children,
  variant = "filled",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "interactive inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
