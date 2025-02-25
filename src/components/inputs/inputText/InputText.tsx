import { ChangeEvent, useState } from "react";

import { InputBase } from "../inputBase/InputBase";
import { InputTextProps } from "./types";

export function InputText({
  label,
  name,
  className,
  placeholder,
  onChange,
}: InputTextProps) {
  const [displayValue, setDisplayValue] = useState("");

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
    />
  );
}
