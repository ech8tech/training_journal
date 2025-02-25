import { ChangeEvent, useState } from "react";

import { InputBase } from "../inputBase/InputBase";
import { InputNumberProps } from "./types";

export function InputNumber({
  label,
  name,
  className,
  placeholder,
  onChange,
}: InputNumberProps) {
  const [displayValue, setDisplayValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d,]/g, "");
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
      inputMode="decimal"
    />
  );
}
