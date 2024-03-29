import ProfileDetails from "@/components/module/profile/ProfileDetail";
import ProfileHeader from "@/components/module/profile/ProfileHeader";
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
import { UserWall } from "@/type/wall";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const PageProfileMain = () => {
    const user = useSelector((state: RootState) => state.auth.userToken.user);
    const idUser = useParams();
    const [userDetail, setUserDetail] = useState<UserWall>();
    const dispatch = useDispatch();
    const location = useLocation();
    const lisFollower = useSelector(
        (state: RootState) => state.wall.listUserFollower
    );
    const listFollowing = useSelector(
        (state: RootState) => state.wall.listUserFollowing
    );
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
        fetchData();
        fetchFollower();
        fetchFollowing();
    }, [fetchData, fetchFollower, fetchFollowing, location.pathname]);

    const handleFollower = async (id: string) => {
        if (id) {
            dispatch(pendingFollowingSuccess());
            const { body } = await UserServices.followUser(id);
            if (body?.success) {
                dispatch(followUserFollower(id));
                toast.success(body.message);
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
                dispatch(doneFollowingSuccess());
            } else {
                toast.error(body?.message || "Error");
                dispatch(doneFollowingSuccess());
            }
        }
    };

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
                    />
                </>
            )}
        </>
    );
};

export default PageProfileMain;
