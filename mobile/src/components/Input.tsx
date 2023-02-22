import { useState } from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  isError: boolean;
}

export function Input({ isError, onBlur, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const borderColor = isFocused ? "#000000" : isError ? "#EF4444" : "#D8DADC";

  function onBlurFunction(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(false);
    onBlur?.(e);
  }

  return (
    <TextInput
      {...props}
      className="w-full h-14 p-4 bg-background border rounded-lg font-regular text-base text-black/100 placeholder:font-regular placeholder:text-base placeholder:text-black/50"
      style={{
        borderColor,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={onBlurFunction}
    />
  );
}
