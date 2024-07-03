export const SkeletonPost = () => {
    return (
        <div className="flex flex-col m-2 rounded shadow-md  animate-pulse max-w-full bg-gray-200">
            <div className="flex p-4 space-x-4 bg-gray-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-400"></div>
                <div className="flex-1 py-2 space-y-4">
                    <div className="w-full h-2 rounded bg-gray-400"></div>
                    <div className="w-5/6 h-2 rounded bg-gray-400"></div>
                </div>
            </div>
            <div className="m-4 h-96  bg-gray-400"></div>
            <div className="flex-1 px-4 py-2 space-y-4 sm:p-8 bg-gray-200">
                <div className="w-full h-4 rounded bg-gray-400"></div>
            </div>
        </div>
    );
};

export const SkeletonCate = () => {
    return (
        <div className="flex flex-col m-2 rounded shadow-md max-w-lg animate-pulse h-[26rem] bg-gray-200">
            <div className="flex p-4 space-x-4 bg-gray-200"></div>
            <div className="m-4 h-72  bg-gray-400"></div>
            <div className="flex-1 px-4 py-2 space-y-4 sm:p-8 bg-gray-200">
                <div className="w-full h-4 rounded bg-gray-400"></div>
            </div>
        </div>
    );
};

export const SkeletonCateList = () => {
    return (
        <div className="flex flex-col m-2 rounded shadow-md max-w-full animate-pulse h-[14rem] bg-gray-200">
            <div className="m-4 h-72 bg-gray-400"></div>
            <div className="flex-1 sm:p-4 bg-gray-200">
                <div className="w-full h-4 rounded bg-gray-400"></div>
            </div>
        </div>
    );
};
