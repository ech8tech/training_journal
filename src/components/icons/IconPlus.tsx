import { SVGProps } from "react";

export function IconPlus({
  width = 18,
  height = 18,
  color = "white",
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="7.5" stroke={color} />
      <path d="M10 12.5L10 7.5" stroke={color} strokeLinecap="square" />
      <path d="M12.5 10L7.5 10" stroke={color} strokeLinecap="square" />
    </svg>
  );
}
