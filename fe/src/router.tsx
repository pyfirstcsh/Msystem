import { createHashRouter } from "react-router-dom";
import About from "./About";
import App from "./App";
import Details from "./Details";
import Login from "./Login";
import MainContent from "./MainContent";
import NotFound from "./NotFound";
// 路由信息配置
const router = createHashRouter([
  {
    path: "/main/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <MainContent />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "details/:_id",
        element: <Details />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);

export default router;
