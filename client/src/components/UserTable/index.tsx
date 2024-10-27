import { Layout, Pagination, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import mockUserData from "./mock-data";
import { useState } from "react";

const columns: ColumnsType = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Surname",
        dataIndex: "surname",
        key: "surname",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Action",
        key: "action",
        render: () => <a>Edit</a>,
    },
];

export const UserTable = () => {
    const dataSource = mockUserData;

    const [total] = useState(dataSource.total);
    const [pageSize, setPageSize] = useState(dataSource.pageSize);
    const [page, setPage] = useState(dataSource.page);

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
                }}
            >
                <Table
                    dataSource={dataSource.data.slice(0, pageSize)}
                    columns={columns}
                    rowKey={({ id }) => id}
                    pagination={false}
                />

                <Pagination
                    align="end"
                    style={{ marginTop: "10px" }}
                    defaultCurrent={page}
                    total={total}
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
