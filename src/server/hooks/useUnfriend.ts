import { useMutation } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { RELATIONSHIP_API } from "@/server/apis";

type UnfriendRequest = {
  userId: string;
  friendId: string;
};

export const useUnfriend = () => {
  return useMutation({
    mutationFn: async (data: UnfriendRequest) => {
      await instanceCoreApi.delete(RELATIONSHIP_API.UNFRIEND, { data });
    },
  });
};
