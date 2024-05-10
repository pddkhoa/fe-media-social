import PageHeader from "@/components/breadcrumb/PageHeader";
import ReportInbox from "@/components/moduleAdmin/Report/ReportInbox";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { ReportUserType } from "@/type/report";
import { TYPE_REPORT } from "@/utils/contants";
import { useState, useCallback, useEffect } from "react";
import { Empty, Loader } from "rizzui";

const pageHeader = {
    title: "Blogs",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/report/user",
            name: "User Issues",
        },
    ],
};

const ReportUserPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataUser, setDataUser] = useState<ReportUserType[]>([]);
    const { axiosJWT } = useAuth();
    const [action, setAction] = useState(false);

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getListReportUser(axiosJWT);
            if (body?.success) {
                setDataUser(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataUser]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport, action]);
    return (
        <>
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
            ></PageHeader>

            {isLoading ? (
                <Loader />
            ) : dataUser && dataUser.length > 0 ? (
                <ReportInbox
                    data={dataUser}
                    type={TYPE_REPORT.USER}
                    setAction={setAction}
                />
            ) : (
                <Empty />
            )}
        </>
    );
};

export default ReportUserPage;
