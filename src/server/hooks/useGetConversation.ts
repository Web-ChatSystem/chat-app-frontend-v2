import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { CONVERSATION_API } from "@/server/apis";

export const useGetConversation = (props: { id: string }) => {
  const { id } = props;
  return useQuery({
    queryKey: ["conversation", id, "get"],
    queryFn: async () => {
      const res = await instanceCoreApi.get(CONVERSATION_API.GET_CONVERSATION, {
        params: {
          id,
        },
      });
      return res.data.data;
    },
  });
};
