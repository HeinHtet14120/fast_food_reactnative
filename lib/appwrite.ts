import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newUser = await account.create(ID.unique(), email, password, name);

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    await signIn({ email, password });

    // getInitialsURL returns a URL string; getInitials returns Promise<ArrayBuffer> (image binary)
    const avatarURL = avatars.getInitialsURL(name).toString();

    console.log("avatarURL", avatarURL);

    const user = await databases.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.usersCollectionId!,
      ID.unique(),
      {
        accountId: newUser.$id,
        name,
        email,
        avatar: avatarURL,
      },
    );

    console.log("user", user);
    return user;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create user",
    );
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
    console.log("sign in session", session);
    if (!session) {
      throw new Error("Failed to sign in");
    }
    return session;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to sign in",
    );
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const user = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.usersCollectionId!,
      [Query.equal("accountId", currentUser.$id)],
    );

    console.log("currnetnuser", user);

    if (!user.documents.length) {
      throw new Error("User data not found");
    }

    console.log("user", user);
    return user.documents[0];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get current user",
    );
  }
};
