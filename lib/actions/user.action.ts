"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { SignUpParams } from "@/types";

const {
  NEXT_APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: { userId: string }) => {
  try {
    const { database } = await createAdminClient();

    console.log('database', database)

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    console.log('user', user)

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    console.log('Session created', session)
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });
    console.log('Get user info from sign-in', user)
    return {user: parseStringify(user), response: 200};
  } catch (error : any) {
    console.error("Error", error);
    return { responseCode: 500, error: error.response.message };
  }
};

// Sign up function

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName, dateOfBirth } = userData;

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    console.log("admin client created");

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user");
    console.log("new user account created", newUserAccount);
    console.log("attempt to create new user document");
    console.log('appwrte database id', DATABASE_ID)
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
      }
    );

    console.log("new user created", newUser);

    const session = await account.createEmailPasswordSession(email, password);

    console.log("session created", session);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    console.log("session cookie set");

    return { responseCode: 200, user: parseStringify(newUser) };
  } catch (error : any) {
    
    console.error("Error in user.actions.ts", error.response);
    if (error.response.code === 409 ) {return { responseCode: 409, error: error.response.message }}
    else return { error: error, responseCode: 500, responseType: "error" };
  }
};

export async function getLoggedInUser() {
  try {

    console.log("Admin client attempt")
    const { account } = await createSessionClient();
    console.log("Admin client created", account)
    
    const result = await account.get();
    
    console.log("Account result", result);
    const user = await getUserInfo({ userId: result.$id });
    console.log("logged in user", user);
    return parseStringify(user);
  } catch (error : any) {
    console.log("Error getting logged in user: ", error);
    
    return { error: error, responseCode: 500, responseType: "error" };
  }
}

export async function getUserProfilePicture() {
  try {
    const user = await getLoggedInUser();
    console.log("User from profile pic", user);
    if (user?.responseCode === 500) {
      return null;
    } else {
      if (user.ImageURL) {
        return user.ImageURL;
      } else {
        return '/icons/blank-profile.svg'}
    }
  
  } catch (error) {
    console.log("Error getting user profile picture", error);
  }
}