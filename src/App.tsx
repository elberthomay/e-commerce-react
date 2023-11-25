import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLayout from "./components/AppLayout";
import Cart from "./pages/Cart";
import MyShop from "./pages/MyShop";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import UserAddress from "./features/setting/UserAddress";
import UserSettings from "./features/setting/UserSettings";
import UserData from "./features/setting/UserData";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PathNotFound from "./pages/PathNotFound";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/myshop" element={<MyShop />} />
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
              <Route path="/user/settings/address" element={<UserAddress />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PathNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
