import { PropsWithChildren } from "react";

type SpacingProps = {
  className?: string;
  space: 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
};

export function Spacing({
  className,
  space,
  children,
}: PropsWithChildren<SpacingProps>) {
  return (
    <div className={className} style={{ marginBottom: `${space / 16}rem` }}>
      {children}
    </div>
  );
}
