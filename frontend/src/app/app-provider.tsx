/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useCheckUserAuth } from "../api/hooks/user/useCheckUserAuth";

interface AppProviderProps {
  isAppLoading: boolean;
  setIsAppLoading: (state: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
  cartItems: Course[] | any[];
  setCartItems: (state: Course[] | any[]) => void;
  handleAddToCart: (course: Course) => void;
  courseUploadProgress: {
    progress: number;
    elapsedTime: number;
    rate: number;
  };
  setCourseUploadProgress: (state: {
    progress: number;
    elapsedTime: number;
    rate: number;
  }) => void;
}

const initialState = {
  isAppLoading: false,
  setIsAppLoading: () => {},
  user: null,
  setUser: () => {},
  isAuth: false,
  setIsAuth: () => {},
  cartItems: [],
  setCartItems: () => {},
  handleAddToCart: () => {},
  courseUploadProgress: {
    progress: 0,
    elapsedTime: 0,
    rate: 0,
  },
  setCourseUploadProgress: () => {},
};

const AppProviderContext = createContext<AppProviderProps>(initialState);

export function AppProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const cookieUser = Cookies.get("user");
    return cookieUser ? JSON.parse(cookieUser) : null;
  });
  const [isAuth, setIsAuth] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [courseUploadProgress, setCourseUploadProgress] = useState({
    progress: 0,
    elapsedTime: 0,
    rate: 0,
  });

  const handleAddToCart = (course: Course) => {
    if (cartItems.find((item) => item.id === course.id))
      return toast.error(`${course.title} already in cart`);

    setCartItems([...cartItems, course]);
    toast.success(`${course.title} has been added to your cart`);
  };

  useEffect(() => {
    if (Cookies.get("user") && Cookies.get("jwt")) {
      const cookieUser = Cookies.get("user");
      if (cookieUser) {
        localStorage.setItem("user", cookieUser);
        setUser(JSON.parse(cookieUser));
      }
    } else if (!Cookies.get("jwt")) {
      Cookies.remove("user");
      localStorage.removeItem("user");
    }
    // Authentication check finished
    setIsAppLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setIsAuth(false);
    }
  }, [user]);

  const value = {
    isAppLoading,
    setIsAppLoading,
    user,
    setUser,
    isAuth,
    setIsAuth,
    cartItems,
    setCartItems,
    handleAddToCart,
    courseUploadProgress,
    setCourseUploadProgress,
  };

  return (
    <AppProviderContext.Provider {...props} value={value}>
      {children}
    </AppProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppProviderContext);

  if (context === undefined)
    throw new Error("useApp must be used within the AppProvider");

  return context;
};
