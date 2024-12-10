import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { REQUEST_API } from "@/server/apis";

export const useDeclineFriendRequest = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instanceCoreApi.put(
        REQUEST_API.DECLINE_REQUEST.replace(":id", id),
      );
      return res.data.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries(["get-all-not-friend-users"]);
      await client.invalidateQueries(["list-friends"]);
      await client.invalidateQueries(["list-pending-request"]);
    },
  });
};
