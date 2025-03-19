// Context specially for handling theme-ing
// Follow the comments below for details explanation
import { createContext, useContext, useEffect, useState } from "react";
import { useApp } from "./app-provider";

type Theme = "dark" | "light" | "system"; // them types

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  // before app mounts we want the theme to be system default (usually light)
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const { user } = useApp();

  useEffect(() => {
    // this effect takes effect any time theme is changed
    const root = window.document.documentElement;
    root.classList.remove("light", "dark"); // remove the current theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)") // CSS preference. NOTE this does not have any drastic effect on UI based on theme default to light or system
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme); // update theme with new theme
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // this effect takes place when logged in user requests a new theme oor we want to load theme from user preferences
    if (user && user.theme) {
      localStorage.setItem(storageKey, user.theme);
      user.theme !== theme && setTheme(user.theme);
    }
  }, [storageKey, theme, user]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
