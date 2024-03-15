import PageHeader from "@/components/breadcrumb/PageHeader";
import FeedDetail from "@/components/module/newsfeed/FeedDetail";
import FeedDetailRight from "@/components/module/newsfeed/FeedDetailRight";

const pageHeader = {
  title: "Groups",
  breadcrumb: [
    {
      href: "/",
      name: "News Feed",
    },
  ],
};

const PageNewsFeed = () => {
  return (
    <>
      <PageHeader breadcrumb={pageHeader.breadcrumb} title={pageHeader.title} />
      <div className="grid grid-cols-12 gap-5 p-4">
        <div className="col-span-8 p-4 flex flex-col">
          <FeedDetail />
        </div>
        <div className="col-span-4 ">
          <FeedDetailRight />
        </div>
      </div>
    </>
  );
};

export default PageNewsFeed;
