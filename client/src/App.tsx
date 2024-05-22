import "./styles/app.scss";
import HomePage from "./routes/homePage/homePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPages";
import LoginPage from "./routes/loginPage/loginPage";
import ProfilePage from "./routes/profilePage/profilePage";
import RegisterPage from "./routes/registerPage/registerPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, singlePageLoader } from "./utils/loaders";
import SinglePage from "./routes/singlePage/singlePage";

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
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
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
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        { path: "/profile", element: <ProfilePage /> },
        { path: "/profile/update", element: <ProfileUpdatePage /> },
        { path: "/add", element: <NewPostPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
