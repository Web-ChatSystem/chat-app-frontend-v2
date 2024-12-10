import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { USER_API } from "@/server/apis";

type Filter = {
  page?: number;
  pagesize?: number;
  sort?: string;
  sortBy?: string;
  email?: string;
};
export const useListUsers = (filter?: Filter) => {
  return useQuery({
    queryKey: ["list-users"],
    queryFn: async () => {
      await instanceCoreApi.post(USER_API.LIST, filter);
    },
  });
};
