import {
  PiCheckCircleFill,
  PiDotsThreeOutlineVertical,
  PiGlobeHemisphereEast,
  PiPlus,
  PiUserCirclePlus,
  PiUserList,
} from "react-icons/pi";
import { ActionIcon, Badge, Button, Loader, Title } from "rizzui";
import PostCard from "../../post/PostCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category } from "@/type/category";
import ClientServices from "@/services/client";

const GroupDetail = () => {
  const categoriesId = useParams();
  const [dataCate, setDataCate] = useState<Category>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCate = async () => {
      try {
        setIsLoading(true);
        const { body } = await ClientServices.getCategoriesById(
          categoriesId.id as string
        );
        if (body?.success) {
          setDataCate(body?.result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchCate();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center mt-16">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="-mt-2">
      {dataCate && (
        <>
          <div className="-mx-6 h-[200px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] bg-opacity-30" />
          <div className="mx-auto w-full max-w-full  p-2 sm:flex sm:justify-between border-b">
            <div className="flex h-auto w-full gap-4 @5xl:gap-6">
              <div className="pt-2.5 w-1/2">
                <Title
                  as="h1"
                  className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
                >
                  {dataCate?.name}
                </Title>
                <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base mt-2">
                  {dataCate.description}
                </p>
                <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                      <PiGlobeHemisphereEast className="h-6 w-6" />
                    </div>
                    {getBadgeStatus(dataCate.status)}
                    <div className="flex-grow">
                      <div className="flex gap-3">
                        <PiCheckCircleFill className="icon hidden h-6 w-6 flex-shrink-0 text-gray-900" />
                        <div className="flex gap-3 items-center">
                          <span>Tags:</span>

                          {dataCate?.tags?.map((item) => (
                            <Badge
                              key={item._id}
                              rounded="md"
                              className="shadow"
                              size="sm"
                            >
                              #{item.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </p>
              </div>
              <div className="pt-2.5 w-1/2 flex justify-end">
                <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-grow">
                      <div className="flex gap-3 justify-center items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex gap-3"
                        >
                          Invite Members{" "}
                          <PiUserCirclePlus className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex gap-3"
                        >
                          List Members <PiUserList className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex gap-3"
                        >
                          Create Post <PiPlus className="h-3 w-3" />
                        </Button>
                        <ActionIcon variant="flat" size="sm">
                          <PiDotsThreeOutlineVertical />
                        </ActionIcon>
                      </div>
                    </div>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="px-2 mt-10  w-full  @2xl:mt-7 @6xl:mt-0">
        <div className="grid grid-cols-3 gap-5">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;

const getBadgeStatus = (status: string) => {
  switch (status) {
    case "Publish":
      return (
        <Badge rounded="md" className="shadow" variant="outline" size="sm">
          {status}
        </Badge>
      );
    case "Private":
      return (
        <Badge
          rounded="md"
          className="shadow"
          color="danger"
          variant="outline"
          size="sm"
        >
          {status}
        </Badge>
      );

    default:
      break;
  }
};
