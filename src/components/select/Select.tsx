import IconArrow from "@assets/icons/other/IconArrow.svg";
import { Text } from "@components/text/Text";
import { TEXT_PRIMARY } from "@constants/colors";
import { getSvgElement } from "@utils/elements";
import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import * as styles from "./Select.scss";
import { Option, SelectProps } from "./types";

export function Select({
  label,
  register,
  className,
  options,
  placeholder,
  defaultOptionId,
}: SelectProps) {
  const defaultOption = options.find((option) => option.id === defaultOptionId);

  const [selected, setSelected] = useState(defaultOption);
  const [isOpened, setIsOpened] = useState(false);
  const refSelect = useRef<HTMLDivElement>(null);
  const refOptions = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<Partial<DOMRect>>();

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target instanceof Node)) return;

    if (
      isOpened &&
      !refSelect?.current?.contains(event.target) &&
      !refOptions?.current?.contains(event.target)
    ) {
      setIsOpened(false);
    }
  };

  const handleClick = () => {
    setIsOpened((prevState) => !prevState);
  };

  const handleSelect = (
    event: MouseEvent | React.MouseEvent,
    option: Option,
  ) => {
    event.stopPropagation();
    setSelected(option);
    setIsOpened(false);
  };

  useEffect(() => {
    if (refSelect?.current) {
      const { width, height, x, y } = refSelect.current.getBoundingClientRect();
      setCoords({ x, y: y + height, width });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={cn(styles.container, className)}>
      {label && (
        <Text size="sm" type="secondary">
          <label className={styles.label}>{label}</label>
        </Text>
      )}

      <div
        ref={refSelect}
        className={cn(styles.select, {
          [styles.select__opened]: isOpened,
        })}
        onClick={handleClick}
      >
        <div className={styles.value}>
          <div>{selected?.name || placeholder}</div>
          <IconArrow
            width={18}
            height={18}
            className={cn(styles.value_icon, {
              [styles.value_icon__opened]: isOpened,
            })}
            color={TEXT_PRIMARY}
          />
        </div>

        {isOpened &&
          createPortal(
            <div
              ref={refOptions}
              className={styles.options}
              style={{
                top: `${coords?.y}px`,
                left: `${coords?.x}px`,
                width: `${coords?.width}px`,
              }}
            >
              {options.map((option) => (
                <div
                  onClick={(event) => handleSelect(event, option)}
                  className={styles.option}
                  key={option.id}
                >
                  {getSvgElement(option?.icon, 20, 20)}
                  <Text size="md">{option.name}</Text>
                </div>
              ))}
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
}
