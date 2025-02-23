import { Spinner } from "@components/spinner/Spinner";
import { Text } from "@components/text/Text";
import { getSvgElement } from "@utils/elements";
import cn from "classnames";

import * as styles from "./Button.scss";
import { ButtonProps } from "./types";

export function Button({
  text,
  className,
  type = "primary",
  variant = "default",
  icon,
  isLoading,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(className, styles.button, {
        [styles.button__primary]: type === "primary",
        [styles.button__ghost]: type === "ghost",
        [styles.button__danger]: type === "danger",
        [styles.button__full]: variant === "full",
      })}
    >
      {isLoading ? (
        <Spinner
          className={cn({
            [styles.button__primary_icon]: type === "primary",
            [styles.button__danger_icon]: type === "danger",
            [styles.button__ghost_icon]: type === "ghost",
          })}
          size={18}
        />
      ) : (
        <>
          <Text
            type={type === "primary" || type === "danger" ? "ghost" : "primary"}
            size="md"
          >
            {text}
          </Text>
          {icon && (
            <div className={styles.icon}>
              {getSvgElement(
                icon,
                18,
                18,
                cn({
                  [styles.button__primary_icon]: type === "primary",
                  [styles.button__danger_icon]: type === "danger",
                  [styles.button__ghost_icon]: type === "ghost",
                }),
              )}
            </div>
          )}
        </>
      )}
    </button>
  );
}
