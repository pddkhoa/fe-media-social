import MainLayout from "@/layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Profile = lazy(() => import("@/pages/client/profile/PageProfileMain"));
const ProfileSetting = lazy(
    () => import("@/pages/client/profile/PageProfileSetting")
);
const SettingDetail = lazy(
    () => import("@/pages/client/profile/PageTabDetail")
);
const SettingPassword = lazy(
    () => import("@/pages/client/profile/PageTabPassword")
);
const CreatePost = lazy(() => import("@/pages/client/post/PageCreatePost"));
const EditPost = lazy(() => import("@/pages/client/post/PageEditPost"));

const NewsFeed = lazy(() => import("@/pages/client/newsfeed/PageNewsFeed"));
const GroupMain = lazy(() => import("@/pages/client/group/PageGroup"));
const CreateGroup = lazy(() => import("@/pages/client/group/PageCreateGroup"));
const PageMyGroup = lazy(() => import("@/pages/client/group/PageMyGroup"));
const DetailGroup = lazy(() => import("@/pages/client/group/PageGroupDetail"));
const TagMain = lazy(() => import("@/pages/client/tags/PageTags"));
const Message = lazy(() => import("@/pages/client/message/PageMessage"));
const Contacts = lazy(() => import("@/pages/client/contacts/PageContacts"));
const DetailPost = lazy(() => import("@/pages/client/post/PageDetailPost"));
const PageBookmark = lazy(() => import("@/pages/client/bookmark/PageBookmark"));
const PageDraft = lazy(() => import("@/pages/client/draft/PageDraft"));
const PageLastest = lazy(
    () => import("@/pages/client/discover/PageListPostLastest")
);
const PagePopular = lazy(
    () => import("@/pages/client/discover/PageListPostPopular")
);
const PageDiscusstion = lazy(
    () => import("@/pages/client/discover/PageListPostDis")
);

const ClientRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <NewsFeed />
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
                        path="/post"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <DetailPost />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/create-post"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <CreatePost />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/edit-post"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <EditPost />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/group"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <GroupMain />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/group/my"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <PageMyGroup />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/group/create"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <CreateGroup />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/group/detail/:id"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <DetailGroup />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/tags"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <TagMain />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/messenger"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <Message />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/contacts"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <Contacts />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/bookmark"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <PageBookmark />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/draft"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <PageDraft />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/lastest"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <PageLastest />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/discusstion"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <PageDiscusstion />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/popular"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <PagePopular />
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

export default ClientRoutes;
