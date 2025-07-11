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
import { SVGElement } from "@typings/ui";

export enum MuscleGroup {
  SHOULDERS = "shoulders",
  HANDS = "hands",
  BREAST = "breast",
  LEGS = "legs",
  BACK = "back",
  PRESS = "press",
}

export const MuscleGroupColor: Record<MuscleGroup, string> = {
  [MuscleGroup.SHOULDERS]: "#ff595e",
  [MuscleGroup.HANDS]: "#ff924c",
  [MuscleGroup.BREAST]: "#ffca3a",
  [MuscleGroup.LEGS]: "#8ac926",
  [MuscleGroup.BACK]: "#1982c4",
  [MuscleGroup.PRESS]: "#6a4c93",
};

export const MuscleGroupName: Record<MuscleGroup, string> = {
  [MuscleGroup.SHOULDERS]: "Плечи и трапеции",
  [MuscleGroup.HANDS]: "Руки",
  [MuscleGroup.BREAST]: "Грудь",
  [MuscleGroup.LEGS]: "Ноги",
  [MuscleGroup.BACK]: "Спина",
  [MuscleGroup.PRESS]: "Пресс",
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
  { group: MuscleGroup; name: string; icon: SVGElement }
> = {
  [MuscleType.TRAPEZOIDS]: {
    group: MuscleGroup.SHOULDERS,
    name: "Трапеции",
    icon: <IconTrapezoids />,
  },
  [MuscleType.SHOULDERS_FRONT]: {
    group: MuscleGroup.SHOULDERS,
    name: "Передняя и средняя дельты",
    icon: <IconShouldersFront />,
  },
  [MuscleType.SHOULDERS_BACK]: {
    group: MuscleGroup.SHOULDERS,
    name: "Задняя дельта",
    icon: <IconShouldersBack />,
  },
  [MuscleType.BREAST]: {
    group: MuscleGroup.BREAST,
    name: "Грудь",
    icon: <IconBreast />,
  },
  [MuscleType.BACK_TOP]: {
    group: MuscleGroup.BACK,
    name: "Ромбовидная мышца",
    icon: <IconBackTop />,
  },
  [MuscleType.BACK_MIDDLE]: {
    group: MuscleGroup.BACK,
    name: "Широчайшие мышцы",
    icon: <IconBackMiddle />,
  },
  [MuscleType.BACK_BOTTOM]: {
    group: MuscleGroup.BACK,
    name: "Поясница",
    icon: <IconBackBottom />,
  },
  [MuscleType.BICEPS]: {
    group: MuscleGroup.HANDS,
    name: "Бицепс",
    icon: <IconBiceps />,
  },
  [MuscleType.BRACHIALIS]: {
    group: MuscleGroup.HANDS,
    name: "Плечевая мышца",
    icon: <IconBrachialis />,
  },
  [MuscleType.TRICEPS]: {
    group: MuscleGroup.HANDS,
    name: "Трицепс",
    icon: <IconTriceps />,
  },
  [MuscleType.FOREARM_FRONT]: {
    group: MuscleGroup.HANDS,
    name: "Сгибатели предплечья",
    icon: <IconForearmFront />,
  },
  [MuscleType.FOREARM_BACK]: {
    group: MuscleGroup.HANDS,
    name: "Разгибатели предплечья",
    icon: <IconForearmBack />,
  },
  [MuscleType.PRESS_MIDDLE]: {
    group: MuscleGroup.PRESS,
    name: "Прямая мышца пресса",
    icon: <IconPressMiddle />,
  },
  [MuscleType.PRESS_OBLIQUE]: {
    group: MuscleGroup.PRESS,
    name: "Косые мышцы пресса",
    icon: <IconPressOblique />,
  },
  [MuscleType.LEGS_FRONT]: {
    group: MuscleGroup.LEGS,
    name: "Квадрицепс бедра",
    icon: <IconLegsFront />,
  },
  [MuscleType.LEGS_FRONT_INSIDE]: {
    group: MuscleGroup.LEGS,
    name: "Приводящие мышцы бедра",
    icon: <IconLegsFrontInside />,
  },
  [MuscleType.LEGS_BACK]: {
    group: MuscleGroup.LEGS,
    name: "Бицепс бедра",
    icon: <IconLegsBack />,
  },
  [MuscleType.BUTTOCKS]: {
    group: MuscleGroup.LEGS,
    name: "Ягодицы",
    icon: <IconButtocks />,
  },
  [MuscleType.CALF]: {
    group: MuscleGroup.LEGS,
    name: "Икроножные мышцы",
    icon: <IconCalf />,
  },
};
