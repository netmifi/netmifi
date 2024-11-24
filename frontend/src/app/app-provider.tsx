/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

interface AppProviderProps {
  user: never[];
  setUser: (user: never) => void;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
}

const initialState = {
  user: [],
  setUser: () => {},
  isAuth: false,
  setIsAuth: () => {},
};

const AppProviderContext = createContext<AppProviderProps>(initialState);

export function AppProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(true);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
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
