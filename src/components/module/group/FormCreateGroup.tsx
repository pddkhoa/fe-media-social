import { cn } from "@/utils/class-name";
import { useEffect, useState } from "react";
import { PiPlusBold, PiUserCirclePlus, PiXBold } from "react-icons/pi";
import { Badge, Button, Input, Loader, Textarea } from "rizzui";
import { useModal } from "@/hooks/useModal";
import { ModalAddTags } from "../../modal/AddTagsModal";
import { Tag } from "@/type/tag";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PrivacyGroups } from "./FormPrivacy";
import useAuth from "@/hooks/useAuth";
import CategoriesServices from "@/services/categories";
import TagServices from "@/services/tag";

const FormCreateGroup = () => {
    const { openModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [dataTag, setDataTag] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectPrivacy, setSelectPrivacy] = useState<string>("Publish");
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);
    const { axiosJWT } = useAuth();

    useEffect(() => {
        const fetchTag = async () => {
            try {
                setIsLoading(true);
                const { body } = await TagServices.getAllTags(axiosJWT);
                if (body?.success) {
                    setDataTag(body?.result);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchTag();
    }, []);

    const handleAddTag = (tag: Tag) => {
        // Kiểm tra xem tag đã tồn tại trong selectedTags chưa
        if (!selectedTags.find((t) => t._id === tag._id)) {
            setSelectedTags((prevTags) => {
                const updatedTags = [...prevTags, tag];
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
            return updatedTags;
        });
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            tagIds: [],
            status: "",
            userIds: [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            const report = {
                ...values,
                status: selectPrivacy,
                tagIds: selectedTags?.map((item) => item._id),
            };
            setIsLoadingAdd(true);
            try {
                const { body } = await CategoriesServices.addCategories(
                    report,
                    axiosJWT
                );
                if (body?.success) {
                    toast.success(body?.message);
                    setIsLoadingAdd(false);
                } else {
                    toast.error(body?.message || "Error");
                    setIsLoadingAdd(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoadingAdd(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={cn("grid gap-5 grid-cols-12 pt-5")}>
                <div className="col-span-12">
                    <h4 className="text-base font-medium">Create new group</h4>
                    <p className="mt-2 text-gray-600 text-sm m-2 font-light w-full">
                        Create a group where you can learn and interact
                        privately with other developers around topics that
                        matter to you
                    </p>
                </div>
            </div>
            <div className="mx-auto mb-10 grid w-full max-w-screen-3xl gap-7 divide-y divide-dashed divide-gray-200  p-6 ">
                <div className={cn("grid gap-5 grid-cols-12 pt-4 ")}>
                    <div className="col-span-4">
                        <h4 className="text-base font-medium">Group's Name</h4>
                    </div>

                    <div className="grid grid-cols-1 col-span-8 gap-5 ">
                        <Input
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.errors.name}
                            placeholder="Name"
                            className="flex-grow w-full"
                        />
                    </div>
                </div>

                <div className={cn("grid gap-5 grid-cols-12 pt-4 ")}>
                    <div className="col-span-4 ">
                        <h4 className="text-base font-medium">Descriptions</h4>
                    </div>

                    <div className="grid grid-cols-1 col-span-8 gap-5 py-5">
                        <Textarea
                            id="Descriptions"
                            name="description"
                            placeholder="Descriptions"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="w-full h-36"
                            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-5.5"
                        />
                    </div>
                </div>
                <div className={cn("grid gap-5 grid-cols-12 pt-4 ")}>
                    <div className="col-span-4 ">
                        <h4 className="text-base font-medium">Privacy Group</h4>
                    </div>
                    <div className="col-span-8">
                        <PrivacyGroups
                            setSelectPrivacy={setSelectPrivacy}
                            selectPrivacy={selectPrivacy}
                        />
                    </div>
                </div>

                <div className={cn("grid gap-5 grid-cols-12 pt-4 ")}>
                    <div className="col-span-4 ">
                        <h4 className="text-base font-medium">Tags</h4>
                    </div>

                    <div className="grid grid-cols-1 col-span-8 gap-5 py-5">
                        {dataTag && (
                            <Button
                                isLoading={isLoading}
                                className="w-fit flex gap-3 justify-start"
                                variant="text"
                                onClick={() => {
                                    openModal({
                                        view: (
                                            <ModalAddTags
                                                data={dataTag}
                                                onAddTag={handleAddTag}
                                            />
                                        ),
                                    });
                                }}
                            >
                                Add Tags <PiPlusBold />
                            </Button>
                        )}
                        <div className="p-4">
                            <div className="flex flex-wrap gap-5">
                                {selectedTags.length > 0 ? (
                                    selectedTags.map((tag) => (
                                        <Badge
                                            key={tag._id}
                                            rounded="md"
                                            className="flex gap-3"
                                        >
                                            <span>#{tag.name}</span>
                                            <span
                                                className="hover:bg-slate-500 p-0.5 rounded-md cursor-pointer"
                                                onClick={() =>
                                                    handleRemoveTag(tag)
                                                }
                                            >
                                                <PiXBold />
                                            </span>
                                        </Badge>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-sm">
                                        Not been selected tag
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cn("grid gap-5 grid-cols-12 pt-4 ")}>
                    <div className="col-span-4 ">
                        <h4 className="text-base font-medium"> Members</h4>
                    </div>

                    <div className="grid grid-cols-1 col-span-8 gap-5 py-5">
                        <Button
                            className="w-fit flex gap-3 justify-start"
                            variant="text"
                            onClick={() => {
                                openModal({ view: <ModalAddTags /> });
                            }}
                        >
                            Invite Members{" "}
                            <PiUserCirclePlus className="h-5 w-5" />
                        </Button>
                        <div className="text-gray-500 text-sm p-4">
                            Not required
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex w-auto items-center justify-end gap-3">
                <Button type="button" variant="outline">
                    Cancel
                </Button>
                {isLoadingAdd ? (
                    <Button
                        type="submit"
                        className="flex gap-5"
                        disabled
                        variant="solid"
                    >
                        Create Group <Loader />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        variant="solid"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        Create Group
                    </Button>
                )}
            </div>
        </form>
    );
};

export default FormCreateGroup;
