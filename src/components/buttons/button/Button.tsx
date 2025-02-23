import { getConfigClass } from "@components/buttons/button/utils";
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
  const configClass = getConfigClass(type, variant);
  const textIsGhost = type === "primary" || type === "danger";

  return (
    <button
      onClick={onClick}
      className={cn(className, styles.button, configClass.button)}
    >
      {isLoading ? (
        <Spinner className={configClass.spinner} size={18} />
      ) : (
        <>
          <Text type={textIsGhost ? "ghost" : "primary"} size="md">
            {text}
          </Text>
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
