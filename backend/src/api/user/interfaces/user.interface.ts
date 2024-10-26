export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
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
