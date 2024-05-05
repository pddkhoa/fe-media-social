import ControlledTable from "@/components/table/ControlledTable";
import { useColumn } from "@/hooks/useColumn";
import useTable from "@/hooks/useTable";
import React, { useMemo, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Button, Input } from "rizzui";
import { getColumnsAccount } from "./ColumnAccount";
import { User } from "@/type/user";
import { useModal } from "@/hooks/useModal";
import ModalCreateAccount from "./ModalCreateAccount";

export default function TableListAccount({
    className,
    data = [],
    setIsChangeRole,
}: {
    className?: string;
    data: User[];
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setIsChangeRole: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [pageSize, setPageSize] = useState<number>(5);
    const { openModal } = useModal();

    const {
        dataTable,
        setSearchTerm,
        searchTerm,
        currentPage,
        changePage,
        totalPages,
    } = useTable(data, "", pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const columns = useMemo(
        () => getColumnsAccount({ setIsChangeRole }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setIsChangeRole]
    );

    const { visibleColumns } = useColumn(columns);

    return (
        <div>
            <div className="flex justify-between items-center gap-5">
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
                <Button
                    onClick={() => {
                        openModal({ view: <ModalCreateAccount /> });
                    }}
                    variant="solid"
                    size="sm"
                >
                    Add New User
                </Button>
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
