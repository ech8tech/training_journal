import { MaskOptions } from "@react-input/mask";

import { InputMask } from "./types";

export function getMask(mask?: InputMask): MaskOptions {
  switch (mask) {
    case "tel": {
      return {
        mask: "+7 (___) ___-__-__",
        replacement: { _: /\d/ },
      };
    }
    default: {
      return {};
    }
  }
}
