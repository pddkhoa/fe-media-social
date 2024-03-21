import { useModal } from "@/hooks/useModal";
import { FC, useState } from "react";
import { PiXBold } from "react-icons/pi";
import { Title, ActionIcon, Input, Button, Textarea, Loader } from "rizzui";
import { PrivacyGroups } from "./FormPrivacy";
import CategoriesServices from "@/services/categories";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { CategoryDetail } from "@/type/category";

type ModalEditCategoryProps = {
    data: CategoryDetail;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalEditCategory: FC<ModalEditCategoryProps> = ({ data, setActive }) => {
    const { closeModal } = useModal();
    const [selectPrivacy, setSelectPrivacy] = useState<string>(data?.status);
    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            description: data?.description || "",
            status: selectPrivacy,
            categoryId: data?._id,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            const report = {
                ...values,
                status: selectPrivacy,
            };
            setLoading(true);
            try {
                const { body } = await CategoriesServices.editCategories(
                    report
                );
                if (body?.success) {
                    toast.success(body?.message);
                    setLoading(false);
                    setActive(true);
                    closeModal();
                } else {
                    toast.error(body?.message || "Error");
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
            <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                    Edit Category
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                    <PiXBold className="h-auto w-5" />
                </ActionIcon>
            </div>
            <Input
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                label="Category Name"
                error={formik.errors.name}
                placeholder="Category name"
            />
            <Textarea
                name="description"
                label="Descripton"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                placeholder="Description"
            />
            <label>Privacy</label>
            <PrivacyGroups
                setSelectPrivacy={setSelectPrivacy}
                selectPrivacy={selectPrivacy}
            />

            <div className="flex items-center justify-between gap-4">
                <Button
                    variant="outline"
                    onClick={closeModal}
                    className="@xl:w-auto"
                >
                    Cancel
                </Button>
                {isLoading ? (
                    <Button
                        type="submit"
                        className="flex gap-5"
                        disabled
                        variant="solid"
                    >
                        Update Group <Loader />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        variant="solid"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        Update Group
                    </Button>
                )}
            </div>
        </form>
    );
};

export default ModalEditCategory;
