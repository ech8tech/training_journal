import { Spinner } from "@components/spinner/Spinner";
import { Text } from "@components/text/Text";
import { Title } from "@components/title/Title";
import { getSvgElement } from "@utils/elements";
import cn from "classnames";

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
  onClick,
}: ButtonProps) {
  const configClass = getConfigClass(type, variant, size);
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
    >
      {isLoading ? (
        <Spinner className={configClass.spinner} size={18} />
      ) : (
        <>
          {variant === "wide" ? (
            <Title size="h5">{text}</Title>
          ) : (
            <Text type={textIsGhost ? "ghost" : "primary"} size="md">
              {text}
            </Text>
          )}
          {icon && (
            <div className={styles.icon}>
              {getSvgElement(icon, 18, 18, configClass.icon)}
            </div>
          )}
        </>
      )}
    </button>
  );
}
