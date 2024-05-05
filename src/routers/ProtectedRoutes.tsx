import { Routes, Route } from "react-router-dom";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";

const ProtectedRoutes = () => {
    const isAdmin = true;
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
