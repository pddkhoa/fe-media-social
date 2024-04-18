import { useModal } from "@/hooks/useModal";
import { FC, useEffect, useState } from "react";
import { PiPlusBold, PiXBold } from "react-icons/pi";
import { Badge, Button, Select, Textarea } from "rizzui";
import UploadModal from "../../modal/UploadModal";
import { FormDataType } from "@/pages/client/post/PageCreatePost";
import { ModalAddTags } from "@/components/modal/AddTagsModal";
import { Tag } from "@/type/tag";
import toast from "react-hot-toast";
import BlogServices from "@/services/blog";
import { CategoryPost } from "@/type/post";
import { pendingUpload, uploadSuccess } from "@/store/imageSlice";
import { useDispatch } from "react-redux";
import { TYPE_UPLOAD } from "@/utils/contants";
import useAuth from "@/hooks/useAuth";

type optionsCate = {
    label: string;
    value: string;
};

type EditDetailProps = {
    setFormDataCreate: React.Dispatch<
        React.SetStateAction<FormDataType | undefined>
    >;
    formDataCreate: FormDataType | undefined;
    formik: any;
};

const EditDetail: FC<EditDetailProps> = ({
    setFormDataCreate,
    formDataCreate,
    formik,
}) => {
    const { openModal, closeModal } = useModal();
    const [stateDes, setStateDes] = useState("" || formDataCreate?.description);
    const [cateData, setCateData] = useState<optionsCate[]>([]);
    const [value, setValue] = useState(null || formDataCreate?.categoryIds);
    const [isLoadig, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(
        formDataCreate?.tagIds ? formDataCreate.tagIds : []
    );
    const dispatch = useDispatch();
    const { axiosJWT } = useAuth();

    useEffect(() => {
        formik.setFieldValue("description", stateDes);
        formik.setFieldValue("categoryIds", value);
        // formik.setFieldValue("tagIds", selectedTags);
    }, [stateDes, value]);

    useEffect(() => {
        const fetchCate = async () => {
            try {
                setIsLoading(true);
                const { body } = await BlogServices.getCateByUserNotPagi(
                    axiosJWT
                );
                if (body?.success) {
                    const mappedCategories = body?.result?.map(
                        (category: CategoryPost) => ({
                            label: category?.name,
                            value: category?._id,
                            tags: category?.tags,
                        })
                    );
                    setCateData(
                        mappedCategories && mappedCategories.length > 0
                            ? mappedCategories
                            : []
                    );
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchCate();
    }, []);

    const handleChangeDes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        formik.handleChange(e);
        setStateDes(newValue);
        setFormDataCreate((prevFormData: any) => ({
            ...prevFormData,
            description: newValue,
        }));
    };
    const handleChangeSelect = (selectedValue: any) => {
        setValue(selectedValue);
        formik.setFieldValue("categoryIds", selectedValue.value);
        setSelectedTags([]);
        setFormDataCreate((prevFormData: any) => ({
            ...prevFormData,
            categoryIds: selectedValue,
        }));
    };

    const updateTagIds = (tagIds: Tag[]) => {
        setFormDataCreate((prevFormData): any => ({
            ...prevFormData,
            tagIds: tagIds,
        }));
    };

    const handleAddTag = (tag: Tag) => {
        // Kiểm tra xem tag đã tồn tại trong selectedTags chưa
        if (!selectedTags.find((t) => t._id === tag._id)) {
            setSelectedTags((prevTags) => {
                const updatedTags = [...prevTags, tag];
                updateTagIds(updatedTags.map((t) => t));
                return updatedTags;
            });
        } else {
            // Xử lý trường hợp tag đã tồn tại
            toast.error("Tag already exists in selectedTags");
            // Hiển thị thông báo hoặc xử lý tùy ý
        }
    };

    const handleRemoveTag = (tag: Tag) => {
        setSelectedTags((prevTags) => {
            const updatedTags = prevTags.filter((t) => t._id !== tag._id);
            updateTagIds(updatedTags.map((t) => t));
            return updatedTags;
        });
    };

    const handleUploadAvatarPost = async (files: FileList) => {
        if (files) {
            dispatch(pendingUpload());
            const formData = new FormData();
            formData.append("image", files[0]);
            const { body } = await BlogServices.uploadAvatarPost(
                formData,
                axiosJWT
            );
            if (body?.success) {
                toast.success(body.message);
                closeModal();
                dispatch(uploadSuccess());
                setFormDataCreate((prevFormData: any) => ({
                    ...prevFormData,
                    avatar: body?.result,
                }));
            } else {
                toast.error(body?.message || "Error");
                dispatch(uploadSuccess());
            }
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <Textarea
                id="description"
                name="description"
                label="Descripstion"
                value={stateDes}
                onBlur={formik.handleBlur}
                onChange={handleChangeDes as any}
                placeholder="Descriptions"
            />
            <Select
                options={cateData as any}
                label="Categories"
                value={value}
                onChange={(selectedValue: any) =>
                    handleChangeSelect(selectedValue)
                }
                disabled={isLoadig}
            />
            {value?.tags && (
                <>
                    <Button
                        className="w-fit flex gap-3"
                        variant="text"
                        onClick={() => {
                            openModal({
                                view: (
                                    <ModalAddTags
                                        data={value.tags}
                                        onAddTag={handleAddTag}
                                    />
                                ),
                            });
                        }}
                    >
                        Add Tags <PiPlusBold />
                    </Button>
                    <div className="border p-4 rounded-md">
                        <div className="flex flex-wrap gap-5">
                            {selectedTags.map((tag) => (
                                <Badge
                                    key={tag._id}
                                    rounded="md"
                                    className="flex gap-3"
                                >
                                    <span>#{tag.name}</span>
                                    <span
                                        className="hover:bg-slate-500 p-0.5 rounded-md cursor-pointer"
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        <PiXBold />
                                    </span>
                                </Badge>
                            ))}
                        </div>
                    </div>
                </>
            )}
            <div>
                <Button
                    className="w-fit flex gap-3"
                    variant="text"
                    onClick={() => {
                        openModal({
                            view: (
                                <UploadModal
                                    isPost={true}
                                    handleUploadImage={handleUploadAvatarPost}
                                    type={TYPE_UPLOAD.POST}
                                />
                            ),
                        });
                    }}
                >
                    {formDataCreate?.avatar ? "Change Avatar" : "Add Avatar"}{" "}
                    <PiPlusBold />
                </Button>
                {formDataCreate?.avatar && (
                    <div className="flex justify-center p-4 border  rounded-md">
                        <img
                            src={`${formDataCreate.avatar}`}
                            className="h-60 w-72 object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditDetail;
