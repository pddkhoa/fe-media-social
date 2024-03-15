import { useModal } from "@/hooks/useModal";
import { FC, useEffect, useState } from "react";
import { PiPlusBold, PiXBold } from "react-icons/pi";
import { Badge, Button, Select, Textarea } from "rizzui";
import UploadModal from "../../modal/UploadModal";
import { FormDataType } from "@/pages/create-post/PageCreatePost";
import ClientServices from "@/services/client";
import { Category } from "@/type/category";
import { ModalAddTags } from "@/components/modal/AddTagsModal";
import { Tag } from "@/type/tag";
import toast from "react-hot-toast";

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
  const { openModal } = useModal();
  const [stateDes, setStateDes] = useState("" || formDataCreate?.description);
  const [cateData, setCateData] = useState<optionsCate[]>();
  const [value, setValue] = useState(null || formDataCreate?.categoryIds);
  const [isLoadig, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    formDataCreate?.tagIds ? formDataCreate.tagIds : []
  );

  useEffect(() => {
    formik.setFieldValue("description", stateDes);
    formik.setFieldValue("categoryIds", value);
    // formik.setFieldValue("tagIds", selectedTags);
  }, [stateDes, value]);

  useEffect(() => {
    const fetchCate = async () => {
      try {
        setIsLoading(true);
        const { body } = await ClientServices.getCategoriesByUser();
        if (body?.success) {
          const mappedCategories = body?.result?.map((category: Category) => ({
            label: category.name,
            value: category._id,
            tags: category.tags,
          }));
          setCateData(mappedCategories);
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
        onChange={(selectedValue: any) => handleChangeSelect(selectedValue)}
        disabled={isLoadig ? true : false}
      />
      {value?.tags && (
        <>
          <Button
            className="w-fit flex gap-3"
            variant="text"
            onClick={() => {
              openModal({
                view: (
                  <ModalAddTags data={value.tags} onAddTag={handleAddTag} />
                ),
              });
            }}
          >
            Add Tags <PiPlusBold />
          </Button>
          <div className="border p-4 rounded-md">
            <div className="flex flex-wrap gap-5">
              {selectedTags.map((tag) => (
                <Badge key={tag._id} rounded="md" className="flex gap-3">
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
                  setFormDataCreate={setFormDataCreate}
                />
              ),
            });
          }}
        >
          Add Avatar <PiPlusBold />
        </Button>
        {formDataCreate?.avatar && (
          <img
            src={`${formDataCreate.avatar}`}
            className="h-60 w-72 object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default EditDetail;
