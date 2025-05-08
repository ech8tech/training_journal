import cn from "classnames";

import { Spinner } from "@components/spinner/Spinner";
import { Text } from "@components/text/Text";
import { Title } from "@components/title/Title";
import { getSvgElement } from "@utils/elements";

import * as styles from "./Button.scss";
import { ButtonProps } from "./types";
import { getConfigClass } from "./utils";

export function Button({
  text,
  className,
  type = "primary",
  variant = "default",
  size = "md",
  icon,
  isLoading,
  isDisabled,
  onClick,
}: ButtonProps) {
  const configClass = getConfigClass(type, variant, size, isDisabled);
  const textIsGhost = type === "primary" || type === "danger";

  return (
    <button
      onClick={onClick}
      className={cn(
        className,
        styles.button,
        configClass.button,
        configClass.buttonSize,
      )}
      disabled={isDisabled}
    >
      {isLoading ? (
        <Spinner className={configClass.content} size={18} />
      ) : (
        <>
          {text ? (
            variant === "wide" ? (
              <Title size="h4">{text}</Title>
            ) : (
              <Text
                className={configClass.content}
                type={textIsGhost ? "ghost" : "primary"}
                size="md"
              >
                {text}
              </Text>
            )
          ) : null}

          {icon && (
            <div
              className={cn(styles.icon, {
                [styles.icon__offset]: !!text,
              })}
            >
              {getSvgElement(icon, 18, 18, configClass.content)}
            </div>
          )}
        </>
      )}
    </button>
  );
}
