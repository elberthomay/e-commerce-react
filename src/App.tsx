import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";
const Cart = lazy(() => import("./pages/Cart"));
const MyShop = lazy(() => import("./pages/MyShop"));
const Shop = lazy(() => import("./pages/Shop"));
import ItemDetail from "./pages/ItemDetail";
const UserAddress = lazy(() => import("./features/user/UserAddress"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const UserData = lazy(() => import("./features/user/UserData"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PathNotFound from "./pages/PathNotFound";
import { Toaster } from "react-hot-toast";
const MyShopDashboard = lazy(() => import("./features/myshop/MyShopDashboard"));
const MyShopItems = lazy(() => import("./features/myshop/MyShopItems"));
const MyShopDataSettings = lazy(
  () => import("./features/myshop/MyShopDataSettings")
);
import AuthenticationCheck from "./features/auth/AuthenticationCheck";
const MyShopSetting = lazy(() => import("./features/myshop/MyShopSetting"));
const MyShopAddressSettings = lazy(
  () => import("./features/myshop/MyShopAddressSettings")
);
import CursorFollowingCircle from "./components/CursorFollowingCircle";
import OrderItem from "./pages/OrderItem";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CursorFollowingCircle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Suspense>
                    <Cart />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Suspense>
                    <Orders />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:orderId"
              element={
                <ProtectedRoute>
                  <Suspense>
                    <OrderDetail />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:orderId/item/:itemId"
              element={
                <ProtectedRoute>
                  <Suspense>
                    <OrderItem />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop/:shopId"
              element={
                <Suspense>
                  <Shop />
                </Suspense>
              }
            />
            <Route
              path="/item/:itemId"
              element={
                <Suspense>
                  <ItemDetail />
                </Suspense>
              }
            />
            <Route
              path="/user/settings/"
              element={
                <ProtectedRoute>
                  <Suspense>
                    <UserSettings />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <Suspense>
                    <UserData />
                  </Suspense>
                }
              />
              <Route
                path="address"
                element={
                  <Suspense>
                    <UserAddress />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route
            path="/myshop/"
            element={
              <ProtectedRoute>
                <Suspense>
                  <MyShop />
                </Suspense>
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Suspense>
                  <MyShopDashboard />
                </Suspense>
              }
            />
            <Route
              path="dashboard"
              element={
                <Suspense>
                  <MyShopDashboard />
                </Suspense>
              }
            />
            <Route
              path="items"
              element={
                <Suspense>
                  <MyShopItems />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense>
                  <MyShopSetting />
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense>
                    <MyShopDataSettings />
                  </Suspense>
                }
              />
              <Route
                path="data"
                element={
                  <Suspense>
                    <MyShopDataSettings />
                  </Suspense>
                }
              />
              <Route
                path="address"
                element={
                  <Suspense>
                    <MyShopAddressSettings />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route
            path="/login"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense>
                <Signup />
              </Suspense>
            }
          />
          <Route path="*" element={<PathNotFound />} />

          <Route path="/auth/check" element={<AuthenticationCheck />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
