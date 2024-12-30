import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { UserProvider } from "./context/UserContext";
import { authActions } from "./store/auth";
import { SocketContextProvider } from "./context/SocketContext";

// Lazy-loaded components
const Home = lazy(() => import("./core/public/homePage/Home"));
const Layout = lazy(() => import("./core/private/Layout"));
const ErrorPage = lazy(() => import("./core/public/errorPage/ErrorPage"));
const DashboardIndex = lazy(() => import("./core/private/dashboard"));
const UserIndex = lazy(() => import("./core/private/user"));
const LoginPage = lazy(() =>
  import("./core/public/loginAndRegister/loginPage")
);
const RegisterPage = lazy(() =>
  import("./core/public/loginAndRegister/RegisterPage")
);
const ProductDetails = lazy(() =>
  import("./core/public/productDetails/ProductDetails")
);
const UserProfile = lazy(() => import("./core/public/userProfile/UserProfile"));
const CustomerProfile = lazy(() =>
  import("./core/public/customerProfile/CustomerProfile")
);
const MessagePage = lazy(() => import("./core/public/messages/messagePage"));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking auth state:", isAuthenticated, role);
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      const roleFromLocalStorage = localStorage.getItem("role");
      dispatch(authActions.login());
      dispatch(authActions.changeRole(roleFromLocalStorage));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <UserProvider>
        <SocketContextProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route path="/products/:bookId" element={<ProductDetails />} />
            <Route path="/customerprofile/:id" element={<CustomerProfile />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/error" element={<ErrorPage />} />

            {/* Authenticated Routes - Accessible if User is Authenticated */}
            <Route
              path="/profile"
              element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />}
            />

            {/* Private Routes - Only accessible if authenticated and role is 'admin' */}
            {isAuthenticated && role === "admin" ? (
              <Route path="/admin" element={<Layout />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<DashboardIndex />} />
                <Route path="users" element={<UserIndex />} />
              </Route>
            ) : (
              <Route path="/admin/*" element={<Navigate to="/login" />} />
            )}

            {/* Catch-All Route for 404 Errors */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </SocketContextProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
