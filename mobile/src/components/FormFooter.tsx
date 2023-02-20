import { Text, TouchableOpacity } from "react-native";

interface FormFooterProps {
  text: string;
  strong: string;
}

export function FormFooter({ text, strong }: FormFooterProps) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Text className="font-regular text-sm text-black/70 self-center">
        {text}
        <Text> </Text>
        <Text className="font-semibold text-black/100 underline">{strong}</Text>
      </Text>
    </TouchableOpacity>
  );
}
