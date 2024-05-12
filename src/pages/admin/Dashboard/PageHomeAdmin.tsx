import CardTotalItem from "@/components/moduleAdmin/Dashboard/CardTotalItem";
import ChartAccess from "@/components/moduleAdmin/Dashboard/ChartAccess";
import ChartBlog from "@/components/moduleAdmin/Dashboard/ChartBlog";
import { Title } from "rizzui";

const PageHomeAdmin = () => {
    return (
        <div className="grid grid-cols-12  gap-6 py-8">
            <CardTotalItem />
            <ChartAccess />
            <div className="col-span-full p-6 border rounded">
                <Title as="h4" className="font-medium">
                    Quantity statistics blogs
                </Title>
                <ChartBlog />
            </div>
        </div>
    );
};

export default PageHomeAdmin;
