import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { REQUEST_API } from "@/server/apis";

type MakeFriendRequestRequest = {
  senderID: string;
  receiverID: string;
};

export const useMakeFriendRequest = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["make-friend-request"],
    mutationFn: async (data: MakeFriendRequestRequest) => {
      await instanceCoreApi.post(REQUEST_API.CREATE, data);
    },
    onSuccess: async () => {
      await client.invalidateQueries(["get-all-not-friend-users"]);
    },
  });
};
