import IconClose from "@assets/icons/other/IconClose.svg";
import { ButtonsGroup } from "@components/buttons/buttonsGroup/ButtonsGroup";
import { Spacing } from "@components/spacing/Spacing";
import { Title } from "@components/title/Title";
import { SPACE_INNER } from "@constants/spacing";

import * as styles from "./Modal.scss";
import { ModalProps } from "./types";

export function Modal({ title, buttonsConfig, content, onClose }: ModalProps) {
  return (
    <>
      <div className={styles.modal}>
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
        <div>
          <ButtonsGroup buttonsConfig={buttonsConfig} />
        </div>
      </div>
      <div className={styles.overlay} />
    </>
  );
}
