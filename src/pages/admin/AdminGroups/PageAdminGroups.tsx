import PageHeader from "@/components/breadcrumb/PageHeader";
import TableListGroups from "@/components/moduleAdmin/Group/TableListGroups";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { CategoryDetail } from "@/type/category";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Empty, Loader } from "rizzui";

const pageHeader = {
    title: "Groups",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/group",
            name: "Group Management",
        },
    ],
};

const PageAdminGroups = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataCate, setDataCate] = useState<CategoryDetail[]>([]);
    // const { openModal } = useModal();
    const [isDelete, setIsDelete] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const { axiosJWT } = useAuth();
    const navigate = useNavigate();

    const fetchCate = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getCategories(axiosJWT);
            if (body?.success) {
                setDataCate(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataCate]);

    useEffect(() => {
        setIsDelete(false);
        setIsActive(false);
        fetchCate();
    }, [fetchCate, isDelete, isActive]);

    return (
        <>
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
            >
                <Button
                    onClick={() => navigate("/admin/group/create")}
                    variant="solid"
                    size="sm"
                >
                    Add New Group
                </Button>
            </PageHeader>
            {isLoading ? (
                <Loader />
            ) : dataCate && dataCate.length > 0 ? (
                <div className="p-4 border rounded">
                    <TableListGroups
                        data={dataCate}
                        setIsDelete={setIsDelete}
                        setIsActive={setIsActive}
                        className="overflow-hidden overflow-x-hidden"
                    />
                </div>
            ) : (
                <Empty />
            )}
        </>
    );
};

export default PageAdminGroups;
