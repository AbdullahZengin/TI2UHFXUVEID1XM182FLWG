import { Button, Layout, Pagination, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useGetAllUsers } from "../../services/users";
import { SearchBar } from "../SearchBar";

const columns: ColumnsType = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "12.5%",
    },
    {
        title: "Surname",
        dataIndex: "surname",
        key: "surname",
        width: "12.5%",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: "15%",
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: "5%",
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: "10%",
    },
    {
        title: "District",
        dataIndex: "district",
        key: "district",
        width: "10%",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: "10%",
    },
    {
        title: "Action",
        key: "action",
        render: () => <a>Edit</a>,
        width: "5%",
    },
];

export const UserTable = () => {
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string | undefined>(undefined);

    const { data, isFetching } = useGetAllUsers(pageSize, page, searchText);

    useEffect(() => {
        if (data?.data) {
            setPage(data.page);
            setPageSize(data.pageSize);
        }
    }, [data]);

    return (
        <Layout>
            <Header
                style={{
                    backgroundColor: "#1890ff",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                User Management
            </Header>

            <Content
                style={{
                    margin: "50px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                    }}
                >
                    <SearchBar
                        onSearch={(text) => {
                            if (text !== undefined && searchText !== text) {
                                setSearchText(text);
                            }
                        }}
                    />

                    <Button type="primary">Add User</Button>
                </div>
                <Table
                    dataSource={data?.data || []}
                    columns={columns}
                    rowKey={({ id }) => id}
                    pagination={false}
                    loading={isFetching}
                    scroll={{ y: 450, x: 1260 }}
                />

                <Pagination
                    align="end"
                    defaultCurrent={page}
                    total={data?.total || 0}
                    pageSize={pageSize}
                    showSizeChanger={true}
                    onChange={(page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    }}
                />
            </Content>
        </Layout>
    );
};
