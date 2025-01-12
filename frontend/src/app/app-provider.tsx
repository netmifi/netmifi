/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface AppProviderProps {
  user: any;
  setUser: (user: any) => void;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
  cartItems: Course[] | any[];
  setCartItems: (state: Course[] | any[]) => void;
  handleAddToCart: (course: Course) => void;
}

const initialState = {
  user: null,
  setUser: () => {},
  isAuth: false,
  setIsAuth: () => {},
  cartItems: [],
  setCartItems: () => {},
  handleAddToCart: () => {},
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
  const [isAuth, setIsAuth] = useState(false);

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
      if (user) {
        setIsAuth(true);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setIsAuth(false);
        // localStorage.removeItem("user");
      }
    };
  }, [user]);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    cartItems,
    setCartItems,
    handleAddToCart,
  };

  // TODO: Convert cart items to json stringified objects

  // useEffect(() => {
  //   const handleCartItems = () => {
  //     const localCart = localStorage.getItem("cart") || [];
  //     localStorage.setItem("cart", cartItems);
  //   };

  //   return handleCartItems;
  // }, []);

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
