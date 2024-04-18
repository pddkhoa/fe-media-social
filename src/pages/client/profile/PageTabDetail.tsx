import FormSettingProfile from "@/components/form/FormSettingProfile";
import ProfileHeader from "@/components/module/profile/ProfileHeader";
import useAuth from "@/hooks/useAuth";
import UserServices from "@/services/user";
import { RootState } from "@/store/store";
import { UserWall } from "@/type/wall";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const PageTabDetail = () => {
    const user = useSelector((state: RootState) => state.auth.userToken.user);
    const idUser = useParams();
    const location = useLocation();
    const [userDetail, setUserDetail] = useState<UserWall>();
    const { axiosJWT } = useAuth();
    const fetchData = useCallback(async () => {
        try {
            const { body } = await UserServices.getWallDetail(
                idUser.id ? idUser.id : user._id,
                axiosJWT
            );
            if (body?.success) {
                setUserDetail(body?.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setUserDetail, user._id, idUser.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, location.pathname]);

    return (
        <>
            {userDetail && (
                <>
                    <ProfileHeader isView={true} />
                    <FormSettingProfile />
                </>
            )}
        </>
    );
};

export default PageTabDetail;
