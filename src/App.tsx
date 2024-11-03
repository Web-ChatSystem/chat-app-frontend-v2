import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorSchemeProvider } from "@/provider/color-scheme/provider.tsx";
import { ThemeProvider } from "@/components/theme/provider.tsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import setupAxiosDefault from "@/provider/setupAxios.ts";
import SignIn from "@/pages/sign-in"; 
import SignUp from "@/pages/sign-up"; 

setupAxiosDefault();

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />, 
  },
  {
    path: "/sign-up",
    element: <SignUp />, 
  },
  {
    path: "*", 
    element: <Navigate to="/sign-in" />,
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  const token = localStorage.getItem("token") || "";
  const isValidToken = (token: string) => {
    if (!token) return false;
    const payload = token?.split(".")[1];
    const decodedPayload = atob(payload);
    const { exp } = JSON.parse(decodedPayload);
    return Date.now() <= exp * 1000;
  };

  useEffect(() => {
    if (!isValidToken(token)) localStorage.removeItem("token");
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider>
        <ThemeProvider>
          <Notifications position="top-right" />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
