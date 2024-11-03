import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorSchemeProvider } from "@/provider/color-scheme/provider.tsx";
import { ThemeProvider } from "@/components/theme/provider.tsx";
import {
  ActionFunction,
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { ReactNode, useEffect } from "react";
import { Shell } from "@/components/shell/shell.tsx";
import setupAxiosDefault from "@/provider/setupAxios.ts";

setupAxiosDefault();
interface ElementProp {
  (): JSX.Element;
  Layout?: (props: { children: ReactNode }) => JSX.Element;
}
interface IRoute {
  path: string;
  Element: ElementProp;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: ElementProp;
}
interface Page {
  default: ElementProp;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: ElementProp;
}

const pages: Record<string, Page> = import.meta.glob("./pages/**/*.tsx", {
  eager: true,
});

const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];

  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  const fallbackElement: ElementProp = () => <></>;
  fallbackElement.Layout = (props) => <>{props.children}</>;

  const route: IRoute = {
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path]?.default || fallbackElement,
  };

  const pageLoader = pages[path]?.loader;
  if (pageLoader) route.loader = pageLoader;

  const pageAction = pages[path]?.action;
  if (pageAction) route.action = pageAction;

  const pageErrorBoundary = pages[path]?.ErrorBoundary;
  if (pageErrorBoundary) route.ErrorBoundary = pageErrorBoundary;

  routes.push(route);
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => {
    const Layout = Element.Layout ?? Shell;
    return {
      ...rest,
      element: (
        <Layout>
          <Element />
        </Layout>
      ),
      ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    };
  }),
);

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
        {/*<SocketProvider>*/}
        <ThemeProvider>
          <Notifications position="top-right" />
          <RouterProvider router={router} />
        </ThemeProvider>
        {/*</SocketProvider>*/}
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
