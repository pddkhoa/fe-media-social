import PageHeader from "@/components/breadcrumb/PageHeader";
import TableListAccountBlocked from "@/components/moduleAdmin/Account-Blocked/TableListAccountBlocked";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { User } from "@/type/user";
import { useCallback, useEffect, useState } from "react";
import { Loader, Empty } from "rizzui";

const pageHeader = {
    title: "Account Blocked",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/account-block",
            name: "Account Blocked Management",
        },
    ],
};

const PageAdminAccountBlock = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataUser, setdataUser] = useState<User[]>([]);
    const [isDelete, setIsDelete] = useState(false);
    const { axiosJWT } = useAuth();

    const fetchUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getUserBlocked(axiosJWT);
            if (body?.success) {
                setdataUser(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setdataUser]);

    useEffect(() => {
        setIsDelete(false);
        fetchUser();
    }, [fetchUser, isDelete]);

    return (
        <>
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
            >
                {/* <ModalButton label="Add New Role" view={<CreateRole />} /> */}
            </PageHeader>

            {isLoading ? (
                <Loader />
            ) : dataUser && dataUser.length > 0 ? (
                <>
                    <TableListAccountBlocked
                        data={dataUser}
                        setIsDelete={setIsDelete}
                        className="overflow-hidden overflow-x-hidden"
                    />
                </>
            ) : (
                <Empty />
            )}
        </>
    );
};

export default PageAdminAccountBlock;
