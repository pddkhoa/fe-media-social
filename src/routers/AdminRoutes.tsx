import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const HomeAdmin = lazy(() => import("@/pages/admin/home-admin/PageHomeAdmin"));

const AdminRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<div>Loading ...</div>}>
                                <HomeAdmin />
                            </Suspense>
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={<Navigate to={"/"} replace={true} />}
                />
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;
