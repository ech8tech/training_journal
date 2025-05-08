import IconArrow from "@assets/icons/other/IconArrow.svg";
import { Button } from "@components/buttons";
import { Spacing } from "@components/spacing/Spacing";
import { Title } from "@components/title/Title";
import { SPACE_CONTAINER } from "@constants/spacing";

import * as styles from "./PageLayout.scss";
import { PageLayoutProps } from "./types";

export function PageLayout({
  title,
  buttonConfig,
  children,
  onBack,
}: PageLayoutProps) {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.content}>
        {title && (
          <Spacing space={SPACE_CONTAINER} className={styles.titleContainer}>
            {onBack && (
              <IconArrow
                onClick={onBack}
                className={styles.iconBack}
                width={28}
                height={28}
              />
            )}
            <Title size="h1">{title}</Title>
          </Spacing>
        )}
        {children}
      </div>

      {buttonConfig && (
        <Button
          className={styles.button}
          type="primary"
          variant="wide"
          {...buttonConfig}
        />
      )}
    </div>
  );
}
