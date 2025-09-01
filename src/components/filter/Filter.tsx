import { Chips } from "@components/chips";
import { Input } from "@components/input";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";

import * as styles from "./Filter.scss";
import { FilterProps } from "./types";

export function Filter({
  configDateStart,
  configDateEnd,
  activeChipsId,
  onClickChips,
}: FilterProps) {
  return (
    <>
      <Spacing className={styles.period} space={16}>
        <Input
          {...configDateStart}
          className={styles.date}
          label="Начало периода"
          type="date"
        />
        <Input
          {...configDateEnd}
          className={styles.date}
          label="Конец периода"
          type="date"
        />
      </Spacing>
      <div className={styles.filter}>
        <div>
          <Text type="secondary">Фильтр</Text>
        </div>
        <div className={styles.chips_row}>
          <Chips
            activeChipsId={activeChipsId}
            chips={[
              { id: "week", text: "За неделю", onClick: onClickChips },
              { id: "month", text: "За месяц", onClick: onClickChips },
              { id: "year", text: "За год", onClick: onClickChips },
            ]}
          />
        </div>
      </div>
    </>
  );
}
