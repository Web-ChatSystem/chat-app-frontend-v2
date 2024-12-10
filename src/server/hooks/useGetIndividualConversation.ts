import { useQuery } from "@tanstack/react-query";
import { CONVERSATION_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";

export const useGetIndividualConversation = (props: {
  userID: string;
  friendID: string;
}) => {
  const { userID, friendID } = props;

  return useQuery({
    queryKey: ["get-individual-conversation"],
    queryFn: async () => {
      const data = await instanceCoreApi.get(
        CONVERSATION_API.GET_INDIVIDUAL_CONVERSATION,
        {
          params: {
            userID,
            friendID,
          },
        },
      );
      return data.data.data;
    },
  });
};
