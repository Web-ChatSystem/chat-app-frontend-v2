import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { RELATIONSHIP_API } from "@/server/apis";

type Filter = {
  page?: number;
  pagesize?: number;
  sort?: string;
  sortBy?: string;
};

export const useListFriends = (props: { userID: string; filter?: Filter }) => {
  const { userID, filter } = props;
  console.log("userID in useListFriend", userID, filter);
  return useQuery({
    queryKey: ["list", "friends"],
    queryFn: async () => {
      const res = await instanceCoreApi.post(
        RELATIONSHIP_API.LIST_FRIEND,
        filter,
        {
          params: {
            userID,
          },
        },
      );
      return res.data.data;
    },
    enabled: !!userID,
  });
};
