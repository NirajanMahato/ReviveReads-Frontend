import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/// Eager loading and lazy loading
// import Home from "./core/public/homePage/Home";
const Home = lazy(() => import("./core/public/homePage/Home"));
const Layout = lazy(() => import("./core/private/Layout"));
const ErrorPage = lazy(() => import("./core/public/errorPage/ErrorPage"));
const DashboardIndex = lazy(() => import("./core/private/dashboard"));
const UserIndex = lazy(() => import("./core/private/user/"));

function App(){
  const privateRoutes = [{path: "/admin", element: (<Suspense> <Layout/> </Suspense>),errorElement: <>Error</>, children: [
    {
      path: "/admin/dashboard",
      element : <Suspense> <DashboardIndex/> </Suspense>,
      errorElement: <>Error</>
    },
    {
      path: "/admin/user",
      element : <Suspense> <UserIndex/> </Suspense>,
      errorElement: <>Error</>
    },
    ]
  },
];

  const publicRoutes = [{path: "/", element: (<Suspense> <Home/> </Suspense>),errorElement: <>Error</>},
                        {path: "/Error", element: (<Suspense> <ErrorPage/> </Suspense>),errorElement: <>Error</>},
  ];
  
  //Logic TODO
  const isAuthenticated = true;

  const routes = isAuthenticated ? privateRoutes : publicRoutes;

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  )
}

export default App;