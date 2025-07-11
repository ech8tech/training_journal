import IconFullAlt from "@assets/icons/muscles_full/full_alt.svg";
import * as styles from "@components/errorPage/page503/Page503.scss";
import { Spacing } from "@components/spacing";
import { Text } from "@components/text";
import { Title } from "@components/title";

export function Page503() {
  return (
    <div>
      <Spacing space={16}>
        <IconFullAlt />
      </Spacing>
      <Spacing space={8}>
        <Text className={styles.errorCode}>503</Text>
      </Spacing>
      <Title size="h2">Сервис временно не доступен</Title>
    </div>
  );
}
