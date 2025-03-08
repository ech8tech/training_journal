import { ChangeEvent, useState } from "react";

import { InputBase } from "../inputBase/InputBase";
import { InputPasswordProps } from "./types";

export function InputPassword({
  label,
  name,
  className,
  placeholder,
  onChange,
}: InputPasswordProps) {
  const [displayValue, setDisplayValue] = useState("");

  // TODO: в будущем можно добавить иконку просмотра пароля

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayValue(value);
    onChange(value);
  };

  return (
    <InputBase
      displayValue={displayValue}
      className={className}
      label={label}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      inputMode="text"
      type="password"
    />
  );
}
