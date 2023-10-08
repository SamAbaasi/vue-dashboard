import { ref, Ref } from "vue";

interface UseApiProps<ResponseType> {
  apiMethod: (params?: Record<string, any>) => Promise<ResponseType>;
  successCallback?: (data: ResponseType) => void;
  failedCallback?: (error: any) => void;
}

interface UseApiReturnType<ResponseType> {
  pending: Ref<boolean>;
  request: (params?: Record<string, any>) => Promise<ResponseType>;
}

function useAPI<ResponseType>({
  apiMethod,
  successCallback,
  failedCallback,
}: UseApiProps<ResponseType>): UseApiReturnType<ResponseType> {
  const pending: Ref<boolean> = ref(false);

  const request = async (
    params?: Record<string, any>
  ): Promise<ResponseType> => {
    pending.value = true;

    try {
      const response = await apiMethod(params);
      if (successCallback) {
        successCallback(response);
      }
      return response;
    } catch (error) {
      if (failedCallback) {
        failedCallback(error);
      }
      throw error;
    } finally {
      pending.value = false;
    }
  };

  return {
    pending,
    request,
  };
}

export default useAPI;
