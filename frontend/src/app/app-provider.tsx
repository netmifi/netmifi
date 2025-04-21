//  THIS IS THE APP'S CONTEXT PROVIDER FOR STORING GLOBAL AND REUSABLE STATE ** REF the react context provide **
// RULE: any state in the context must be a reusable state

// NOTE: FOLLOW THE STEPS BELOW TO CREATE A STATE

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

// 1. provide the state type to obey typescript linting rule
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

// 2. initialize the state with a default false, this is mainly before the app/component mounts
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
  // 3. declare your state.
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const cookieUser = Cookies.get("user");
    return cookieUser ? JSON.parse(cookieUser) : null;
  });
  const [isAuth, setIsAuth] = useState(
    user && Object.values(user).length > 0 ? true : false
  );
  const [cartItems, setCartItems] = useState<any[]>(
    user && Object.values(user).length > 0 && user.cart.length > 0
      ? user.cart
      : []
  );
  const [courseUploadProgress, setCourseUploadProgress] = useState({
    progress: 0,
    elapsedTime: 0,
    rate: 0,
  });

  // const handleAddToCart = async (course: Course) => {
  //   try {
  //     const response = await fetch("/cart/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: user.id, // or wherever you’re storing the logged-in user ID
  //         productId: course.id,
  //         quantity: 1,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);

  //     if (response.ok && data.state === "success") {
  //       setCartItems(data.data); // Assuming backend returns full cart array
  //       toast.success(`${course.title} added to cart`);
  //     } else {
  //       toast.error(data.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     toast.error("Error adding to cart. Try again.");
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    // this effect checks if there client is logged in by checking  cookies
    if (Cookies.get("user") && Cookies.get("jwt")) {
      const cookieUser = Cookies.get("user");
      if (cookieUser) {
        localStorage.setItem("user", cookieUser);
        setUser(JSON.parse(cookieUser));
        setIsAuth(true);
      }
    } else if (!Cookies.get("jwt")) {
      Cookies.remove("user");
      localStorage.removeItem("user");
      setIsAuth(false);
    }
    // Authentication check finished
    setIsAppLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(user));
      setCartItems(user ? user.cart : []);
    } else {
      setIsAuth(false);
    }
  }, [user]);

  // useEffect(() => {
  //   if (localStorage.) {
  //     setIsAuth(true);
  //     localStorage.setItem("user", JSON.stringify(user));
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, [user]);

  // 4. Put in state so context can carefully export it
  const value = {
    isAppLoading,
    setIsAppLoading,
    user,
    setUser,
    isAuth,
    setIsAuth,
    cartItems,
    setCartItems,
    // handleAddToCart,
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
