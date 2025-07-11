import IconFullAlt from "@assets/icons/muscles_full/full_alt.svg";
import * as styles from "@components/errorPage/page404/Page404.scss";
import { Spacing } from "@components/spacing";
import { Text } from "@components/text";
import { Title } from "@components/title";

export function Page404() {
  return (
    <div>
      <Spacing space={16}>
        <IconFullAlt />
      </Spacing>
      <Spacing space={8}>
        <Text className={styles.errorCode}>404</Text>
      </Spacing>
      <Title size="h2">Данные не были найдены</Title>
    </div>
  );
}
