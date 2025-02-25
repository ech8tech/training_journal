import { ChangeEvent, useState } from "react";

import { InputBase } from "../inputBase/InputBase";
import { InputTelProps } from "./types";

export function InputTel({
  label,
  name,
  className,
  placeholder,
  onChange,
}: InputTelProps) {
  const [displayValue, setDisplayValue] = useState("");

  // TODO: в будущем можно добавить логику маски телефона

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
      inputMode="tel"
    />
  );
}
