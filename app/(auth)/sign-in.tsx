import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

type SignInParams = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SignInParams>({
    email: "",
    password: "",
  });

  const submit = async () => {
    const { email, password } = form;
    setIsSubmitting(true);

    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await signIn({ email, password });
      Alert.alert("Success", "Sign in successful");
      setIsSubmitting(false);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className=" gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Email"
        placeholder="Enter Email"
        value={form.email}
        secureTextEntry={false}
        keyboardType="email-address"
        onChangeText={(text: string) => {
          setForm({ ...form, email: text });
        }}
      />
      <CustomInput
        label="Password"
        placeholder="Enter Password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(text: string) => {
          setForm({ ...form, password: text });
        }}
      />
      <CustomButton title="Sign In" onPress={submit} isLoading={isSubmitting} />

      <View className="flex-row items-center justify-center gap-2">
        <Text>Don&apos;t have an account?</Text>
        <Link href="/sign-up" className="text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
