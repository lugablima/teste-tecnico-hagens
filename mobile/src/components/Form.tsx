import {
  useForm,
  Controller,
  FieldValues,
  Path,
  DeepPartial,
} from "react-hook-form";
import { Text, TextInputProps, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, ButtonProps } from "./Button";
import { ReactNode } from "react";
import { Input } from "./Input";

interface Input<K> extends TextInputProps {
  id: string;
  label: string;
  controllerName: Path<K>;
  maskField?: (value: string) => string;
}

export interface FormData<K> {
  onSubmit: (data: K) => void;
  inputs: Input<K>[];
  button: ButtonProps;
  defaultValues?: DeepPartial<K> 
}

interface FormProps<K> {
  schema: yup.ObjectSchema<yup.AnyObject>;
  formData: FormData<K>;
}

export function Form<T extends FieldValues>({
  schema,
  formData,
}: FormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: formData.defaultValues
  });

  return (
    <View className="w-full max-w-sm items-center gap-y-5">
      {formData.inputs.map(
        ({ id, label, controllerName, placeholder, maskField, ...rest }) => (
          <View className="w-full gap-y-1" key={id}>
            <Text className="font-regular text-sm text-black self-start">
              {label}
            </Text>
            <Controller
              control={control}
              name={controllerName}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={(text) =>
                    maskField ? onChange(maskField(text)) : onChange(text)
                  }
                  onBlur={onBlur}
                  value={value}
                  placeholder={placeholder}
                  {...rest}
                  isError={errors[controllerName] && true}  
                />
              )}
            />
            {errors[controllerName] && (
              <Text className="font-regular text-xs text-red-500 self-start">
                {errors[controllerName]?.message as ReactNode}
              </Text>
            )}
          </View>
        )
      )}
      
      <Button
        buttonStyle={formData.button.buttonStyle}
        title={formData.button.title}
        mt={formData.button.mt}
        mb={formData.button.mb}
        onPress={handleSubmit(formData.onSubmit)}
      />
    </View>
  );
}
