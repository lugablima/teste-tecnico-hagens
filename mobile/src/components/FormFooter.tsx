import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface FormFooterProps extends TouchableOpacityProps {
  text: string;
  strong: string;
}

export function FormFooter({ text, strong, onPress }: FormFooterProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Text className="font-regular text-sm text-black/70 self-center">
        {text}
        <Text> </Text>
        <Text className="font-semibold text-black/100 underline">{strong}</Text>
      </Text>
    </TouchableOpacity>
  );
}
