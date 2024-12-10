import { useQuery } from "@tanstack/react-query";
import { USER_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";

export const useListUserNotFriend = (props: { userID: string }) => {
  const { userID } = props;
  return useQuery({
    queryKey: ["list", "user", "not-friend"],
    queryFn: async () => {
      const data = await instanceCoreApi.get(USER_API.GET_NOT_FRIEND, {
        params: {
          userID,
        },
      });
      return data.data.data;
    },
  });
};
