import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { RELATIONSHIP_API } from "@/server/apis";
import { useMutation } from "@tanstack/react-query";

type MakeFriendRequestRequest = {
  userId: string;
  friendId: string;
  status: "accepted" | "rejected";
};

export const useUpdateRelationshipStatus = () => {
  return useMutation({
    mutationFn: async (data: MakeFriendRequestRequest) => {
      await instanceCoreApi.patch(RELATIONSHIP_API.UPDATE_RELATIONSHIP, data);
    },
  });
};
