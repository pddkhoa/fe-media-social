import PageHeader from "@/components/breadcrumb/PageHeader";
import ModalAddNewTags from "@/components/module/tags/ModalAddNewTags";
import TableListTagAdmin from "@/components/moduleAdmin/Tag/TableListTag";
import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import AdminServices from "@/services/admin";
import { Tag } from "@/type/tag";
import { useState, useCallback, useEffect } from "react";
import { Button, Empty, Loader } from "rizzui";

const pageHeader = {
    title: "Tags",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/tag",
            name: "Tag Management",
        },
    ],
};
const PageAdminTags = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataTag, setDataTag] = useState<Tag[]>([]);
    const [isAdd, setIsAdd] = useState(false);
    const { openModal } = useModal();
    const [isDelete, setIsDelete] = useState(false);
    const { axiosJWT } = useAuth();

    const fetchTag = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getTags(axiosJWT);
            if (body?.success) {
                setDataTag(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataTag]);

    useEffect(() => {
        setIsAdd(false);
        setIsDelete(false);
        fetchTag();
    }, [fetchTag, isAdd, isDelete]);

    return (
        <>
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
            >
                <Button
                    onClick={() => {
                        openModal({
                            view: <ModalAddNewTags setIsAdd={setIsAdd} />,
                        });
                    }}
                    variant="solid"
                    size="sm"
                >
                    Add New Tag
                </Button>
            </PageHeader>
            {isLoading ? (
                <Loader />
            ) : dataTag && dataTag.length > 0 ? (
                <TableListTagAdmin
                    data={dataTag}
                    setIsDelete={setIsDelete}
                    className="overflow-hidden overflow-x-hidden"
                />
            ) : (
                <Empty />
            )}
        </>
    );
};

export default PageAdminTags;
