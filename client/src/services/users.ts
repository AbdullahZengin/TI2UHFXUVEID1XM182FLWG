import {
    useMutation,
    UseMutationOptions,
    useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { GetAllUserResponse, TCreateUser } from "../models/user.model";
import { TSuccessResponse } from "../models/success-response.model";

const baseURL = `http://localhost:3000/users`;

const getAllUsers = (pageSize = 10, page = 1, searchText: string | undefined) =>
    axios
        .get<GetAllUserResponse>(baseURL, {
            params: { pageSize, page, search: searchText },
        })
        .then((res) => res.data);

export const useGetAllUsers = (
    pageSize = 10,
    page = 1,
    searchText: string | undefined
) =>
    useQuery({
        queryKey: ["users", pageSize, page, searchText],
        queryFn: () => getAllUsers(pageSize, page, searchText),
    });

const createUser = (user: TCreateUser) =>
    axios
        .post<TSuccessResponse>(`${baseURL}/save`, user)
        .then((res) => res.data);

export const useCreateUserMutation = (
    options?: UseMutationOptions<TSuccessResponse, AxiosError, TCreateUser>
) =>
    useMutation({
        mutationFn: (user: TCreateUser) => createUser(user),

        ...options,
    });
