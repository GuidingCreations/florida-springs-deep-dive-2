'use server'

import { Client, Account, ID, Databases, Users, Graphql } from "node-appwrite";
import { cookies } from "next/headers";

async function createClient () {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return client;
}

export async function createSessionClient() {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      
  
    const session = cookies().get("appwrite-session");
  
    if (!session || !session.value) {
      throw new Error("No session");
    }
  
    client.setSession(session.value);
  
    return {
      get account() {
        return new Account(client);
      },
    };
  }

  export async function createAdminClient() {
   
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setKey(process.env.NEXT_APPWRITE_KEY!);
  
    return {
      get account() {
        return new Account(client);
      },
      get database() {
        return new Databases(client);
      },
      get user() {
        return new Users(client);
      }
    };
  }

  export async function deleteUserProfilePicture({userId} : {userId: string}) {
    try {
      const client  = await createClient();
      const graphql = new Graphql(client);
      const databases = new Databases(client);

      const result = await databases.updateDocument(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_USER_COLLECTION_ID!,
        userId,
        {
          ImageURL: ''
        }
      )

      const response = {result : result, responseCode: 200};

      return response;
    } catch (error) {
      console.log(error);
    }
  }