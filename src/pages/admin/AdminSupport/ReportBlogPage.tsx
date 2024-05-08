import PageHeader from "@/components/breadcrumb/PageHeader";
import ReportInbox from "@/components/moduleAdmin/Report/ReportInbox";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { ReportBlogType } from "@/type/report";
import { TYPE_REPORT } from "@/utils/contants";
import { useCallback, useEffect, useState } from "react";
import { Loader, Empty } from "rizzui";

const pageHeader = {
    title: "Blogs",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/report/blog",
            name: "Blog Issues",
        },
    ],
};

const ReportBlogPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataReport, setDataReport] = useState<ReportBlogType[]>([]);
    const { axiosJWT } = useAuth();
    const [action, setAction] = useState(false);

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getListReportBlog(axiosJWT);
            if (body?.success) {
                setDataReport(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataReport]);

    useEffect(() => {
        setAction(false);
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
            ) : dataReport && dataReport.length > 0 ? (
                <ReportInbox
                    data={dataReport}
                    type={TYPE_REPORT.BLOG}
                    setAction={setAction}
                />
            ) : (
                <Empty />
            )}
        </>
    );
};

export default ReportBlogPage;
