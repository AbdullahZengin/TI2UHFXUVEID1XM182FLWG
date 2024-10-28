import { Input } from "antd";
import { useEffect, useState } from "react";

type SearchBarProps = {
    onSearch: (search: string | undefined) => void;
    delayMs?: number;
};

export const SearchBar = ({ onSearch, delayMs = 700 }: SearchBarProps) => {
    const [search, setSearch] = useState<string | undefined>(undefined);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(search);
        }, delayMs);

        return () => {
            clearTimeout(timeout);
        };
    }, [search, onSearch, delayMs]);

    return (
        <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
};
