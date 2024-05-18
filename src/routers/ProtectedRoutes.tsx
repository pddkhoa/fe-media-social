import { Routes, Route } from "react-router-dom";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import useAuth from "@/hooks/useAuth";

const ProtectedRoutes = () => {
    const { user } = useAuth();
    const isAdmin =
        user?.user?.roles === "Admin" || user?.user?.roles === "Editor";

    return (
        <Routes>
            {!isAdmin ? (
                <Route path="*" element={<ClientRoutes />} />
            ) : (
                <Route path="*" element={<AdminRoutes />} />
            )}
        </Routes>
    );
};

export default ProtectedRoutes;
