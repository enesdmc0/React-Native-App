import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.enesdmc.react",
  projectId: "666da0fb000a675d1630",
  databaseId: "666da2ad003692e0255c",
  userCollectionId: "666da2ef001d8b0cdbe2",
  videoCollectionId: "666da32500212c0be420",
  storageId: "666da5a2001fa18e589b",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register a new user
export const createUser = async (email, password, username) => {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

// Sign in a user
export const signIn = async (email, password) =>  {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }



// Get Current User
export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    }catch(error) {
        console.log(error)
        return null
    }
}