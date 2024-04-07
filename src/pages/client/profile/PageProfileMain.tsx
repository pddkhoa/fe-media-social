import ProfileDetails from "@/components/module/profile/ProfileDetail";
import ProfileHeader from "@/components/module/profile/ProfileHeader";
import BlogServices from "@/services/blog";
import UserServices from "@/services/user";
import { RootState } from "@/store/store";
import {
    doneFollowingSuccess,
    followUserFollower,
    followUserFollowing,
    getListFollower,
    getListFollowing,
    pendingFollowingSuccess,
} from "@/store/wallSlice";
import { Post } from "@/type/post";
import { UserWall } from "@/type/wall";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Loader } from "rizzui";

const PageProfileMain = () => {
    const user = useSelector((state: RootState) => state.auth.userToken.user);
    const idUser = useParams();
    const [userDetail, setUserDetail] = useState<UserWall>();
    const [postShare, setPostShare] = useState<Post[]>([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const loadingPage = useSelector(
        (state: RootState) => state.noti.loadingPage
    );
    const [isFollow, setIsFollow] = useState(false);
    const lisFollower = useSelector(
        (state: RootState) => state.wall.listUserFollower
    );
    const listFollowing = useSelector(
        (state: RootState) => state.wall.listUserFollowing
    );

    const fetchPostShare = useCallback(async () => {
        try {
            const { body } = await BlogServices.getBlogShare(
                idUser.id ? idUser.id : user._id
            );
            if (body?.success) {
                setPostShare(body?.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setPostShare, user._id, idUser.id]);

    const fetchData = useCallback(async () => {
        try {
            const { body } = await UserServices.getWallDetail(
                idUser.id ? idUser.id : user._id
            );
            if (body?.success) {
                setUserDetail(body?.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setUserDetail, user._id, idUser.id]);

    const fetchFollower = useCallback(async () => {
        try {
            const { body } = await UserServices.getListUserFollower(
                idUser.id ? idUser.id : user._id
            );
            if (body?.success) {
                dispatch(getListFollower(body?.result));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [dispatch, user._id, idUser.id]);
    const fetchFollowing = useCallback(async () => {
        try {
            const { body } = await UserServices.getListUserFollowing(
                idUser.id ? idUser.id : user._id
            );
            if (body?.success) {
                dispatch(getListFollowing(body?.result));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [dispatch, user._id, idUser.id]);

    useEffect(() => {
        setIsFollow(false);
        fetchData();
        fetchFollower();
        fetchFollowing();
        fetchPostShare();
    }, [
        fetchPostShare,
        fetchData,
        fetchFollower,
        fetchFollowing,
        location.pathname,
        isFollow,
    ]);

    const handleFollower = async (id: string) => {
        if (id) {
            dispatch(pendingFollowingSuccess());
            const { body } = await UserServices.followUser(id);
            if (body?.success) {
                dispatch(followUserFollower(id));
                toast.success(body.message);
                setIsFollow(true);
                dispatch(doneFollowingSuccess());
            } else {
                toast.error(body?.message || "Error");
                dispatch(doneFollowingSuccess());
            }
        }
    };
    const handleFollowing = async (id: string) => {
        if (id) {
            dispatch(pendingFollowingSuccess());
            const { body } = await UserServices.followUser(id);
            if (body?.success) {
                dispatch(followUserFollowing(id));
                toast.success(body.message);
                setIsFollow(true);
                dispatch(doneFollowingSuccess());
            } else {
                toast.error(body?.message || "Error");
                dispatch(doneFollowingSuccess());
            }
        }
    };

    if (loadingPage)
        return (
            <div className="flex h-full w-full justify-center items-center">
                <Loader size="xl" variant="spinner" />
            </div>
        );

    return (
        <>
            {userDetail && lisFollower && listFollowing && (
                <>
                    <ProfileHeader userDetail={userDetail} />
                    <ProfileDetails
                        userDetail={userDetail}
                        lisFollower={lisFollower}
                        listFollowing={listFollowing}
                        handleFollower={handleFollower}
                        handleFollowing={handleFollowing}
                        postShare={postShare}
                    />
                </>
            )}
        </>
    );
};

export default PageProfileMain;
