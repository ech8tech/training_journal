import IconBackBottom from "@assets/icons/muscles_parts/back_bottom.svg";
import IconBackMiddle from "@assets/icons/muscles_parts/back_middle.svg";
import IconBackTop from "@assets/icons/muscles_parts/back_top.svg";
import IconBiceps from "@assets/icons/muscles_parts/biceps.svg";
import IconBrachialis from "@assets/icons/muscles_parts/brachialis.svg";
import IconBreast from "@assets/icons/muscles_parts/breast.svg";
import IconButtocks from "@assets/icons/muscles_parts/buttocks.svg";
import IconCalf from "@assets/icons/muscles_parts/calf.svg";
import IconForearmBack from "@assets/icons/muscles_parts/forearm_back.svg";
import IconForearmFront from "@assets/icons/muscles_parts/forearm_front.svg";
import IconLegsBack from "@assets/icons/muscles_parts/legs_back.svg";
import IconLegsFront from "@assets/icons/muscles_parts/legs_front.svg";
import IconLegsFrontInside from "@assets/icons/muscles_parts/legs_front_inside.svg";
import IconPressMiddle from "@assets/icons/muscles_parts/press_middle.svg";
import IconPressOblique from "@assets/icons/muscles_parts/press_oblique.svg";
import IconShouldersBack from "@assets/icons/muscles_parts/shoulders_back.svg";
import IconShouldersFront from "@assets/icons/muscles_parts/shoulders_front.svg";
import IconTrapezoids from "@assets/icons/muscles_parts/trapezoids.svg";
import IconTriceps from "@assets/icons/muscles_parts/triceps.svg";
import { SVGElement } from "@src/types/common";

export enum MuscleGroupType {
  SHOULDERS = "shoulders",
  HANDS = "hands",
  BREAST = "breast",
  LEGS = "legs",
  BACK = "back",
  PRESS = "press",
}

export const MuscleGroupName: Record<MuscleGroupType, string> = {
  [MuscleGroupType.SHOULDERS]: "Плечи и трапеции",
  [MuscleGroupType.HANDS]: "Руки",
  [MuscleGroupType.BREAST]: "Грудь",
  [MuscleGroupType.LEGS]: "Ноги",
  [MuscleGroupType.BACK]: "Спина",
  [MuscleGroupType.PRESS]: "Пресс",
};

export enum MuscleType {
  TRAPEZOIDS = "trapezoids",
  SHOULDERS_FRONT = "shoulders_front",
  SHOULDERS_BACK = "shoulders_back",
  BREAST = "breast",
  BACK_TOP = "back_top",
  BACK_MIDDLE = "back_middle",
  BACK_BOTTOM = "back_bottom",
  BICEPS = "biceps",
  BRACHIALIS = "brachialis",
  TRICEPS = "triceps",
  FOREARM_FRONT = "forearm_front",
  FOREARM_BACK = "forearm_back",
  PRESS_MIDDLE = "press_middle",
  PRESS_OBLIQUE = "press_oblique",
  LEGS_FRONT = "legs_front",
  LEGS_FRONT_INSIDE = "legs_front_inside",
  LEGS_BACK = "legs_back",
  BUTTOCKS = "buttocks",
  CALF = "calf",
}

export const Muscles: Record<
  MuscleType,
  { group: MuscleGroupType; name: string; icon: SVGElement }
> = {
  [MuscleType.TRAPEZOIDS]: {
    group: MuscleGroupType.SHOULDERS,
    name: "Трапеции",
    icon: <IconTrapezoids />,
  },
  [MuscleType.SHOULDERS_FRONT]: {
    group: MuscleGroupType.SHOULDERS,
    name: "Передняя и средняя дельты",
    icon: <IconShouldersFront />,
  },
  [MuscleType.SHOULDERS_BACK]: {
    group: MuscleGroupType.SHOULDERS,
    name: "Задняя дельта",
    icon: <IconShouldersBack />,
  },
  [MuscleType.BREAST]: {
    group: MuscleGroupType.BREAST,
    name: "Грудь",
    icon: <IconBreast />,
  },
  [MuscleType.BACK_TOP]: {
    group: MuscleGroupType.BACK,
    name: "Ромбовидная мышца",
    icon: <IconBackTop />,
  },
  [MuscleType.BACK_MIDDLE]: {
    group: MuscleGroupType.BACK,
    name: "Широчайшие мышцы",
    icon: <IconBackMiddle />,
  },
  [MuscleType.BACK_BOTTOM]: {
    group: MuscleGroupType.BACK,
    name: "Поясница",
    icon: <IconBackBottom />,
  },
  [MuscleType.BICEPS]: {
    group: MuscleGroupType.HANDS,
    name: "Бицепс",
    icon: <IconBiceps />,
  },
  [MuscleType.BRACHIALIS]: {
    group: MuscleGroupType.HANDS,
    name: "Плечевая мышца",
    icon: <IconBrachialis />,
  },
  [MuscleType.TRICEPS]: {
    group: MuscleGroupType.HANDS,
    name: "Трицепс",
    icon: <IconTriceps />,
  },
  [MuscleType.FOREARM_FRONT]: {
    group: MuscleGroupType.HANDS,
    name: "Сгибатели предплечья",
    icon: <IconForearmFront />,
  },
  [MuscleType.FOREARM_BACK]: {
    group: MuscleGroupType.HANDS,
    name: "Разгибатели предплечья",
    icon: <IconForearmBack />,
  },
  [MuscleType.PRESS_MIDDLE]: {
    group: MuscleGroupType.PRESS,
    name: "Прямая мышца пресса",
    icon: <IconPressMiddle />,
  },
  [MuscleType.PRESS_OBLIQUE]: {
    group: MuscleGroupType.PRESS,
    name: "Косые мышцы пресса",
    icon: <IconPressOblique />,
  },
  [MuscleType.LEGS_FRONT]: {
    group: MuscleGroupType.LEGS,
    name: "Квадрицепс бедра",
    icon: <IconLegsFront />,
  },
  [MuscleType.LEGS_FRONT_INSIDE]: {
    group: MuscleGroupType.LEGS,
    name: "Приводящие мышцы бедра",
    icon: <IconLegsFrontInside />,
  },
  [MuscleType.LEGS_BACK]: {
    group: MuscleGroupType.LEGS,
    name: "Бицепс бедра",
    icon: <IconLegsBack />,
  },
  [MuscleType.BUTTOCKS]: {
    group: MuscleGroupType.LEGS,
    name: "Ягодицы",
    icon: <IconButtocks />,
  },
  [MuscleType.CALF]: {
    group: MuscleGroupType.LEGS,
    name: "Икроножные мышцы",
    icon: <IconCalf />,
  },
};

// export const MuscleIcon: Record<MuscleType, ReactNode> = {
//   [MuscleType.TRAPEZOIDS]: <IconTrapezoids />,
//   [MuscleType.SHOULDERS_FRONT]: <IconShouldersFront />,
//   [MuscleType.SHOULDERS_BACK]: <IconShouldersBack />,
//   [MuscleType.BREAST]: <IconBreast />,
//   [MuscleType.BACK_TOP]: <IconBackTop />,
//   [MuscleType.BACK_MIDDLE]: <IconBackMiddle />,
//   [MuscleType.BACK_BOTTOM]: <IconBackBottom />,
//   [MuscleType.BICEPS]: <IconBiceps />,
//   [MuscleType.BRACHIALIS]: <IconBrachialis />,
//   [MuscleType.TRICEPS]: <IconTriceps />,
//   [MuscleType.FOREARM_FRONT]: <IconForearmFront />,
//   [MuscleType.FOREARM_BACK]: <IconForearmBack />,
//   [MuscleType.PRESS_MIDDLE]: <IconPressMiddle />,
//   [MuscleType.PRESS_OBLIQUE]: <IconPressOblique />,
//   [MuscleType.LEGS_FRONT]: <IconLegsFront />,
//   [MuscleType.LEGS_FRONT_INSIDE]: <IconLegsFrontInside />,
//   [MuscleType.LEGS_BACK]: <IconLegsBack />,
//   [MuscleType.BUTTOCKS]: <IconButtocks />,
//   [MuscleType.CALF]: <IconCalf />,
// };
