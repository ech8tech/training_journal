import { Chips } from "@components/chips";
import { Input } from "@components/input";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";

import * as styles from "./Filter.scss";

export function Filter() {
  return (
    <div>
      <Spacing className={styles.period} space={16}>
        <Input
          className={styles.date}
          label="Начало периода"
          placeholder="Выберите дату"
          type="date"
        />
        <Input
          className={styles.date}
          label="Конец периода"
          placeholder="Выберите дату"
          type="date"
        />
      </Spacing>
      <div className={styles.filter}>
        <div>
          <Text type="secondary">Фильтр</Text>
        </div>
        <div className={styles.chips_row}>
          <Chips
            chips={[
              { text: "За неделю", onClick: () => {} },
              { text: "За месяц", onClick: () => {} },
              { text: "За год", onClick: () => {} },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
