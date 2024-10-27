import { useMutation } from "@tanstack/react-query";
import { AUTH_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";

type GENDER = "male" | "female" | "other";

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  username: string;
  avatar?: string;
  dob: Date;
  gender: GENDER;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (props: RegisterRequest) => {
      await instanceCoreApi.post(AUTH_API.REGISTER, props);
    },
  });
};
