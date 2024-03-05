import { cn } from "@/utils/class-name";
import { FieldError } from "rizzui";
import { UploadIcon } from "./Icon";

interface UploadZoneProps {
  name: string;
  getValues?: any;
  setValue?: any;
  className?: string;
  error?: string;
}

export default function AvatarUpload({
  name,
  error,
  className,
  getValues,
  setValue,
}: UploadZoneProps) {
  return (
    <div className={cn("grid gap-5", className)}>
      <div
        className={cn(
          "relative grid h-40 w-40 place-content-center rounded-full border"
        )}
      >
        <div
          // {...getRootProps()}
          className={cn(
            "absolute inset-0 z-10 grid cursor-pointer place-content-center"
          )}
        >
          {/* <input {...getInputProps()} /> */}
          <UploadIcon className="mx-auto h-12 w-12" />

          <span className="font-medium ">Drop or select file</span>
        </div>
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}
