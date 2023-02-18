import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
    title: string;
    buttonStyle: "light" | "dark";
    mb?: number; 
}

export function Button(props: ButtonProps) {
    const bgColor = props.buttonStyle === "light" ? "#FFFFFF" : "#000000",
        textColor = props.buttonStyle === "light" ? "#000000" : "#FFFFFF",
        borderWidth = props.buttonStyle === "light" ? 1 : undefined,
        borderColor = props.buttonStyle === "light" ? "#747474" : undefined;

    return (
            <Pressable
                onPress={props.onPress}
                className="w-full max-w-sm h-14 rounded-lg flex flex-row items-center justify-center"
                style={{ backgroundColor: bgColor, borderWidth, borderColor, marginBottom: props.mb }}
            >
                <Text
                    className="font-semibold text-base"
                    style={{ color: textColor }}
                >
                    {props.title}
                </Text>
            </Pressable>
    );
}

Button.defaultProps = {
    mb: 20
}