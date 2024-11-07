import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { MESSAGE_API } from "@/server/apis";

type CreateMessageRequest = {
  conversationID: string;
  attachment?: string;
  body: string;
  ownerID: string;
};

export const useCreateMessage = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["create-message"],
    mutationFn: async (data: CreateMessageRequest) => {
      const res = await instanceCoreApi.post(MESSAGE_API.CREATE, data);
      return res.data.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries(["list-message"]);
    },
  });
};
