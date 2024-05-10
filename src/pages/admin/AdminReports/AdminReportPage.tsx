import PageHeader from "@/components/breadcrumb/PageHeader";
import ModalAddNewReport from "@/components/moduleAdmin/Report/ModalAddNewReport";
import TableListReport from "@/components/moduleAdmin/Report/TableListReport";
import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import AdminServices from "@/services/admin";
import { ReportType } from "@/type/report";
import { useState, useCallback, useEffect } from "react";
import { Loader, Empty, Button } from "rizzui";

const pageHeader = {
    title: "Report",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/report",
            name: "Report Management",
        },
    ],
};

const AdminReportPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataReport, setDataReport] = useState<ReportType[]>([]);
    const { axiosJWT } = useAuth();
    const { openModal } = useModal();
    const [action, setAction] = useState(false);

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getListReport(axiosJWT);
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
            >
                <Button
                    onClick={() => {
                        openModal({
                            view: <ModalAddNewReport setAction={setAction} />,
                        });
                    }}
                    variant="solid"
                    size="sm"
                >
                    Add New Report
                </Button>
            </PageHeader>

            {isLoading ? (
                <Loader />
            ) : dataReport && dataReport.length > 0 ? (
                <TableListReport data={dataReport} setAction={setAction} />
            ) : (
                <Empty />
            )}
        </>
    );
};

export default AdminReportPage;
