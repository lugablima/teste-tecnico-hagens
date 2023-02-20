import { TouchableOpacityProps, Text, TouchableOpacity } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
    title: string;
    buttonStyle: "light" | "dark";
    mt?: number; 
    mb?: number;
}

export function Button(props: ButtonProps) {
    const bgColor = props.buttonStyle === "light" ? "#FFFFFF" : "#000000",
        textColor = props.buttonStyle === "light" ? "#000000" : "#FFFFFF",
        borderWidth = props.buttonStyle === "light" ? 1 : undefined,
        borderColor = props.buttonStyle === "light" ? "#747474" : undefined;

    return (
            <TouchableOpacity
                onPress={props.onPress}
                activeOpacity={0.7}
                className="w-full max-w-sm h-14 rounded-lg flex flex-row items-center justify-center"
                style={{ backgroundColor: bgColor, borderWidth, borderColor, marginTop: props.mt, marginBottom: props.mb }}
            >
                <Text
                    className="font-semibold text-base"
                    style={{ color: textColor }}
                >
                    {props.title}
                </Text>
            </TouchableOpacity>
    );
}

Button.defaultProps = {
    mt: 0,
    mb: 20
}