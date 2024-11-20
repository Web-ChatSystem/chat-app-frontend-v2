import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { USER_API } from "@/server/apis";

export const useGetUserDetail = (id: string) => {
  return useQuery({
    queryKey: ["get-user-detail", id],
    queryFn: async () => {
      await instanceCoreApi.get(USER_API.GET_USER.replace(":id", id));
    },
  });
};
