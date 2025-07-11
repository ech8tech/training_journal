import cn from "classnames";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import IconGraph from "@assets/icons/other/IconGraph.svg";
import IconSettings from "@assets/icons/other/IconSettings.svg";
import { Button } from "@components/buttons";
import { ErrorPage } from "@components/errorPage";
import { PageLayout } from "@components/pageLayout";
import { Schedule } from "@components/schedule";
import { Spacing } from "@components/spacing";
import { Spinner } from "@components/spinner/Spinner";
import { Text } from "@components/text";
import { Title } from "@components/title";
import { SPACE_CONTAINER } from "@constants/spacing";
import { useGetProfile } from "@hooks/useGetProfile";
import { getWeekDays } from "@pages/dashboard/utils";

import { Muscles } from "./components/muscles/Muscles";
import * as styles from "./Dashboard.scss";

export default function Dashboard() {
  const weekDays = getWeekDays();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.STATISTICS.path);
  };

  const {
    data: profileData,
    isLoading: profileLoading,
    error,
  } = useGetProfile();

  if (profileLoading) {
    return <Spinner isFullPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!profileData) {
    navigate(routes.PROFILE.path);
  }

  return (
    <PageLayout>
      <Spacing space={SPACE_CONTAINER} className={styles.header}>
        <div className={styles.header_title}>
          <div>
            <Title size="h3">Привет, {profileData?.name}!</Title>
          </div>
          <div>
            <IconSettings
              className={styles.header_settings}
              width={28}
              height={28}
            />
          </div>
        </div>
        <div className={styles.calendar}>
          {weekDays.map((day) => {
            const { date, weekday, isCurrent } = day;

            return (
              <div key={date}>
                <Text
                  className={styles.calendar_weekday}
                  type="secondary"
                  size="sm"
                >
                  {weekday}
                </Text>
                <Title
                  className={cn(styles.calendar_date, {
                    [styles.calendar_date__current]: isCurrent,
                  })}
                  size="h4"
                >
                  {date}
                </Title>
              </div>
            );
          })}
        </div>
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <Title size="h1">Что тренируем сегодня?</Title>
      </Spacing>
      <Muscles />

      <Spacing space={SPACE_CONTAINER} className={styles.statistic_title}>
        <Title size="h1">Статистика</Title>
        <Button
          onClick={handleClick}
          text="Подробнее"
          type="ghost"
          size="sm"
          icon={<IconGraph />}
        />
      </Spacing>
      <div>
        <Schedule dates={[]} />
      </div>
    </PageLayout>
  );
}
