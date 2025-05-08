import { generatePath, useNavigate, useParams } from "react-router-dom";

import { routes } from "@app/routesConfig";
import IconEdit from "@assets/icons/other/IconEdit.svg";
import IconGraph from "@assets/icons/other/IconGraph.svg";
import IconPlus from "@assets/icons/other/IconPlus.svg";
import { Accordion } from "@components/accordion/Accordion";
import { Button } from "@components/buttons";
import { Checkbox } from "@components/checkbox/Checkbox";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { Table } from "@components/table/Table";
import { SPACE_CONTAINER } from "@constants/spacing";

import {
  MuscleGroupName,
  MuscleGroupType,
  Muscles,
  MuscleType,
} from "./consts";
import { useOpenModal } from "./utils";

export default function Journal() {
  const navigate = useNavigate();
  const params = useParams<{ muscleGroupType: MuscleGroupType }>();
  const muscleGroupType = params.muscleGroupType!;

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigateToProgress = (muscleType: MuscleType) => {
    console.log(muscleType);
    const to = generatePath(routes.PROGRESS.path, { muscleType });
    navigate(to);
  };

  const { modal, handleOpenModal } = useOpenModal();

  const mock = [
    {
      id: "1",
      exerciseName: "Поднятие штанги стоя",
      muscleType: MuscleType.BICEPS,
      data: [
        { reps: 15, weight: 20 },
        { reps: 12, weight: 25 },
        { reps: 10, weight: 30 },
      ],
    },
    {
      id: "2",
      exerciseName: "Поднятие штанги стоя",
      muscleType: MuscleType.BRACHIALIS,
      data: [
        { reps: 15, weight: 30 },
        { reps: 12, weight: 40 },
        { reps: 10, weight: 50 },
      ],
    },
    {
      id: "3",
      exerciseName: "Сгибание рук гантелей",
      muscleType: MuscleType.FOREARM_FRONT,
      data: [
        { reps: 15, weight: 30 },
        { reps: 12, weight: 40 },
        { reps: 10, weight: 50 },
      ],
    },
    {
      id: "4",
      exerciseName: "Разгибание рук гантелей",
      muscleType: MuscleType.FOREARM_BACK,
      data: [
        { reps: 15, weight: 30 },
        { reps: 12, weight: 40 },
        { reps: 10, weight: 50 },
      ],
    },
  ];

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
      title={MuscleGroupName[muscleGroupType]}
    >
      {mock.map((item, index) => (
        <Spacing
          key={item.id}
          space={index !== mock.length - 1 ? SPACE_CONTAINER : 0}
        >
          <Accordion
            title={item.exerciseName}
            icon={Muscles[item.muscleType].icon}
          >
            <Table
              header={
                <>
                  <Checkbox label="Выполнено" />
                  <Button
                    type="ghost"
                    icon={<IconGraph />}
                    onClick={() => handleNavigateToProgress(item.muscleType)}
                  />
                </>
              }
              columns={[
                { key: "reps", title: "Подходы" },
                { key: "weight", title: "Вес" },
              ]}
              rows={item.data}
              buttonConfig={{
                title: "Редактировать",
                icon: <IconEdit />,
                onClick: () => {
                  handleOpenModal("Редактирование упражнения", "Сохранить", {
                    exerciseName: item.exerciseName,
                    muscleType: item.muscleType,
                    data: item.data,
                  });
                },
              }}
            />
          </Accordion>
        </Spacing>
      ))}

      {modal}
    </PageLayout>
  );
}
