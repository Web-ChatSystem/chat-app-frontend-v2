import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { MESSAGE_API } from "@/server/apis";

export const useListMessage = (props: { conversationID: string }) => {
  const { conversationID } = props;

  return useQuery({
    queryKey: ["list-message"],
    queryFn: async () => {
      const res = await instanceCoreApi.get(MESSAGE_API.LIST_MESSAGE, {
        params: {
          conversationID,
        },
      });
      return res.data.data;
    },
    refetchInterval: 1000,
  });
};
