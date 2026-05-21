import Image from "next/image";

interface LogoProps {
  size?: number;
  inverted?: boolean;
  className?: string;
  priority?: boolean;
}

export default function Logo({
  size = 56,
  inverted = true,
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="YOGFINITY"
      width={size}
      height={size}
      priority={priority}
      className={`select-none ${
        inverted ? "[filter:invert(1)_brightness(1.1)]" : ""
      } ${className}`}
    />
  );
}
