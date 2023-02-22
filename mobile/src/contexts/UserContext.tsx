import { AxiosRequestConfig, isAxiosError } from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Alert } from "react-native";
import { api } from "../config/axios";
import { SignInCredentials } from "../screens/SignIn";
import {
  fetchAsyncStorageToken,
  setAsyncStorageToken,
} from "../utils/asyncStorageUtils";

interface UserProviderProps {
  children: ReactNode;
}

export interface Image {
  name: string;
  type: string;
  data: string;
}

export interface User {
  name: string;
  phone: string;
  email: string;
  password?: string;
  image?: Image;
}

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  config: AxiosRequestConfig;
  configEdit: AxiosRequestConfig;
  signInUser: (data: SignInCredentials) => Promise<void>;
  getUserInfos: () => Promise<void>;
  resetUserAndTokenStates: () => void;
}

const UserContext = createContext<UserContext | null>(null);

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const config: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const configEdit: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  async function signInUser(data: SignInCredentials) {
    try {
      const { data: res } = await api.post("/signin", data);

      setToken(res.token);
    } catch (error) {
      if (isAxiosError(error)) throw new Error(error.response?.data);
    }
  }

  async function getUserInfos() {
    try {
      const { data } = await api.get("/users/info", config);
      setUser(data);
    } catch (error) {
      if (isAxiosError(error)) Alert.alert(error.response?.data);
    }
  }

  function resetUserAndTokenStates() {
    setUser(null);
    setToken(null);
  }

  useEffect(() => {
    fetchAsyncStorageToken().then((token) => setToken(token));
  }, []);

  useEffect(() => {
    if (token) {
      setAsyncStorageToken(token);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        config,
        configEdit,
        signInUser,
        getUserInfos,
        resetUserAndTokenStates,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
