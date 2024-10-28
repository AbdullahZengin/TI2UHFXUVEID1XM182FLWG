import {
    useMutation,
    UseMutationOptions,
    useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
    GetAllUserResponse,
    TCreateUser,
    TUpdateUser,
    User,
} from "../models/user.model";
import { TSuccessResponse } from "../models/success-response.model";

const baseURL = `http://localhost:3000/users`;

//#region getAllUsers

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

//#endregion

//#region getUserById
const getUserById = (id: number) =>
    axios.get<User>(`${baseURL}/${id}`).then((res) => res.data);

export const useGetUserById = (id: number) =>
    useQuery({
        queryKey: ["users", id],
        queryFn: () => getUserById(id),
    });
//#endregion

//#region createUser
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

//#endregion

//#region updateUser
const updateUser = (user: TUpdateUser) =>
    axios
        .post<TSuccessResponse>(`${baseURL}/update`, user)
        .then((res) => res.data);

export const useUpdateUserMutation = (
    options?: UseMutationOptions<TSuccessResponse, AxiosError, TUpdateUser>
) =>
    useMutation({
        mutationFn: (user: TUpdateUser) => updateUser(user),

        ...options,
    });
