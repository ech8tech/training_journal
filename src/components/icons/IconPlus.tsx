import { TEXT_SECONDARY } from "@constants/colors";

import { IconProps } from "./types";

export function IconPlus({ size = 18, color = TEXT_SECONDARY }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
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
