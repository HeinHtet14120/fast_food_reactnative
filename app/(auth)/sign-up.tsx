import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SignUpParams>({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const { name, email, password } = form;

    setIsSubmitting(true);
    try {
      if (!name || !email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      await createUser({ name, email, password });

      Alert.alert("Success", "Sign up successful");
      setIsSubmitting(false);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Name"
        placeholder="Enter Full Name"
        value={form.name}
        keyboardType="default"
        onChangeText={(text: string) => setForm({ ...form, name: text })}
      />
      <CustomInput
        label="Email"
        placeholder="Enter Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text: string) => setForm({ ...form, email: text })}
      />
      <CustomInput
        label="Password"
        placeholder="Enter Password"
        value={form.password}
        secureTextEntry={true}
        keyboardType="default"
        onChangeText={(text: string) => setForm({ ...form, password: text })}
      />
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />

      <View className="flex-row items-center justify-center gap-2">
        <Text>Already have an account?</Text>
        <Link href="/sign-in" className="text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
