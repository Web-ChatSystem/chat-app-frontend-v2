import { useMutation } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { USER_API } from "@/server/apis";

type GENDER = "male" | "female" | "other";

type UpdateUserRequest = {
  name?: string;
  avatar?: string;
  dob?: Date;
  gender?: GENDER;
};
export const useUpdateUser = (id: string) => {
  return useMutation({
    mutationKey: ["update-user", id],
    mutationFn: async (data: UpdateUserRequest) => {
      await instanceCoreApi.patch(USER_API.UPDATE.replace(":id", id), data);
    },
  });
};
