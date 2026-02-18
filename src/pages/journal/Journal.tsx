import dayjs from "dayjs";
import { omit } from "lodash";
import { useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { routes } from "@app/routesConfig";
import IconCircleTick from "@assets/icons/other/IconCircleTick.svg";
import IconDelete from "@assets/icons/other/IconDelete.svg";
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
import { SetDto } from "@pages/journal/types";

import { useModalAddEdit } from "./components/modalAddEdit";
import { useModalDelete } from "./components/modalDelete";
import {
  useCreateSession,
  useDeleteSession,
  useGetExercisesByMuscleGroup,
} from "./hooks";
import * as styles from "./Journal.scss";

export default function Journal() {
  const navigate = useNavigate();
  const params = useParams<{ muscleGroup: MuscleGroup }>();
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const muscleGroup = params.muscleGroup!;

  const { createSession } = useCreateSession();
  const { deleteSession } = useDeleteSession();
  const { data, isLoading, getExercises } =
    useGetExercisesByMuscleGroup(muscleGroup);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigateToProgress = (id: string) => {
    const to = generatePath(routes.PROGRESS.path, { exerciseId: id });
    navigate(to);
  };

  const handleOpen = (id: string) => {
    if (openedIds?.includes(id)) {
      setOpenedIds((prev) => prev.filter((openedId) => openedId !== id));
    } else {
      setOpenedIds((prev) => [...prev, id]);
    }
  };

  const { modal: modalAddEdit, handleOpenModal: openModalAddEdit } =
    useModalAddEdit();
  const { modal: modalDelete, handleOpenModal: openDeleteModal } =
    useModalDelete();

  const handleCreateSession = async (exerciseId: string, sets?: SetDto[]) => {
    const createdSession = await createSession({
      date: dayjs().format(DATE_FORMAT),
      exerciseId,
      // при создании сессий мы отправляем НОВЫЕ подходы
      sets: sets?.map((s) => {
        if (s.sessionId) return omit(s, ["id"]);
        else return s;
      }),
    });

    if (createdSession?.data?.length) {
      await getExercises();
    }
  };

  const handleDeleteSession = async (exerciseId: string) => {
    const deletedSession = await deleteSession(exerciseId);

    if (deletedSession?.data?.exerciseId) {
      await getExercises();
    }
  };

  if (isLoading) {
    return <Spinner isFullPage />;
  }

  return (
    <PageLayout
      buttonConfig={{
        icon: <IconPlus />,
        text: "Добавить упражнение",
        onClick: () => {
          openModalAddEdit("Добавление упражнения", "Добавить", "addExercise");
        },
      }}
      onBack={handleBack}
      title={MuscleGroupName[muscleGroup]}
    >
      {!data?.length ? (
        <Title size="h3">Добавьте упражнения на эту группу мышц</Title>
      ) : (
        data?.map(({ isDone, ...item }, index) => {
          const hasSets = !!item?.sets?.length;

          return (
            <Spacing
              key={item.id}
              space={index !== data.length - 1 ? SPACE_CONTAINER : 0}
            >
              <Accordion
                id={item.id}
                isOpen={openedIds.includes(item.id)}
                onOpen={handleOpen}
                title={item.name}
                iconPrimary={Muscles[item.muscleType].icon}
                iconSecondary={
                  !!item?.sets?.length && isDone ? (
                    <IconCircleTick
                      width={20}
                      height={20}
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
                          checked={isDone}
                          onChange={() =>
                            isDone
                              ? handleDeleteSession(item.id)
                              : handleCreateSession(item.id, item?.sets)
                          }
                          label="Выполнено"
                        />
                      )}
                      <Button
                        type="ghost"
                        className={styles.buttonIcon}
                        icon={<IconEdit />}
                        onClick={() =>
                          openModalAddEdit(
                            "Редактирование упражнения",
                            "Сохранить",
                            "editExercise",
                            {
                              exerciseId: item.id,
                              ...item,
                            },
                          )
                        }
                      />
                      <Button
                        type="ghost"
                        icon={<IconGraph />}
                        onClick={() => handleNavigateToProgress(item.id)}
                      />
                      <Button
                        type="ghost"
                        icon={<IconDelete />}
                        onClick={() => openDeleteModal(item.id)}
                      />
                    </>
                  }
                  bodyEmpty={
                    !item?.sets?.length ? (
                      <Title className={styles.header_description} size="h5">
                        Добавьте подходы к этому упражнению
                      </Title>
                    ) : null
                  }
                  columns={[
                    { key: "reps", title: "Подходы" },
                    { key: "weight", title: "Вес" },
                  ]}
                  rows={item?.sets || []}
                  buttonConfig={{
                    text: hasSets ? "Добавить сессию" : "Редактировать",
                    isDisabled: isDone,
                    icon: hasSets ? <IconPlus /> : <IconEdit />,
                    onClick: () => {
                      openModalAddEdit(
                        hasSets
                          ? "Добавление сессии"
                          : "Редактирование упражнения",
                        "Добавить",
                        hasSets ? "addSession" : "editExercise",
                        {
                          exerciseId: item.id,
                          ...item,
                        },
                      );
                    },
                  }}
                />
              </Accordion>
            </Spacing>
          );
        })
      )}

      {modalAddEdit}
      {modalDelete}
    </PageLayout>
  );
}
