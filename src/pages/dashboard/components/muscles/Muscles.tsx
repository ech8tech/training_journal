import { ReactNode } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import IconBackFull from "@assets/icons/muscles_full/back_full.svg";
import IconHandsFull from "@assets/icons/muscles_full/hands_full.svg";
import IconLegsFull from "@assets/icons/muscles_full/legs_full.svg";
import IconPressFull from "@assets/icons/muscles_full/press_full.svg";
import IconShouldersFull from "@assets/icons/muscles_full/shoulders_full.svg";
import IconBreast from "@assets/icons/muscles_parts/breast.svg";
import { Spacing } from "@components/spacing/Spacing";
import { SPACE_CONTAINER } from "@constants/spacing";

import * as styles from "./Muscles.scss";

const SIZE = 60;

const MuscleList: Record<string, ReactNode> = {
  shoulders: <IconShouldersFull width={SIZE} height={SIZE} />,
  hands: <IconHandsFull width={SIZE} height={SIZE} />,
  breast: <IconBreast width={SIZE} height={SIZE} />,
  legs: <IconLegsFull width={SIZE} height={SIZE} />,
  back: <IconBackFull width={SIZE} height={SIZE} />,
  press: <IconPressFull width={SIZE} height={SIZE} />,
};

export function Muscles() {
  const navigate = useNavigate();
  const muscles = Object.keys(MuscleList);

  const handleNavigate = (muscleGroup: string) => {
    const to = generatePath(routes.JOURNAL.path, { muscleGroup });
    navigate(to);
  };

  return (
    <Spacing space={SPACE_CONTAINER} className={styles.muscles}>
      {muscles.map((muscleGroup) => (
        <div
          key={muscleGroup}
          className={styles.muscle}
          onClick={() => handleNavigate(muscleGroup)}
        >
          {MuscleList[muscleGroup]}
        </div>
      ))}
    </Spacing>
  );
}
