import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";

import IconArrow from "@assets/icons/other/IconArrow.svg";
import IconDelete from "@assets/icons/other/IconDelete.svg";
import { Text } from "@components/text/Text";
import { getSvgElement } from "@utils/elements";

import * as styles from "./Select.scss";
import { Option, SelectProps } from "./types";

export function Select<T extends FieldValues>({
  label,
  name,
  className,
  options,
  placeholder,
  onChange,
  control,
}: SelectProps<T>) {
  const findOption = (id: string) => options.find((option) => option.id === id);

  const [isOpened, setIsOpened] = useState(false);
  const refSelect = useRef<HTMLDivElement>(null);
  const refOptions = useRef<HTMLDivElement>(null);

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
    setIsOpened(false);
    onChange(option);
  };

  const handleReset = (event: MouseEvent | React.MouseEvent) => {
    event.stopPropagation();
    onChange(undefined);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = findOption(field.value);

        return (
          <div className={className}>
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
                <div className={styles.value_controls}>
                  <IconArrow
                    width={18}
                    height={18}
                    className={cn(styles.value_icon, {
                      [styles.value_icon__opened]: isOpened,
                    })}
                  />
                  {selected?.name && (
                    <IconDelete width={18} height={18} onClick={handleReset} />
                  )}
                </div>
              </div>

              {isOpened && (
                <div
                  ref={refOptions}
                  className={styles.options}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {options.map((option) => (
                    <div
                      onClick={(event) => handleSelect(event, option)}
                      className={cn(styles.option, {
                        [styles.option__selected]: field.value === option.id,
                      })}
                      key={option.id}
                    >
                      {getSvgElement(option?.icon, 20, 20)}
                      <Text size="md">{option.name}</Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }}
    ></Controller>
  );
}
