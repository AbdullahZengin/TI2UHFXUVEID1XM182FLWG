import { Button, Layout, Pagination, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useGetAllUsers } from "../../services/users";
import { SearchBar } from "../SearchBar";
import { CreateUserDialog } from "./CreateUserDialog";
import { UpdateUserDialog } from "./UpdateUserDialog";
import { User } from "../../models/user.model";

export const UserTable = () => {
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string | undefined>(undefined);

    const [isCreateDialogOpen, setCreateIsDialogOpen] =
        useState<boolean>(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] =
        useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
        undefined
    );

    const { data, isFetching } = useGetAllUsers(pageSize, page, searchText);

    const handleEdit = (userId: number) => {
        setSelectedUserId(userId);
        setIsUpdateDialogOpen(true);
    };

    const columns: ColumnsType<User> = [
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
            width: "12.5%",
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
            render: (_, record) => (
                <a onClick={() => handleEdit(record.id)}>Edit</a>
            ),
            width: "7.5%",
        },
    ];

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
                    color: "#fff",
                }}
            >
                <h2>User Management</h2>
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

                    <Button
                        type="primary"
                        onClick={() => setCreateIsDialogOpen(true)}
                    >
                        Add User
                    </Button>
                    <CreateUserDialog
                        isOpen={isCreateDialogOpen}
                        onClose={() => setCreateIsDialogOpen(false)}
                    />
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

                {selectedUserId && (
                    <UpdateUserDialog
                        isOpen={isUpdateDialogOpen}
                        onClose={() => setIsUpdateDialogOpen(false)}
                        userId={selectedUserId!}
                    />
                )}
            </Content>
        </Layout>
    );
};
