import { useQuery } from "@tanstack/react-query";
import { AUTH_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["get-me"],
    queryFn: async () => {
      const res = await instanceCoreApi.get(AUTH_API.ME);
      return res.data.data;
    },
  });
};
