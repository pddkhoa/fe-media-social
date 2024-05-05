import PageHeader from "@/components/breadcrumb/PageHeader";
import RolesGrid from "@/components/moduleAdmin/Account/GridRole";
import TableListAccount from "@/components/moduleAdmin/Account/TableListAccount";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { User } from "@/type/user";
import { useState, useCallback, useEffect } from "react";
import { Loader, Empty } from "rizzui";

const pageHeader = {
    title: "Roles and Permissions ",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/account",
            name: "Role Management & Permission",
        },
    ],
};

const PageAdminAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataUser, setdataUser] = useState<User[]>([]);
    const [isAdd, setIsAdd] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const { axiosJWT } = useAuth();
    const [isChangeRole, setIsChangeRole] = useState(false);

    const fetchUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getUser(axiosJWT);
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
        setIsChangeRole(false);
        setIsAdd(false);
        setIsDelete(false);
        fetchUser();
    }, [fetchUser, isAdd, isDelete, isChangeRole]);

    const filteredClient =
        dataUser && dataUser.filter((user) => user.roles === "Client");

    const filteredAdmin =
        dataUser && dataUser.filter((user) => user.roles === "Admin");
    const filteredEditor =
        dataUser && dataUser.filter((user) => user.roles === "Editor");

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
                    <RolesGrid
                        user={filteredClient}
                        admin={filteredAdmin}
                        support={filteredEditor}
                    />
                    <TableListAccount
                        data={dataUser}
                        setIsDelete={setIsDelete}
                        setIsChangeRole={setIsChangeRole}
                        className="overflow-hidden overflow-x-hidden"
                    />
                </>
            ) : (
                <Empty />
            )}
        </>
    );
};

export default PageAdminAccount;
