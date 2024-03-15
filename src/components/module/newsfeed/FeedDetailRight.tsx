import { Title } from "rizzui";
import ListMembers from "./ListMembers";
import GroupCard from "../group/GroupCard";

const FeedDetailRight = () => {
  return (
    <div className="flex flex-col gap-5 p-4 -mt-10 mx-auto divide-y-2 divide-dashed">
      <div className="flex flex-col gap-2">
        <Title as="h6" className="font-medium">
          Contact Members
        </Title>
        <ListMembers />
      </div>
      <div className="flex flex-col gap-2  pt-4">
        <Title as="h6" className="font-medium">
          Popular Group
        </Title>
        <div className="flex flex-col gap-5">
          <GroupCard />
          <GroupCard />
        </div>
      </div>
    </div>
  );
};

export default FeedDetailRight;
