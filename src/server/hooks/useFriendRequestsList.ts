import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { useQuery } from "@tanstack/react-query";
import { RELATIONSHIP_API } from "@/server/apis";

export const useFriendRequestsList = () => {
  return useQuery({
    queryKey: ["get-friend-requests-list"],
    queryFn: async () => {
      await instanceCoreApi.get(RELATIONSHIP_API.LIST_FRIEND_REQUEST);
    },
  });
};
