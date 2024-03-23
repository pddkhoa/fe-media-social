import { useModal } from "@/hooks/useModal";
import { RootState } from "@/store/store";
import { useState } from "react";
import { PiXBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Button, Loader } from "rizzui";

type UploadModalProps = {
    data?: string;
    isPost?: boolean;

    setUrlImage?: React.Dispatch<React.SetStateAction<string>>;
    type: string;
    handleUploadImage: (files: FileList) => Promise<void>;
};

const UploadModal: React.FC<UploadModalProps> = ({
    data,
    isPost,
    handleUploadImage,
}) => {
    const { closeModal } = useModal();
    const [files, setFiles] = useState<FileList>();
    const [dataImage, setDataImage] = useState(data);
    const isUpload = useSelector((state: RootState) => state.image.isUpload);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(event.target.files);
            setDataImage("");
        }
    };

    const handleUpload = () => {
        if (files && handleUploadImage) {
            handleUploadImage(files);
        }
    };

    return (
        <main className=" w-full h-full">
            <article
                aria-label="File Upload Modal"
                className="relative h-full w-full flex flex-col bg-white shadow-xl rounded-md"
            >
                <div
                    onClick={closeModal}
                    className="p-1 my-2 mx-4 ml-auto hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                    <PiXBold />
                </div>
                {isUpload ? (
                    <div className="absolute  inset-0 w-full h-full bg-black/15">
                        <Loader className="h-6 w-6 absolute top-1/2 left-[15rem] " />
                    </div>
                ) : null}
                <section className="h-full overflow-auto p-8 w-full flex flex-col">
                    <header className="border-dashed border-2 border-gray-400 py-12 rounded-lg flex flex-col justify-center items-center">
                        <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                            <span>Drag and drop your</span>&nbsp;
                            <span>files anywhere or</span>
                        </p>

                        <label
                            htmlFor="hidden-input"
                            id="button"
                            className="mt-2 px-3 py-1 bg-white border rounded-md hover:bg-gray-100 focus:shadow-outline focus:outline-none shadow-lg cursor-pointer"
                        >
                            Upload a file
                        </label>
                        <input
                            id="hidden-input"
                            onChange={handleFileChange}
                            type="file"
                            className="hidden"
                        />
                    </header>
                    <p className="pt-8 pb-3 font-semibold sm:text-sm text-gray-900">
                        To Upload
                    </p>
                    <div
                        id="gallery"
                        className="h-full w-full text-center flex flex-col  justify-center items-center"
                    >
                        {files || dataImage ? (
                            <img
                                className={`object-cover ${
                                    isPost
                                        ? `w-64 h-52 rounded-md`
                                        : `w-40 h-40 rounded-full`
                                } `}
                                src={
                                    files
                                        ? URL.createObjectURL(files[0])
                                        : dataImage
                                }
                                alt="no data"
                            />
                        ) : (
                            <>
                                <img
                                    className="mx-auto w-32"
                                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                    alt="no data"
                                />
                                <span className="text-small text-gray-500">
                                    No files selected
                                </span>
                            </>
                        )}
                    </div>
                </section>
                <footer className="flex justify-end gap-5 px-8 pb-8 pt-4">
                    <Button
                        onClick={closeModal}
                        size="sm"
                        variant="outline"
                        disabled={isUpload}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={() => handleUpload()}
                        size="sm"
                        isLoading={isUpload}
                        disabled={isUpload || !files}
                    >
                        Upload now
                    </Button>
                </footer>
            </article>
        </main>
    );
};

export default UploadModal;
