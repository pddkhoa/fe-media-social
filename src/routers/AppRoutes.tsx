import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AppRoutes = () => {
    const isLogin = useSelector((state: RootState) => state.auth.isLoggin);
    return (
        <Routes>
            {isLogin ? (
                <Route path="*" element={<ProtectedRoutes />} />
            ) : (
                <Route path="*" element={<PublicRoutes />} />
            )}
        </Routes>
    );
};

export default AppRoutes;
