import cn from "classnames";

import Trigger from "@rc-component/trigger";

import { placements } from "./consts";
import * as styles from "./Popup.scss";
import { PopupProps } from "./types";

export function Popup({ id, children, content, isOpen, onOpen }: PopupProps) {
  return (
    <Trigger
      arrow={{ className: styles.arrow }}
      popupStyle={{ position: "absolute", zIndex: 102 }}
      action={["click"]}
      stretch="minWidth"
      popupPlacement="bottomLeft"
      builtinPlacements={placements}
      autoDestroy
      popupVisible={isOpen}
      onOpenChange={() => {
        if (isOpen) onOpen(null);
        else onOpen(id);
      }}
      getPopupContainer={() => document.getElementById("popup-root")!}
      popup={<div className={cn("rcp-content", styles.content)}>{content}</div>}
    >
      <>{children}</>
    </Trigger>
  );
}
