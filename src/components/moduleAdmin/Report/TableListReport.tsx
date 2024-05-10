import ControlledTable from "@/components/table/ControlledTable";
import { useColumn } from "@/hooks/useColumn";
import useTable from "@/hooks/useTable";
import { useMemo, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Input } from "rizzui";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { getColumnsReport } from "./ColumnReport";

export default function TableListReport({
    className,
    data = [],
    setAction,
}: {
    className?: string;
    data: any[];
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [pageSize, setPageSize] = useState<number>(5);

    const {
        dataTable,
        setSearchTerm,
        searchTerm,
        currentPage,
        changePage,
        totalPages,
    } = useTable(data, "", pageSize);
    const { axiosJWT } = useAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDelete = async (id: string) => {
        const { body } = await AdminServices.deleteReport(
            { reportId: id },
            axiosJWT
        );
        if (body?.success) {
            setAction(true);
            toast.success(body?.message);
        } else {
            toast.error(body?.message || "Error");
        }
    };

    const columns = useMemo(
        () => getColumnsReport({ handleDelete, setAction }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [handleDelete, setAction]
    );

    const { visibleColumns } = useColumn(columns);

    return (
        <>
            <div className="flex justify-start items-center">
                <Input
                    type="search"
                    placeholder={"Search in here..."}
                    value={searchTerm}
                    onClear={() => setSearchTerm("")}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    clearable
                    className="w-1/4 py-4"
                    prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                />
            </div>
            <div className={className}>
                <ControlledTable
                    // isLoading={isLoading}
                    showLoadingText={true}
                    data={dataTable}
                    columns={visibleColumns}
                    scroll={{ x: 800 }}
                    variant="modern"
                    tableLayout="fixed"
                    rowKey={(record) => record.id}
                    paginatorOptions={{
                        pageSize,
                        setPageSize,
                        total: totalPages,
                        current: currentPage,
                        onChange: (page: number) => changePage(page),
                    }}
                />
            </div>
        </>
    );
}
