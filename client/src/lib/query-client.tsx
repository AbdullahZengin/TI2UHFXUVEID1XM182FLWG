import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60 * 15,
        },
        mutations: {
            retry: false,
            onError: (error) => {
                let message = "An error occurred";

                if (error instanceof AxiosError) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    message = (error.response?.data as any).message;
                }

                alert(message);
            },
        },
    },
});
