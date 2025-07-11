import dayjs from "dayjs";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { routes } from "@app/routesConfig";
import IconCircleTick from "@assets/icons/other/IconCircleTick.svg";
import IconEdit from "@assets/icons/other/IconEdit.svg";
import IconGraph from "@assets/icons/other/IconGraph.svg";
import IconPlus from "@assets/icons/other/IconPlus.svg";
import { Accordion } from "@components/accordion/Accordion";
import { Button } from "@components/buttons";
import { Checkbox } from "@components/checkbox/Checkbox";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { Spinner } from "@components/spinner/Spinner";
import { Table } from "@components/table/Table";
import { Title } from "@components/title";
import { DATE_FORMAT } from "@constants/format";
import { MuscleGroup, MuscleGroupName, Muscles } from "@constants/muscles";
import { SPACE_CONTAINER } from "@constants/spacing";
import { useCreateSession } from "@pages/journal/hooks/useCreateSession";
import { useDeleteSession } from "@pages/journal/hooks/useDeleteSession";
import { SetDto } from "@pages/journal/types";

import { useGetExercises, useModalAddEdit } from "./hooks";
import * as styles from "./Journal.scss";

export default function Journal() {
  const navigate = useNavigate();
  const params = useParams<{ muscleGroup: MuscleGroup }>();
  const muscleGroup = params.muscleGroup!;

  const { createSession } = useCreateSession();
  const { deleteSession } = useDeleteSession();
  const { data, isLoading } = useGetExercises(muscleGroup);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigateToProgress = (id: string) => {
    const to = generatePath(routes.PROGRESS.path, { exerciseId: id });
    navigate(to);
  };

  const { modal, handleOpenModal } = useModalAddEdit();

  const handleCreateSession = async (exerciseId: string, sets?: SetDto[]) => {
    await createSession({
      date: dayjs().format(DATE_FORMAT),
      exerciseId,
      sets,
    });
  };

  const handleDeleteSession = async (exerciseId: string) => {
    await deleteSession(exerciseId);
  };

  // const handleEditExercise = async (
  //   exerciseId: string,
  //   payload: EditExerciseDto,
  // ) => {
  //   await editExercise({ exerciseId, payload });
  // };

  if (isLoading) {
    return <Spinner isFullPage />;
  }

  return (
    <PageLayout
      buttonConfig={{
        icon: <IconPlus />,
        text: "Добавить упражнение",
        onClick: () => {
          handleOpenModal("Добавление упражнения", "Добавить");
        },
      }}
      onBack={handleBack}
      title={MuscleGroupName[muscleGroup]}
    >
      {!data?.length ? (
        <Title size="h3">Добавьте упражнения на эту группу мышц</Title>
      ) : (
        data?.map((item, index) => (
          <Spacing
            key={item.id}
            space={index !== data.length - 1 ? SPACE_CONTAINER : 0}
          >
            <Accordion
              title={item.name}
              iconPrimary={Muscles[item.muscleType].icon}
              iconSecondary={
                !!item?.sets?.length && item.isDone ? (
                  <IconCircleTick
                    width={24}
                    height={24}
                    className={styles.iconDone}
                  />
                ) : undefined
              }
            >
              <Table
                header={
                  <>
                    {!!item?.sets?.length && (
                      <Checkbox
                        checked={item.isDone}
                        onChange={() =>
                          item.isDone
                            ? handleDeleteSession(item.id)
                            : handleCreateSession(item.id, item?.sets)
                        }
                        label="Выполнено"
                      />
                    )}
                    <Button
                      type="ghost"
                      className={styles.buttonGraph}
                      icon={<IconGraph />}
                      onClick={() => handleNavigateToProgress(item.id)}
                    />
                  </>
                }
                bodyEmpty={
                  !item?.sets?.length ? (
                    <Title size="h5">Добавьте подходы к упражнению</Title>
                  ) : null
                }
                columns={[
                  { key: "reps", title: "Подходы" },
                  { key: "weight", title: "Вес" },
                ]}
                rows={item?.sets || []}
                buttonConfig={{
                  title: "Редактировать",
                  icon: <IconEdit />,
                  onClick: () => {
                    handleOpenModal("Редактирование упражнения", "Сохранить", {
                      exerciseId: item.id,
                      name: item.name,
                      muscleType: item.muscleType,
                      muscleGroup: item.muscleGroup,
                      sets: item?.sets,
                    });
                  },
                }}
              />
            </Accordion>
          </Spacing>
        ))
      )}

      {modal}
    </PageLayout>
  );
}
