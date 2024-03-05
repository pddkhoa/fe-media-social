import { cn } from "@/utils/class-name";
import { useState } from "react";
import { PiEnvelopeSimple, PiPhoneCall } from "react-icons/pi";
import { Button, Input, Select } from "rizzui";
import AvatarUpload from "../ui/UploadAvatar";
import QuillEditor from "../ui/QuillEditor";
import ProfileHeader from "../profile/ProfileHeader";

const TabDetail = () => {
  const [value, setValue] = useState(null);
  const options = [
    { label: "Male", value: 1 },
    { label: "Female", value: 0 },
  ];
  return (
    <>
      <ProfileHeader />

      <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
        <div className="col-span-4">
          <h4 className="text-base font-medium">Personal Info</h4>
          <p className="mt-2">Update your photo and personal details here</p>
        </div>
      </div>
      <div className="mx-auto mb-10 grid w-full max-w-screen-3xl gap-7 divide-y divide-dashed divide-gray-200  p-6 space-y-10">
        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4">
            <h4 className="text-base font-medium">Name</h4>
          </div>

          <div className="grid grid-cols-2 col-span-8 gap-5 ">
            <Input placeholder="Full Name" className="flex-grow" />
            <Input placeholder="Second Name" className="flex-grow" />
          </div>
        </div>
        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4">
            <h4 className="text-base font-medium">Username</h4>
          </div>

          <div className="grid grid-cols-2 col-span-8 gap-5 ">
            <Input
              className="col-span-full"
              prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
              type="email"
              placeholder="georgia.young@example.com"
            />
          </div>
        </div>
        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4">
            <h4 className="text-base font-medium">Email Address</h4>
          </div>

          <div className="grid grid-cols-2 col-span-8 gap-5 ">
            <Input
              className="col-span-full"
              prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
              type="email"
              placeholder="georgia.young@example.com"
            />
          </div>
        </div>
        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4">
            <h4 className="text-base font-medium">Phone Number</h4>
          </div>

          <div className="grid grid-cols-2 col-span-8 gap-5 ">
            <Input
              className="col-span-full"
              prefix={<PiPhoneCall className="h-6 w-6 text-gray-500" />}
              type="number"
              placeholder="georgia.young@example.com"
            />
          </div>
        </div>

        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4">
            <h4 className="text-base font-medium">Address</h4>
          </div>

          <div className="grid grid-cols-2 col-span-8 gap-5 ">
            <div className="flex flex-col gap-6 @container @3xl:col-span-2">
              <Select options={options} value={value} onChange={setValue} />
            </div>
            <div className="flex flex-col gap-6 @container @3xl:col-span-2">
              <Select options={options} value={value} onChange={setValue} />
            </div>
          </div>
        </div>

        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4">
            <h4 className="text-base font-medium">Gender</h4>
          </div>

          <div className="grid grid-cols-2 col-span-8 gap-5 ">
            <div className="flex flex-col gap-6 @container @3xl:col-span-2">
              <Select options={options} value={value} onChange={setValue} />
            </div>
          </div>
        </div>
        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4 ">
            <h4 className="text-base font-medium">Bio</h4>
          </div>

          <div className="grid grid-cols-1 col-span-8 gap-5 py-5">
            <QuillEditor
              className="w-full h-36"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-5.5"
            />
          </div>
        </div>
        <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
          <div className="col-span-4">
            <h4 className="text-base font-medium">Your Photo</h4>
            <p className="mt-2">This will be displayed on your profile.</p>
          </div>

          <div className="grid grid-cols-2 col-span-8 gap-5 ">
            <div className="flex flex-col gap-6 @container @3xl:col-span-2">
              <AvatarUpload name="avatar" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4  md:px-5 lg:px-6 3xl:px-8 4xl:px-10"
        )}
      >
        <Button variant="outline" className="w-fit @xl:w-auto">
          Cancel
        </Button>
        <Button
          type="submit"
          // isLoading={isLoading}
          variant="solid"
          className="w-fit"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default TabDetail;
