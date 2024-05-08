import "./styles/app.scss";
import HomePage from "./routes/homePage/homePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPages";
import SignlePage from "./routes/singlePage/signlePage";
import LoginPage from "./routes/loginPage/loginPage";
import ProfilePage from "./routes/profilePage/profilePage";
import RegisterPage from "./routes/registerPage/registerPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SignlePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
