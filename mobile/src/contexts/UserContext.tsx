import { AxiosRequestConfig, isAxiosError } from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Alert } from "react-native";
import { api } from "../config/axios";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  phone: string;
  email: string;
  password?: string;
}

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  config: AxiosRequestConfig;
  signInUser: () => Promise<void>;
  getUserInfos: () => Promise<void>;
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

  async function signInUser() {
    try {
      const { data } = await api.post("/signin", {
        email: user?.email,
        password: user?.password,
      });

      setToken(data.token);
    } catch (error) {
      if (isAxiosError(error)) Alert.alert(error.response?.data.message);
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

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, config, signInUser, getUserInfos }}
    >
      {children}
    </UserContext.Provider>
  );
}
