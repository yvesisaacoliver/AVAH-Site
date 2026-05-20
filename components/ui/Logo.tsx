type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 48, className = "" }: LogoProps) {
  return (
    <img
      src="/brand/logo1.png"
      alt="Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
