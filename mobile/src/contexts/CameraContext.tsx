import { Camera, CameraType } from "expo-camera";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  RefObject,
} from "react";
import { Image } from "./UserContext";


interface CameraProviderProps {
  children: ReactNode;
}

type ImageInfos = Image;

export interface CameraContext {
  camRef: RefObject<Camera>;
  type: CameraType;
  setType: Dispatch<SetStateAction<CameraType>>;
  hasPermission: boolean | null;
  setHasPermission: Dispatch<SetStateAction<boolean | null>>;
  requestCameraPermission: () => Promise<void>;
  resetCameraPermission: () => void;
  openCamera: boolean;
  setOpenCamera: Dispatch<SetStateAction<boolean>>;
  image: ImageInfos | null;
  setImage: Dispatch<SetStateAction<ImageInfos | null>>;
}



const CameraContext = createContext<CameraContext | null>(null);

export const useCameraContext = () => useContext(CameraContext);

export function CameraProvider({ children }: CameraProviderProps) {
  const camRef = useRef<Camera>(null);
  const [type, setType] = useState<CameraType>(CameraType.front);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [image, setImage] = useState<ImageInfos | null>(null);

  async function requestCameraPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }

  function resetCameraPermission() {
    setHasPermission(null);
  }

  return (
    <CameraContext.Provider
      value={{
        camRef,
        type,
        setType,
        hasPermission,
        setHasPermission,
        requestCameraPermission,
        resetCameraPermission,
        openCamera,
        setOpenCamera,
        image,
        setImage,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}
