import { images } from "@/constants";
import { Slot } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const _layout = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="h-full bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="w-full relative"
          style={{
            height: Dimensions.get("screen").height / 2.25,
            overflow: "visible",
          }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-3xl"
            resizeMode="stretch"
          />
          <Image
            source={images.logoone}
            className="self-center size-36 rounded-md absolute -bottom-5 z-10 "
            resizeMode="contain"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default _layout;
