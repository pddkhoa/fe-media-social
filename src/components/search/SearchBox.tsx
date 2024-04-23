import { Fragment, useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {
    Input,
    Button,
    Tab,
    Loader,
    Empty,
    SearchNotFoundIcon,
    Avatar,
    Badge,
} from "rizzui";
import UserServices from "@/services/user";
import useAuth from "@/hooks/useAuth";
import { User } from "@/type/user";
import { Post } from "@/type/post";
import { Category } from "@/type/category";
import { TYPE_SEARCH } from "@/utils/contants";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SearchBox() {
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const { axiosJWT } = useAuth();
    const [resultUser, setResultUser] = useState<User[]>([]);
    const [resultBlog, setResultBlog] = useState<Post[]>([]);
    const [resultCate, setResultCate] = useState<Category[]>([]);
    const [type, setType] = useState<string>("User");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchType = async (type: string) => {
        setIsLoading(true);
        const { body } = await UserServices.searchBox(
            {
                key: searchText,
                type: type,
            },
            axiosJWT
        );
        if (body?.success) {
            if (type === TYPE_SEARCH.BLOG) {
                setResultBlog(body?.result);
                setIsLoading(false);
            } else if (type === TYPE_SEARCH.User) {
                setResultUser(body?.result);
                setIsLoading(false);
            } else if (type === TYPE_SEARCH.CATEGORY) {
                setResultCate(body?.result);
                setIsLoading(false);
            }
        } else {
            toast.error(body?.message || "Error");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (inputRef?.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            inputRef.current.focus();
        }
        return () => {
            inputRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearchType(type);
        }
    };

    return (
        <>
            <>
                <div className="flex items-center  px-5 py-4">
                    <Input
                        variant="flat"
                        value={searchText}
                        ref={inputRef}
                        onChange={(e) => setSearchText(() => e.target.value)}
                        placeholder="Search here"
                        className="flex-1"
                        onKeyPress={handleKeyPress}
                        prefix={
                            <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
                        }
                        suffix={
                            searchText && (
                                <Button
                                    size="sm"
                                    variant="text"
                                    className="h-auto w-auto px-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSearchText(() => "");
                                    }}
                                >
                                    Clear
                                </Button>
                            )
                        }
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        className="ms-3 text-gray-500 hover:text-gray-700"
                        onClick={() => handleSearchType(type)}
                    >
                        <PiMagnifyingGlassBold className="h-5 w-5" />
                    </Button>
                </div>
            </>
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4">
                <>
                    <Tab>
                        <Tab.List>
                            <Tab.ListItem
                                className={"text-sm "}
                                onClick={() => {
                                    setType("User");
                                }}
                            >
                                User
                                {resultUser && resultUser.length > 0 && (
                                    <Badge
                                        size="sm"
                                        enableOutlineRing
                                        className="absolute right-0 top-0 -translate-y-1/6 translate-x-1/3"
                                    >
                                        {resultUser.length}
                                    </Badge>
                                )}
                            </Tab.ListItem>
                            <Tab.ListItem
                                className={"text-sm"}
                                onClick={() => {
                                    setType("Blog");
                                }}
                            >
                                Blog
                                {resultBlog && resultBlog.length > 0 && (
                                    <Badge
                                        size="sm"
                                        enableOutlineRing
                                        className="absolute right-0 top-0 -translate-y-1/6 translate-x-1/3"
                                    >
                                        {resultBlog.length}
                                    </Badge>
                                )}
                            </Tab.ListItem>
                            <Tab.ListItem
                                className={"text-sm"}
                                onClick={() => {
                                    setType("Category");
                                }}
                            >
                                Group
                                {resultCate && resultCate.length > 0 && (
                                    <Badge
                                        size="sm"
                                        enableOutlineRing
                                        className="absolute right-0 top-0 -translate-y-1/6 translate-x-1/3"
                                    >
                                        {resultCate.length}
                                    </Badge>
                                )}
                            </Tab.ListItem>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <Loader />
                                    </div>
                                ) : resultUser && resultUser.length > 0 ? (
                                    resultUser.map((item) => {
                                        return (
                                            <Fragment key={item._id}>
                                                <Link
                                                    to={`profile/${item._id}`}
                                                    className="relative my-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 "
                                                >
                                                    {item.avatar ? (
                                                        <Avatar
                                                            src={
                                                                item.avatar.url
                                                            }
                                                            name={item.name}
                                                            size="md"
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            name="default"
                                                            size="md"
                                                        />
                                                    )}

                                                    <span className="font-medium capitalize text-gray-900 dark:text-gray-700">
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </Fragment>
                                        );
                                    })
                                ) : (
                                    <Empty
                                        image={<SearchNotFoundIcon />}
                                        text="No Result Found"
                                    />
                                )}
                            </Tab.Panel>
                            <Tab.Panel>
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <Loader />
                                    </div>
                                ) : resultBlog && resultBlog.length > 0 ? (
                                    resultBlog.map((item) => {
                                        return (
                                            <Fragment key={item._id}>
                                                <Link
                                                    to={`/post`}
                                                    state={item}
                                                    className="relative my-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 "
                                                >
                                                    {item.avatar ? (
                                                        <Avatar
                                                            src={item.avatar}
                                                            name={item.title}
                                                            size="md"
                                                            className="rounded-md"
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            name="default"
                                                            size="md"
                                                        />
                                                    )}

                                                    <span className="font-medium capitalize text-gray-900 dark:text-gray-700 line-clamp-2">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </Fragment>
                                        );
                                    })
                                ) : (
                                    <Empty
                                        image={<SearchNotFoundIcon />}
                                        text="No Result Found"
                                    />
                                )}
                            </Tab.Panel>
                            <Tab.Panel>
                                {" "}
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <Loader />
                                    </div>
                                ) : resultCate && resultCate.length > 0 ? (
                                    resultCate.map((item) => {
                                        return (
                                            <Fragment key={item._id}>
                                                <Link
                                                    to={`/group/detail/${item._id}`}
                                                    state={item}
                                                    className="relative my-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 "
                                                >
                                                    {item.avatar ? (
                                                        <Avatar
                                                            src={
                                                                item.avatar.url
                                                            }
                                                            name={item.name}
                                                            size="md"
                                                            className="rounded-md"
                                                        />
                                                    ) : (
                                                        <div className="bg-gradient-to-r h-12 w-12 rounded-lg from-[#F8E1AF] to-[#F6CFCF] bg-opacity-30 group-hover:brightness-95" />
                                                    )}

                                                    <span className="font-medium capitalize text-gray-900 dark:text-gray-700 line-clamp-2">
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </Fragment>
                                        );
                                    })
                                ) : (
                                    <Empty
                                        image={<SearchNotFoundIcon />}
                                        text="No Result Found"
                                    />
                                )}
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab>
                </>
            </div>
        </>
    );
}
