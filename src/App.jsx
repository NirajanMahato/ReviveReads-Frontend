import { Loader } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { UserProvider } from "./context/UserContext";
import EditProfile from "./core/public/userProfile/EditProfile";
import UserProfile from "./core/public/userProfile/UserProfile";
import { authActions } from "./store/auth";

// Lazy-loaded components
const Home = lazy(() => import("./core/public/homePage/Home"));
const Layout = lazy(() => import("./core/private/Layout"));
const ErrorPage = lazy(() => import("./core/public/errorPage/ErrorPage"));
const DashboardIndex = lazy(() => import("./core/private/dashboard"));
const UserIndex = lazy(() => import("./core/private/user"));
const LoginPage = lazy(() => import("./core/public/loginAndRegister/loginPage"));
const RegisterPage = lazy(() => import("./core/public/loginAndRegister/RegisterPage"));
const ProductDetails = lazy(() => import("./core/public/productDetails/ProductDetails"));

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
    <Suspense fallback={<LoadingScreen/>}>
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}/>
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}/>
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/loader" element={<Loader />} />

          {/* Private Routes - Only accessible if authenticated and role is 'admin' */}
          {isAuthenticated && role === "admin" ? (
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<DashboardIndex />} />
              <Route path="user" element={<UserIndex />} />
            </Route>
          ) : (
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          )}

          {/* Catch-All Route for 404 Errors */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserProvider>
    </Suspense>
  );
}

export default App;
