import FormEditAccount from "@/components/form/FormEditAccount";
import ProfileHeader from "@/components/module/profile/ProfileHeader";
import useAuth from "@/hooks/useAuth";
import UserServices from "@/services/user";
import { UserWall } from "@/type/wall";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const EditAccount = () => {
    const idUser = useParams();
    const location = useLocation();
    const [userDetail, setUserDetail] = useState<UserWall>();
    const { axiosJWT } = useAuth();
    const [isUpdate, setIsUpdate] = useState(false);
    const fetchData = useCallback(async () => {
        try {
            if (idUser.id) {
                const { body } = await UserServices.getWallDetail(
                    idUser?.id,
                    axiosJWT
                );
                if (body?.success) {
                    setUserDetail(body?.result);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setUserDetail, idUser.id]);

    useEffect(() => {
        setIsUpdate(false);
        fetchData();
    }, [fetchData, location.pathname, isUpdate]);
    return (
        <>
            {userDetail && (
                <>
                    <ProfileHeader isView={false} userDetail={userDetail} />
                    <FormEditAccount
                        setIsUpdate={setIsUpdate}
                        user={userDetail}
                    />
                </>
            )}
        </>
    );
};

export default EditAccount;
