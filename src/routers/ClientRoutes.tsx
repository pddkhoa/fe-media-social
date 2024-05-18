import ToastNotification from "@/components/module/notification/ToastNotification";
import useAuth from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import { SOCKET_URL } from "@/utils/contants";
import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "rizzui";
import { Socket, io } from "socket.io-client";
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
const Notification = lazy(
    () => import("@/pages/client/notification/PageNotification")
);
const GroupMain = lazy(() => import("@/pages/client/group/PageGroup"));
const CreateGroup = lazy(() => import("@/pages/client/group/PageCreateGroup"));
const PageMyGroup = lazy(() => import("@/pages/client/group/PageMyGroup"));
const PageMyGroupCreate = lazy(
    () => import("@/pages/client/group/PageMyGroupCreate")
);

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
const Introduction = lazy(
    () => import("@/pages/client/mutil-introduction/PageIntrodution")
);

const ClientRoutes = () => {
    const [socket, setSocket] = useState<Socket | undefined>();
    const { user } = useAuth();

    const [noti, setNoti] = useState<any>([]);
    useEffect(() => {
        socket?.emit("addUser", { userId: user.user._id });
    }, [socket, user.user._id]);

    useEffect(() => {
        socket?.on("notification", (data: any) => {
            setNoti((prev: any) => [...prev, data]);
        });
    }, [socket]);

    useEffect(() => {
        const newSocket = io(SOCKET_URL as any);
        setSocket(newSocket);
    }, []);

    useEffect(() => {
        if (noti.length > 0) {
            const latestNotification = noti[noti.length - 1];
            toast(
                <ToastNotification
                    type={latestNotification.type}
                    user={latestNotification.data}
                />
            );
        }
    }, [noti]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {user?.user?.isLogin ? (
                    <>
                        <Route element={<MainLayout socket={socket} />}>
                            <Route
                                path="/"
                                element={
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <NewsFeed socket={socket} />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/profile/:id"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Profile socket={socket} />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Profile socket={socket} />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/post/:id"
                                element={
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <DetailPost socket={socket} />
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
                                path="/notification"
                                element={
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <Notification />
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
                                path="/group/my-created"
                                element={
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <PageMyGroupCreate />
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
                                    <Suspense fallback={<Loader />}>
                                        <DetailGroup socket={socket} />
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
                                    <Suspense fallback={<Loader />}>
                                        <Message socket={socket} />
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
                                        <PageBookmark socket={socket} />
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
                                    <Suspense fallback={<Loader />}>
                                        <PageLastest socket={socket} />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/discusstion"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <PageDiscusstion socket={socket} />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/popular"
                                element={
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <PagePopular socket={socket} />
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
                                <Route
                                    path="password"
                                    element={<SettingPassword />}
                                />
                            </Route>
                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to={"/"} replace={true} />}
                        />
                    </>
                ) : (
                    <>
                        <Route
                            path="/introduction"
                            element={
                                <Suspense fallback={<div>Loading ...</div>}>
                                    <Introduction />
                                </Suspense>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <Navigate to={"/introduction"} replace={true} />
                            }
                        />
                    </>
                )}
            </Routes>
        </Suspense>
    );
};

export default ClientRoutes;
