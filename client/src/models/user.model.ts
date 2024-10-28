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
    phone?: string;
    age?: number;
    country?: string;
    district?: string;
    role: Role;
    createdAt: Date;
    updatedAt?: Date;
}

export interface GetAllUserResponse {
    data: User[];
    total: number;
    pageSize: number;
    page: number;
}

export type TCreateUser = {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone?: string;
    age?: number;
    country?: string;
    district?: string;
    role: string;
};

export type TUpdateUser = {
    id: number;
    name: string;
    surname: string;
    email: string;
    password?: string;
    phone?: string;
    age?: number;
    country?: string;
    district?: string;
    role: string;
};
