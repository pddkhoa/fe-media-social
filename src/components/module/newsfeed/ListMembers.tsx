import { followersData } from "@/data/ProfileData";
import { useState } from "react";
import { Avatar, Button } from "rizzui";

type MemberRowProps = {
  row: {
    id: number;
    name: string;
    avatar: string;
    buttonText: string[];
  };
};

const ListMembers = () => {
  return (
    <>
      <div className="-mr-3 h-[450px] pr-3 overflow-y-auto">
        {followersData?.map((item) => (
          <MembersRow row={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

function MembersRow({ row }: MemberRowProps) {
  const [state, setState] = useState(false);
  return (
    <div className="flex items-center justify-between pb-3 pt-2 lg:pb-5 lg:first:pt-4">
      <div className="flex items-center gap-2">
        <Avatar size="lg" name={row.name} src={row.avatar} />
        <p className="font-lexend font-medium capitalize text-gray-900">
          {row.name}
        </p>
      </div>
      <Button
        size="sm"
        rounded="pill"
        variant={state ? "solid" : "flat"}
        onClick={() => setState(() => !state)}
        className="font-medium capitalize md:h-9 md:px-4"
      >
        {state ? row.buttonText[0] : row.buttonText[1]}
      </Button>
    </div>
  );
}

export default ListMembers;

export const ListMembersPopular = () => {
  return (
    <>
      <div className="-mr-3 h-fit pr-3 overflow-y-auto">
        {followersData?.slice(0, 3).map((item) => (
          <MembersRow row={item} key={item.id} />
        ))}
      </div>
    </>
  );
};
