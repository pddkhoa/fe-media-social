import MainLayout from "@/layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("@/pages/home/PageHome"));
const Profile = lazy(() => import("@/pages/profile/PageProfileMain"));
const ProfileSetting = lazy(() => import("@/pages/profile/PageProfileSetting"));
const SettingDetail = lazy(
  () => import("@/components/profile-setting/TabDetail")
);
const SettingPassword = lazy(
  () => import("@/components/profile-setting/TabPassword")
);

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
          <Route
            path="/profile"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/profile-setting"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <ProfileSetting />
              </Suspense>
            }
          >
            <Route index element={<SettingDetail />} />
            <Route path="password" element={<SettingPassword />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Suspense>
  );
};

export default ProtectedRoutes;
