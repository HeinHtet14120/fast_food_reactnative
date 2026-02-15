import { CustomButtonProps } from "@/type";
import cn from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title,
  onPress,
  style,
  leftIcon,
  textStyle,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("custom-btn", style)}
      onPress={onPress}
      disabled={isLoading}
    >
      {leftIcon}

      <View className=" flex-row flex-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
