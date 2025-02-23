import IconClose from "@assets/icons/other/IconClose.svg";
import { ButtonsGroup } from "@components/buttons/buttonsGroup/ButtonsGroup";
import { Spacing } from "@components/spacing/Spacing";
import { Title } from "@components/title/Title";
import { SPACE_INNER } from "@constants/spacing";
import { useEffect, useRef } from "react";

import * as styles from "./Modal.scss";
import { ModalProps } from "./types";

export function Modal({ title, buttonsConfig, content, onClose }: ModalProps) {
  const refModal = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target instanceof Node)) return;

    if (!refModal?.current?.contains(event.target)) {
      onClose?.();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div ref={refModal} className={styles.modal}>
        <Spacing space={SPACE_INNER} className={styles.title}>
          <Title size="h3">{title}</Title>
          <IconClose
            onClick={onClose}
            width={24}
            height={24}
            className={styles.iconClose}
          />
        </Spacing>
        <Spacing space={SPACE_INNER}>{content}</Spacing>
        <div className={styles.controls}>
          <ButtonsGroup
            buttonsConfig={[
              ...buttonsConfig,
              { text: "Отмена", onClick: onClose },
            ]}
          />
        </div>
      </div>
      <div className={styles.overlay} />
    </>
  );
}
