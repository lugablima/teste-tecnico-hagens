import {
  useForm,
  Controller,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, ButtonProps } from "./Button";
import { ReactNode } from "react";

interface Input<K> extends TextInputProps {
  label: string;
  controllerName: Path<K>;
  maskField?: (value: string) => string;
}

export interface FormData<K> {
  onSubmit: (data: K) => void;
  inputs: Input<K>[];
  button: ButtonProps;
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
  });

  return (
    <View className="w-full max-w-sm items-center gap-y-5">
      {formData.inputs.map(
        ({ label, controllerName, placeholder, maskField, ...rest }) => (
          <View className="w-full gap-y-1" key={Math.random()}>
            <Text className="font-regular text-sm text-black self-start">
              {label}
            </Text>
            <Controller
              control={control}
              name={controllerName}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={(text) =>
                    maskField ? onChange(maskField(text)) : onChange(text)
                  }
                  onBlur={onBlur}
                  value={value}
                  placeholder={placeholder}
                  {...rest}
                  className="w-full h-14 p-4 bg-background border rounded-lg placeholder:font-regular placeholder:text-base placeholder:text-black/50"
                  style={{
                    borderColor: errors[controllerName] ? "#EF4444" : "#D8DADC",
                  }}
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

      {/* <View className="w-full gap-y-1">
        <Text className="font-regular text-sm text-black self-start">
          Telefone
        </Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput  
              onChangeText={(text) => onChange(maskPhone(text))}
              onBlur={onBlur}
              value={value}
              placeholder="(xx) xxxxx-xxxx"
              keyboardType="numeric"
              maxLength={15}
              className="w-full h-14 p-4 bg-background border rounded-lg placeholder:font-regular placeholder:text-base placeholder:text-black/50"
              style={{
                borderColor: errors.phone ? "#EF4444" : "#D8DADC",
              }}
            />
          )}
        />
        {errors.phone && (
          <Text className="font-regular text-xs text-red-500 self-start">
            {errors.phone.message}
          </Text>
        )}
      </View>

      <View className="w-full gap-y-1">
        <Text className="font-regular text-sm text-black self-start">
          E-mail
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="exemplo@email.com"
              className="w-full h-14 p-4 bg-background border rounded-lg placeholder:font-regular placeholder:text-base placeholder:text-black/50"
              style={{
                borderColor: errors.email ? "#EF4444" : "#D8DADC",
              }}
            />
          )}
        />
        {errors.email && (
          <Text className="font-regular text-xs text-red-500 self-start">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View className="w-full gap-y-1">
        <Text className="font-regular text-sm text-black self-start">
          Senha
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Digite sua senha"
              secureTextEntry
              className="w-full h-14 p-4 bg-background border rounded-lg placeholder:font-regular placeholder:text-base placeholder:text-black/50"
              style={{
                borderColor: errors.password ? "#EF4444" : "#D8DADC",
              }}
            />
          )}
        />
        {errors.password && (
          <Text className="font-regular text-xs text-red-500 self-start">
            {errors.password.message}
          </Text>
        )}
      </View> */}

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
