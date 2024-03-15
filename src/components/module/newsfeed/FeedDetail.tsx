import PostCard from "@/components/post/PostCard";

const FeedDetail = () => {
  return (
    <>
      <div className=" flex flex-col gap-12 p-4 -mt-10 mx-auto">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </>
  );
};

export default FeedDetail;
