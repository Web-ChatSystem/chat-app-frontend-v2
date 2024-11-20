import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NICKNAME_API } from "../apis";

export type SetNicknameRequest = {
  userID: string;
  conversationID: string;
  nickname: string;
};

export const useSetNickname = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (request: SetNicknameRequest) => {
      const response = await instanceCoreApi.post(
        NICKNAME_API.SET_NICKNAME,
        request,
      );
      return response.data.data;
    },
    onSuccess: () => {
      client.invalidateQueries(["conversation"]);
    },
  });
};
