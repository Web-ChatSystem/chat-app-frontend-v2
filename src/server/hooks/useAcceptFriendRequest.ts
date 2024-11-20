import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { REQUEST_API } from "@/server/apis";

export const useAcceptFriendRequest = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instanceCoreApi.put(
        REQUEST_API.ACCEPT_REQUEST.replace(":id", id),
      );
      return res.data.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries(["conversation", "list"]);
    },
  });
};
