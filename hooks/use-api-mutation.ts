import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState<boolean>(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setPending(false));
  };

  return { mutate, pending };
};
