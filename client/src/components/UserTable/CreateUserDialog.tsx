import { Form, Input, InputNumber, Modal, Select } from "antd";
import { TCreateUser } from "../../models/user.model";
import { useCreateUserMutation } from "../../services/users";
import { queryClient } from "../../lib/query-client";

type CreateUserDialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const CreateUserDialog = ({
    isOpen,
    onClose,
}: CreateUserDialogProps) => {
    const [form] = Form.useForm();

    const { mutateAsync: createUserMutation, isPending } =
        useCreateUserMutation({
            onSuccess: () => {
                onClose();
                queryClient.invalidateQueries({ queryKey: ["users"] });
            },
        });

    return (
        <Modal
            title="Create User"
            open={isOpen}
            onCancel={() => onClose()}
            onOk={() => {
                form.submit();
            }}
            destroyOnClose={true}
            afterClose={() => form.resetFields()}
            confirmLoading={isPending}
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={async (values: TCreateUser) => {
                    await createUserMutation(values);
                }}
            >
                <Form.Item<TCreateUser>
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Name is required" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<TCreateUser>
                    label="Surname"
                    name="surname"
                    rules={[{ required: true, message: "Surname is required" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<TCreateUser>
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
                    <Input />
                </Form.Item>

                <Form.Item<TCreateUser>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message:
                                "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol",
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<TCreateUser> label="Phone" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item<TCreateUser> label="Age" name="age">
                    <InputNumber />
                </Form.Item>

                <Form.Item<TCreateUser> label="Country" name="country">
                    <Input />
                </Form.Item>

                <Form.Item<TCreateUser> label="District" name="district">
                    <Input />
                </Form.Item>

                <Form.Item<TCreateUser>
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: "Role is required" }]}
                >
                    <Select onChange={(value) => console.log(value)}>
                        <Select.Option value="ADMIN">Admin</Select.Option>
                        <Select.Option value="USER">User</Select.Option>
                        <Select.Option value="MODERATOR">
                            Moderator
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
