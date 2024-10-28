import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseURL = `http://localhost:3000/users`;

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    MODERATOR = "MODERATOR",
}

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    age: number;
    country: string;
    district: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    data: User[];
    total: number;
    pageSize: number;
    page: number;
}

export const getAllUsers = (
    pageSize = 10,
    page = 1,
    searchText: string | undefined
) =>
    axios
        .get<UserResponse>(baseURL, {
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
