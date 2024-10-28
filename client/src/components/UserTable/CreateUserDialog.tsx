import { Form, Input, InputNumber, Modal, Select } from "antd";
import { TCreateUser } from "../../models/user.model";
import { useCreateUserMutation } from "../../services/users";
import { queryClient } from "../../lib/query-client";
import { toast } from "react-toastify";

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
                toast.success("User created successfully");
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
            okText="Create"
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
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item<TCreateUser>
                    label="Surname"
                    name="surname"
                    rules={[{ required: true, message: "Surname is required" }]}
                >
                    <Input placeholder="Enter your surname" />
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
                    <Input placeholder="Enter your email address" />
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
                    <Input.Password placeholder="Enter your strong password" />
                </Form.Item>

                <Form.Item<TCreateUser> label="Phone" name="phone">
                    <Input placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item<TCreateUser>
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

                <Form.Item<TCreateUser> label="Country" name="country">
                    <Input placeholder="Enter your country" />
                </Form.Item>

                <Form.Item<TCreateUser> label="District" name="district">
                    <Input placeholder="Enter your district" />
                </Form.Item>

                <Form.Item<TCreateUser>
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
