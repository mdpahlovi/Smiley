"use client";

import action from "./action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { message, Button, Form, Input } from "antd";

function SubmitButton({ loading, children }: { loading: boolean } & React.PropsWithChildren) {
    return (
        <Button htmlType="submit" type="primary" className="mt-2 space-x-2" loading={loading} block>
            {loading ? "Loading..." : children}
        </Button>
    );
}

export default function LoginForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isPending, startTransition] = useTransition();

    const onFinish = (data: { email: string; password: string }) => {
        startTransition(async () => {
            action(data).then(({ success, message: m, redirect }) => {
                if (success) {
                    message.success(m);
                    form.resetFields();
                    redirect && router.push(redirect);
                } else {
                    message.error(m);
                    form.resetFields();
                }
            });
        });
    };

    return (
        <Form {...{ form, onFinish }} layout="vertical" autoComplete="off" requiredMark="optional">
            <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <SubmitButton {...{ loading: isPending }}>
                    Login <span>&rarr;</span>
                </SubmitButton>
            </Form.Item>
        </Form>
    );
}
