import { Form, Input, InputNumber, Modal, Select } from "antd";
import { TUpdateUser } from "../../models/user.model";
import { useGetUserById, useUpdateUserMutation } from "../../services/users";
import { useEffect } from "react";
import { queryClient } from "../../lib/query-client";
import { toast } from "react-toastify";

type UpdateUserDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
};

export const UpdateUserDialog = ({
    isOpen,
    onClose,
    userId,
}: UpdateUserDialogProps) => {
    const [form] = Form.useForm<TUpdateUser>();

    const { data: user, isFetching } = useGetUserById(userId);

    useEffect(() => {
        if (isOpen && user) {
            form.setFieldsValue(user);
        }
    }, [form, isOpen, user]);

    const { mutateAsync: updateUserMutation, isPending } =
        useUpdateUserMutation({
            onSuccess: () => {
                toast.success("User updated successfully");
                onClose();
                queryClient.invalidateQueries({ queryKey: ["users"] });
            },
        });

    return (
        <Modal
            title="Update User"
            open={isOpen}
            onCancel={() => onClose()}
            onOk={() => {
                form.submit();
            }}
            okText="Update"
            destroyOnClose={true}
            afterClose={() => form.resetFields()}
            confirmLoading={isPending}
            loading={isFetching}
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={async (values: TUpdateUser) => {
                    await updateUserMutation({
                        ...values,
                        id: userId,
                        password:
                            values.password === undefined ||
                            values.password === ""
                                ? undefined
                                : values.password,
                    });
                }}
            >
                <Form.Item<TUpdateUser>
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Name is required" }]}
                >
                    <Input placeholder="Please enter your name" />
                </Form.Item>

                <Form.Item<TUpdateUser>
                    label="Surname"
                    name="surname"
                    rules={[{ required: true, message: "Surname is required" }]}
                >
                    <Input placeholder="Please enter your surname" />
                </Form.Item>

                <Form.Item<TUpdateUser>
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Email is required",
                        },
                    ]}
                >
                    <Input placeholder="Please enter your email address" />
                </Form.Item>

                <Form.Item<TUpdateUser>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            message:
                                "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol",
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        },
                    ]}
                >
                    <Input.Password placeholder="Please enter your strong password" />
                </Form.Item>

                <Form.Item<TUpdateUser> label="Phone" name="phone">
                    <Input placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item<TUpdateUser>
                    label="Age"
                    name="age"
                    rules={[
                        {
                            min: 1,
                            message: "Age must be greater than 0",
                            type: "number",
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Enter your age"
                        style={{ width: "40%" }}
                    />
                </Form.Item>

                <Form.Item<TUpdateUser> label="Country" name="country">
                    <Input placeholder="Enter your country" />
                </Form.Item>

                <Form.Item<TUpdateUser> label="District" name="district">
                    <Input placeholder="Enter your district" />
                </Form.Item>

                <Form.Item<TUpdateUser>
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: "Role is required" }]}
                >
                    <Select placeholder="Select a role">
                        <Select.Option value="ADMIN">Admin</Select.Option>
                        <Select.Option value="USER">User</Select.Option>
                        <Select.Option value="MODERATOR">
                            Moderator
                        </Select.Option>
                    </Select>
                </Form.Item>

                {/* Hidden submit button when press enter */}
                <button type="submit" hidden></button>
            </Form>
        </Modal>
    );
};
