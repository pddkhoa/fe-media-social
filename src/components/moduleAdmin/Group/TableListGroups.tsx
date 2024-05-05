import ControlledTable from "@/components/table/ControlledTable";
import { useColumn } from "@/hooks/useColumn";
import useTable from "@/hooks/useTable";
import React, { useMemo, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Input, Title } from "rizzui";
import AdminServices from "@/services/admin";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { getColumnsGroup } from "./ColumnGroup";
import { CategoryDetail } from "@/type/category";

export default function TableListGroups({
    className,
    data = [],
    setIsDelete,
    setIsActive,
}: {
    className?: string;
    data: CategoryDetail[];
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [pageSize, setPageSize] = useState<number>(5);
    const { axiosJWT } = useAuth();

    const {
        dataTable,
        setSearchTerm,
        searchTerm,
        currentPage,
        changePage,
        totalPages,
    } = useTable(data, "", pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDelete = async (idBlog: string) => {
        const { body } = await AdminServices.deleteCategories(idBlog, axiosJWT);
        if (body?.success) {
            toast.success(body?.message);
            setIsDelete(true);
        } else {
            toast.error(body?.message || "Error");
        }
    };

    const columns = useMemo(
        () => getColumnsGroup({ handleDelete, setIsActive }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [handleDelete, setIsActive]
    );

    const { visibleColumns } = useColumn(columns);

    return (
        <div>
            <div className="flex justify-between items-center gap-5">
                <Title as="h2" className="text-[20px] font-semibold">
                    All Group
                </Title>
                <Input
                    type="search"
                    placeholder={"Search in here..."}
                    value={searchTerm}
                    onClear={() => setSearchTerm("")}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    clearable
                    size="md"
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
        </div>
    );
}
