import { CustomInputProps } from "@/type";
import cn from "clsx";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const CustomInput = ({
  placeholder = "Enter Text",
  value = "",
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  label = "",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  return (
    <View>
      <Text className="label">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={inputValue}
        onChangeText={handleChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#888"
        className={cn(
          "input",
          isFocused ? "border-primary" : "border-gray-200",
        )}
      />
    </View>
  );
};

export default CustomInput;
