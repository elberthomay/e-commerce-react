import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./components/AppLayout";
import Cart from "./pages/Cart";
import MyShop from "./pages/MyShop";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import UserAddress from "./features/user/UserAddress";
import UserSettings from "./features/user/UserSettings";
import UserData from "./features/user/UserData";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PathNotFound from "./pages/PathNotFound";
import { Toaster } from "react-hot-toast";
import MyShopDashboard from "./features/myshop/MyShopDashboard";
import MyShopItems from "./features/myshop/MyShopItems";
import MyShopSettings from "./features/myshop/MyShopSettings";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthenticationCheck from "./features/auth/AuthenticationCheck";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/shop/:shopId" element={<Shop />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
            <Route
              path="/user/settings/"
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              }
            >
              <Route index element={<UserData />} />
              <Route path="address" element={<UserAddress />} />
            </Route>
          </Route>
          <Route
            path="/myshop/"
            element={
              <ProtectedRoute>
                <MyShop />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyShopDashboard />} />
            <Route path="dashboard" element={<MyShopDashboard />} />
            <Route path="items" element={<MyShopItems />} />
            <Route path="settings" element={<MyShopSettings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PathNotFound />} />

          <Route path="/auth/check" element={<AuthenticationCheck />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
