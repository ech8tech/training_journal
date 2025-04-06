import IconBackFull from "@assets/icons/muscles_full/back_full.svg";
import IconHandsFull from "@assets/icons/muscles_full/hands_full.svg";
import IconLegsFull from "@assets/icons/muscles_full/legs_full.svg";
import IconPressFull from "@assets/icons/muscles_full/press_full.svg";
import IconShouldersFull from "@assets/icons/muscles_full/shoulders_full.svg";
import IconBreast from "@assets/icons/muscles_parts/breast.svg";
import IconGraph from "@assets/icons/other/IconGraph.svg";
import { Button } from "@components/buttons";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { Title } from "@components/title/Title";
import { SPACE_CONTAINER } from "@constants/spacing";

import * as styles from "./Dashboard.scss";

export default function Dashboard() {
  return (
    <PageLayout>
      <Spacing space={SPACE_CONTAINER}>
        <Title size="h1">Что тренируем сегодня?</Title>
      </Spacing>
      <Spacing space={SPACE_CONTAINER} className={styles.muscles}>
        <div className={styles.muscle}>
          <IconShouldersFull width={60} height={60} />
        </div>
        <div className={styles.muscle}>
          <IconHandsFull width={60} height={60} />
        </div>
        <div className={styles.muscle}>
          <IconBreast width={60} height={60} />
        </div>
        <div className={styles.muscle}>
          <IconLegsFull width={60} height={60} />
        </div>
        <div className={styles.muscle}>
          <IconBackFull width={60} height={60} />
        </div>
        <div className={styles.muscle}>
          <IconPressFull width={60} height={60} />
        </div>
      </Spacing>
      <Spacing space={SPACE_CONTAINER} className={styles.statistic_title}>
        <Title size="h1">Статистика</Title>
        <Button text="Подробнее" type="ghost" size="sm" icon={<IconGraph />} />
      </Spacing>
    </PageLayout>
  );
}
