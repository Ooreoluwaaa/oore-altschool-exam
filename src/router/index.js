import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/home";
import ErrorPage from "@/components/common/error-page";
import SingleTodo from "@/pages/todo";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "todo/:id",
    Component: SingleTodo,
    ErrorBoundary: ErrorPage,
  },
]);

export { router };
