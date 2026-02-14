import { Slot } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>Auth _layout</Text>
      <Slot />
    </SafeAreaView>
  );
};

export default _layout;
