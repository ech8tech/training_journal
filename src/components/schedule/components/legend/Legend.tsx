import cn from "classnames";

import { Text } from "@components/text";

import * as styles from "./Legend.scss";

export function Legend() {
  return (
    <div className={styles.legend}>
      <div className={styles.legend_item}>
        <div className={styles.circle}></div>
        <Text size="sm">Не было занятий</Text>
      </div>
      <div className={styles.legend_item}>
        <div className={cn(styles.circle, styles.circle__current)} />
        <Text size="sm">Были занятия</Text>
      </div>
      <div className={styles.legend_item}>
        <div className={cn(styles.circle, styles.circle__future)} />
        <Text size="sm">Будущие дни</Text>
      </div>
      <div className={styles.legend_item}>
        <div className={cn(styles.circle, styles.circle__half)} />
        <Text size="sm">Пройденные занятия сегодня</Text>
      </div>
    </div>
  );
}
