/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useCheckUserAuth } from "../api/hooks/useCheckUserAuth";

interface AppProviderProps {
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
    progress: number,
    elapsedTime: number,
    rate: number,
  }) => void;
}

const initialState = {
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
  const [user, setUser] = useState<any>(
    JSON.parse((Cookies.get("user") as string) ?? JSON.stringify("")) || null
  );
  const [cartItems, setCartItems] = useState<any[]>([]);
  // user !== null ? Object.keys(user).length > 0 : 
  const [isAuth, setIsAuth] = useState(false);
  const [courseUploadProgress, setCourseUploadProgress] = useState({
    progress: 0,
    elapsedTime: 0,
    rate: 0,
  });

  // const checkUser = useCheckUserAuth();

  const handleAddToCart = (course: Course) => {
    if (cartItems.find((item) => item.id === course.id))
      return toast.error(`${course.title} already in cart`);

    setCartItems([...cartItems, course]);
    toast.success(`${course.title} has been added to your cart`);
  };

  useEffect(() => {
    return () => {
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
    };
  }, []);
  useEffect(() => {
    return () => {
      console.log(Cookies.get())
      if (Cookies.get("user") && Cookies.get("jwt")) {
        // const cookieUser = Cookies.get("user");

    }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (user) {
        console.log(Object.keys(user).length > 0);
        setIsAuth(true);
        localStorage.setItem("user", JSON.stringify(user));
        // console.log(user);
      } else {
        // setIsAuth(false);
        console.log('no user');
        // localStorage.removeItem("user");
      }
    };
  }, [user]);

  // useEffect(() => {
  //   const checkCookieAndUpdate = () => {
  //     const userCookie = Cookies.get('user');
  //     if (userCookie) {
  //       checkUser.mutate();
  //     }
  //   };

  //   checkCookieAndUpdate();
  //   const intervalId = setInterval(() => {
  //     console.log('update')
  //     checkCookieAndUpdate();
  //   }, 2 * 60 * 1000);

  //   return () => clearInterval(intervalId);
  // }, [checkUser]);

  // const { data: checkAuthData, error: checkAuthError } = useCheckUserAuth();

  // console.log(checkAuthData, checkAuthError);

  // if (checkAuthData && !checkAuthError) {
  //   setIsAuth(true);
  //   setUser(checkAuthData);
  // }

  const value = {
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
