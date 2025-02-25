import { Button } from "@components/buttons";
import { Spacing } from "@components/spacing/Spacing";
import { Title } from "@components/title/Title";
import { SPACE_CONTAINER } from "@constants/spacing";

import * as styles from "./PageLayout.scss";
import { PageLayoutProps } from "./types";

export function PageLayout({ title, buttonConfig, children }: PageLayoutProps) {
  return (
    <>
      <div className={styles.pageLayout}>
        <Spacing space={SPACE_CONTAINER}>
          <Title size="h1">{title}</Title>
        </Spacing>
        {children}
      </div>
      {buttonConfig && (
        <Button
          className={styles.button}
          type="primary"
          variant="full"
          {...buttonConfig}
        />
      )}
    </>
  );
}
