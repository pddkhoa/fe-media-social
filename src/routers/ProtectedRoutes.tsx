import MainLayout from "@/layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("@/pages/home/PageHome"));

const ProtectedRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <Home />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Suspense>
  );
};

export default ProtectedRoutes;
