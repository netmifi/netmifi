/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AppProviderProps {
  user: never[];
  setUser: (user: never) => void;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
  cartItems: Course[] | any[];
  setCartItems: (state: Course[] | any[]) => void;
  handleAddToCart: (course: Course) => void;
}

const initialState = {
  user: [],
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
  const [user, setUser] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isAuth, setIsAuth] = useState(true);

  const handleAddToCart = (course: Course) => {
    if (cartItems.find((item) => item.id === course.id))
      return toast.error(`${course.title} already in cart`);

    setCartItems([...cartItems, course]);
    toast.success(`${course.title} has been added to your cart`);
  };

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    cartItems,
    setCartItems,
    handleAddToCart,
  };

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
