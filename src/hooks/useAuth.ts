import { useSelector } from "react-redux";
import { createAxios } from "@/api/createInstance";
import { RootState } from "@/store/store";

export default function useAuth() {
    const user = useSelector((state: RootState) => state.auth.userToken);

    const axiosJWT = createAxios(user);

    return {
        user,
        axiosJWT,
    };
}
