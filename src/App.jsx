import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/// Eager loading and lazy loading
// import Home from "./core/public/homePage/Home";
const Home = lazy(() => import("./core/public/homePage/Home"));
const Layout = lazy(() => import("./core/private/Layout"));
import ErrorPage from "./core/public/errorPage/ErrorPage";

function App(){
  const privateRoutes = [{path: "/admin", element: (<Suspense> <Layout/> </Suspense>),errorElement: <>Error</>, children: []},];

  const publicRoutes = [{path: "/", element: (<Suspense> <Home/> </Suspense>),errorElement: <>Error</>},
                        {path: "/Error", element: (<Suspense> <ErrorPage/> </Suspense>),errorElement: <>Error</>},
  ];
  
  //Logic TODO
  const isAuthenticated = false;

  const routes = isAuthenticated ? privateRoutes : publicRoutes;

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  )
}

export default App;