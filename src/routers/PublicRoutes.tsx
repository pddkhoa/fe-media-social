import BlankLayout from "@/layouts/BlankLayout";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const SignIn = lazy(() => import("@/pages/sign-in/PageSignIn"));
const SignUp = lazy(() => import("@/pages/sign-up/PageSignUp"));
const ActiveOTP = lazy(() => import("@/pages/active-account/PageActiveOTP"));
const ActiveEmail = lazy(
  () => import("@/pages/forgot-password/PageForgotPassword")
);

const PublicRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<BlankLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/active-account" element={<ActiveOTP />} />
          <Route path="/forgot-password" element={<ActiveEmail />} />
        </Route>
        <Route path="*" element={<Navigate to={"/sign-in"} replace={true} />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
