import useAuth from "@/hooks/useAuth";
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

const routesConfig = [
    { path: "/", element: <HomeAdmin />, role: "both" },
    { path: "/setting-auto", element: <SettingCalendar />, role: "Editor" },
    {
        path: "/profile-setting",
        element: <ProfileSetting />,
        role: "Editor",
        nested: [
            { index: true, element: <SettingDetail /> },
            { path: "password", element: <SettingPassword /> },
        ],
    },
    { path: "/admin/report/blog", element: <ReportBlogPage />, role: "Editor" },
    { path: "/admin/report/tag", element: <ReportTagPage />, role: "Editor" },
    {
        path: "/admin/report/comment",
        element: <ReportCommentPage />,
        role: "Editor",
    },
    { path: "/admin/report/user", element: <ReportUserPage />, role: "Editor" },
    { path: "/admin/report", element: <ReportPage />, role: "Editor" },
    { path: "/admin/account", element: <AdminAccount />, role: "Admin" },
    {
        path: "/admin/account-block",
        element: <AdminAccountBlock />,
        role: "Admin",
    },
    { path: "/admin/blog", element: <AdminBlog />, role: "Admin" },
    { path: "/admin/blog/detail/:id", element: <DetailPost />, role: "Admin" },
    { path: "/admin/blog/create", element: <CreatePost />, role: "Admin" },
    { path: "/admin/blog/edit", element: <EditPost />, role: "Admin" },
    { path: "/admin/group", element: <AdminGroups />, role: "Admin" },
    { path: "admin/group/create", element: <CreateGroup />, role: "Admin" },
    { path: "admin/group/detail/:id", element: <DetailGroup />, role: "Admin" },
    { path: "/admin/tag", element: <AdminTag />, role: "Admin" },
    {
        path: "/admin/account/edit/:id",
        element: <ProfileSettingEdit />,
        role: "Admin",
    },
];

const AdminRoutes = () => {
    const { user } = useAuth();
    const isEditor = user?.user?.roles === "Editor";

    return (
        <Routes>
            <Route element={<MainLayout />}>
                {routesConfig.map((route) => {
                    if (
                        route.role === "both" ||
                        (isEditor && route.role === "Editor") ||
                        (!isEditor && route.role === "Admin")
                    ) {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Suspense fallback={<Loader />}>
                                        {route.element}
                                    </Suspense>
                                }
                            >
                                {route.nested &&
                                    route.nested.map((nestedRoute, index) => (
                                        <Route key={index} {...nestedRoute} />
                                    ))}
                            </Route>
                        );
                    }
                    return null;
                })}
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AdminRoutes;
