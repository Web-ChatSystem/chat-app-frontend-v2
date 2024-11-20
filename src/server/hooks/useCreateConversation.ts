import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { CONVERSATION_API } from "@/server/apis";

type ConversationType = "individual" | "group";

type CreateConversationRequest = {
  name?: string;
  type: ConversationType;
  creatorID?: string;
  participantIDs: string[];
};
export const useCreateConversation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["create-conversation"],
    mutationFn: async (data: CreateConversationRequest) => {
      const res = await instanceCoreApi.post(CONVERSATION_API.CREATE, data);
      return res.data.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries(["conversation", "list"]);
    },
  });
};
