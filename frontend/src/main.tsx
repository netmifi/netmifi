// import "dotenv";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./app/app-provider";
import { StoreProvider } from "easy-peasy";
import store from "./store/store.ts";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// TODO: DELETE AND UNINSTALL FROALA EDITOR
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes    },
    },
  },
});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

persistQueryClient({
  queryClient,
  persister,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <SidebarProvider>
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </SidebarProvider>
        </StoreProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>
);
