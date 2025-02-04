import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/auth/loginPage.tsx";
import DefaultLayout from "@/layouts/default.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import RegisterPage from "@/pages/auth/register/registerPage.tsx";
import ForgotPasswordPage from "@/pages/auth/forgotPassword/forgotPasswordPage.tsx";
import CodePage from "@/pages/auth/forgotPassword/codePage.tsx";
import SetNewPasswordPage from "@/pages/auth/forgotPassword/setNewPasswordPage.tsx";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<ForgotPasswordPage />} path="/reset-password" />
      <Route element={<CodePage />} path="/check-code" />
      <Route element={<SetNewPasswordPage />} path="/change-password" />
      <Route
        element={
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        }
        path="/"
      >
        <Route index element={<IndexPage />} />
        <Route element={<IndexPage />} path="/home" />
      </Route>
    </Routes>
  );
}

export default App;
