import { TEXT_SECONDARY } from "@constants/colors";

import { IconProps } from "./types";

export function IconDelete({ size = 18, color = TEXT_SECONDARY }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6.75" stroke={color} />
      <path d="M6.75 11.2498L11.25 6.74976" stroke={color} />
      <path d="M11.25 11.25L6.75 6.75" stroke={color} />
    </svg>
  );
}
