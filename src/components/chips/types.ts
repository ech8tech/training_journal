export type ChipsProps = {
  chips: {
    id: string;
    text: string;
    onClick(id: string): void;
  }[];
  className?: string;
  activeChipsId?: string;
};
