import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { useQuery } from "@tanstack/react-query";
import { REQUEST_API } from "@/server/apis";

export const useListPendingRequest = (props: { userID: string }) => {
  const { userID } = props;

  return useQuery({
    queryKey: ["list", "pending-request"],
    queryFn: async () => {
      const data = await instanceCoreApi.get(
        REQUEST_API.GET_PENDING_REQUEST_LIST,
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
