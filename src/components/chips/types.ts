export type ChipsProps = {
  className?: string;
  chips: {
    text: string;
    onClick(): void;
  }[];
};
