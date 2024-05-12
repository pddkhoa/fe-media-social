import MainLayout from "@/layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "rizzui";
const HomeAdmin = lazy(() => import("@/pages/admin/Dashboard/PageHomeAdmin"));
const AdminBlog = lazy(() => import("@/pages/admin/AdminBlogs/PageAdminBlog"));
const AdminTag = lazy(() => import("@/pages/admin/AdminTags/PageAdminTags"));
const AdminGroups = lazy(
    () => import("@/pages/admin/AdminGroups/PageAdminGroups")
);
const AdminAccount = lazy(
    () => import("@/pages/admin/AdminAccounts/PageAdminAccount")
);
const AdminAccountBlock = lazy(
    () => import("@/pages/admin/AdminAccountBlocks/PageAdminAccountBlock")
);

const SettingCalendar = lazy(
    () => import("@/pages/admin/event-calendar/PageCalendar")
);

const DetailPost = lazy(() => import("@/pages/client/post/PageDetailPost"));
const CreatePost = lazy(() => import("@/pages/client/post/PageCreatePost"));
const EditPost = lazy(() => import("@/pages/client/post/PageEditPost"));
const CreateGroup = lazy(() => import("@/pages/client/group/PageCreateGroup"));
const DetailGroup = lazy(() => import("@/pages/client/group/PageGroupDetail"));
const ProfileSettingEdit = lazy(
    () => import("@/components/moduleAdmin/Account/EditAccount")
);
const ProfileSetting = lazy(
    () => import("@/pages/client/profile/PageProfileSetting")
);
const SettingDetail = lazy(
    () => import("@/pages/client/profile/PageTabDetail")
);
const SettingPassword = lazy(
    () => import("@/pages/client/profile/PageTabPassword")
);

const ReportBlogPage = lazy(
    () => import("@/pages/admin/AdminSupport/ReportBlogPage")
);
const ReportUserPage = lazy(
    () => import("@/pages/admin/AdminSupport/ReportUserPage")
);
const ReportTagPage = lazy(
    () => import("@/pages/admin/AdminSupport/ReportTagPage")
);
const ReportCommentPage = lazy(
    () => import("@/pages/admin/AdminSupport/ReportCommentPage")
);

const ReportPage = lazy(
    () => import("@/pages/admin/AdminReports/AdminReportPage")
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
                        path="/admin/account-block"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <AdminAccountBlock />
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
                                <ProfileSettingEdit />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/report/blog"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <ReportBlogPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/report/tag"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <ReportTagPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/report/comment"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <ReportCommentPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/report/user"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <ReportUserPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/report"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <ReportPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/setting-auto"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <SettingCalendar />
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

                <Route
                    path="*"
                    element={<Navigate to={"/"} replace={true} />}
                />
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;
