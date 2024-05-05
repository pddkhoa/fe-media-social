import MainLayout from "@/layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "rizzui";
const HomeAdmin = lazy(() => import("@/pages/admin/home-admin/PageHomeAdmin"));
const AdminBlog = lazy(() => import("@/pages/admin/AdminBlogs/PageAdminBlog"));
const AdminTag = lazy(() => import("@/pages/admin/AdminTags/PageAdminTags"));
const AdminGroups = lazy(
    () => import("@/pages/admin/AdminGroups/PageAdminGroups")
);
const AdminAccount = lazy(
    () => import("@/pages/admin/AdminAccounts/PageAdminAccount")
);

const SettingCalendar = lazy(
    () => import("@/pages/admin/event-calendar/PageCalendar")
);

const DetailPost = lazy(() => import("@/pages/client/post/PageDetailPost"));
const CreatePost = lazy(() => import("@/pages/client/post/PageCreatePost"));
const EditPost = lazy(() => import("@/pages/client/post/PageEditPost"));
const CreateGroup = lazy(() => import("@/pages/client/group/PageCreateGroup"));
const DetailGroup = lazy(() => import("@/pages/client/group/PageGroupDetail"));
const ProfileSetting = lazy(
    () => import("@/components/moduleAdmin/Account/EditAccount")
);

const AdminRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <HomeAdmin />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/account"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <AdminAccount />
                            </Suspense>
                        }
                    />{" "}
                    <Route
                        path="/admin/blog"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <AdminBlog />
                            </Suspense>
                        }
                    />{" "}
                    <Route
                        path="/admin/blog/detail"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <DetailPost />
                            </Suspense>
                        }
                    />{" "}
                    <Route
                        path="/admin/blog/create"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <CreatePost />
                            </Suspense>
                        }
                    />{" "}
                    <Route
                        path="/admin/blog/edit"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <EditPost />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/group"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <AdminGroups />
                            </Suspense>
                        }
                    />
                    <Route
                        path="admin/group/create"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <CreateGroup />
                            </Suspense>
                        }
                    />
                    <Route
                        path="admin/group/detail/:id"
                        element={
                            <Suspense fallback={<Loader />}>
                                <DetailGroup />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/tag"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <AdminTag />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/account/edit/:id"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <ProfileSetting />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/setting-calendar"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <SettingCalendar />
                            </Suspense>
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={<Navigate to={"/"} replace={true} />}
                />
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;
