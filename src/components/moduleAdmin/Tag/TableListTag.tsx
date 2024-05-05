import ControlledTable from "@/components/table/ControlledTable";
import { useColumn } from "@/hooks/useColumn";
import useTable from "@/hooks/useTable";
import { useMemo, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Input } from "rizzui";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { getColumnsTagAdmin } from "./ColumnTags";
import AdminServices from "@/services/admin";

export default function TableListTagAdmin({
    className,
    data = [],
    setIsDelete,
}: {
    className?: string;
    data: any[];
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
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
    const handleDelete = async (tagId: string) => {
        const { body } = await AdminServices.deteleTag(tagId, axiosJWT);
        if (body?.success) {
            toast.success(body?.message);
            setIsDelete(true);
        } else {
            toast.error(body?.message || "Error");
        }
    };

    const columns = useMemo(
        () => getColumnsTagAdmin({ handleDelete }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [handleDelete]
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
