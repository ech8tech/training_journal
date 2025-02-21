import { TEXT_SECONDARY } from "@constants/colors";

import { IconProps } from "./types";

export function IconEdit({ size = 18, color = TEXT_SECONDARY }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0863 7.91338L14.2498 6.74994L14.2498 6.74991C14.3294 6.67028 14.3693 6.63046 14.4013 6.5952C15.0947 5.83238 15.0947 4.6675 14.4013 3.90468C14.3693 3.86943 14.3294 3.82961 14.2498 3.74999L14.2498 3.74994C14.1701 3.67029 14.1303 3.63046 14.095 3.59841C13.3322 2.90502 12.1673 2.90502 11.4045 3.59841C11.3693 3.63046 11.3294 3.67029 11.2498 3.74994L10.0688 4.93096C10.7821 6.17611 11.8241 7.21005 13.0863 7.91338ZM8.61405 6.38566L3.85615 11.1436C3.43109 11.5686 3.21856 11.7812 3.07883 12.0422C2.93909 12.3033 2.88015 12.5981 2.76226 13.1875L2.39686 15.0145C2.33034 15.3471 2.29708 15.5134 2.39168 15.608C2.48629 15.7026 2.6526 15.6694 2.98521 15.6029L4.81219 15.2375L4.8122 15.2375C5.40164 15.1196 5.69637 15.0606 5.95746 14.9209C6.21856 14.7812 6.43109 14.5686 6.85614 14.1436L6.85614 14.1436L6.85615 14.1436L11.6278 9.37187C10.4169 8.60363 9.38944 7.58312 8.61405 6.38566Z"
        fill={color}
      />
    </svg>
  );
}
