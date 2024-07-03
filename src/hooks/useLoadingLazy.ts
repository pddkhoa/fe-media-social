import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useLoadingLazy = <T>(pageNum = 1, fetchDataFunction: any) => {
    const [result, setResult] = useState<T[] | any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const { axiosJWT } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        const fetchData = async () => {
            setTimeout(async () => {
                const { body } = await fetchDataFunction(pageNum, axiosJWT);

                if (body?.success) {
                    if (body.result) {
                        if (pageNum === 1) {
                            setResult(body.result);
                        } else {
                            setResult((prev: T[]) => [...prev, ...body.result]);
                        }
                        setIsLoading(false);
                        setHasNextPage(Boolean(body?.result.length));
                    } else {
                        setIsLoading(false);
                        setHasNextPage(false);
                    }
                } else {
                    console.log(body?.message);
                    setIsLoading(false);
                }
            }, 1000);
        };
        fetchData();
    }, [pageNum]);

    return { isLoading, result, isError, hasNextPage };
};

export default useLoadingLazy;
