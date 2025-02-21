import { TEXT_SECONDARY } from "@constants/colors";

import { IconProps } from "./types";

export function IconArrow({
  className,
  size = 18,
  color = TEXT_SECONDARY,
}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path d="M13.5 6.75L9 11.25L4.5 6.75" stroke={color} />
    </svg>
  );
}
