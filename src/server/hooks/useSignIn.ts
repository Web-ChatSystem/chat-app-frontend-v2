import { useMutation } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { AUTH_API } from "@/server/apis";

type SignInRequest = {
  email: string;
  password: string;
};
export const useSignIn = () => {
  return useMutation({
    mutationFn: async (props: SignInRequest) => {
      return await instanceCoreApi.post(AUTH_API.LOGIN, props);
    },
  });
};
