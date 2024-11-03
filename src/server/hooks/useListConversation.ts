import { useQuery } from "@tanstack/react-query";
import { CONVERSATION_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";

export const useListConversation = (props: { userID: string }) => {
  const { userID } = props;

  return useQuery({
    queryKey: ["conversation", "list"],
    queryFn: async () => {
      const data = await instanceCoreApi.get(
        CONVERSATION_API.LIST_CONVERSATION,
        {
          params: {
            userID,
          },
        },
      );
      return data.data.data;
    },
  });
};
