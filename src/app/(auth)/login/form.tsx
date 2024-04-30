"use client";

import action from "./action";
import { useRouter } from "next/navigation";
import { message, Button, Form, Input } from "antd";
import { useEffect, useState, useTransition } from "react";

import type { FormInstance } from "antd";

type SubmitButtonProps = { form: FormInstance; loading: boolean } & React.PropsWithChildren;

function SubmitButton({ form, loading, children }: SubmitButtonProps) {
    const [submittable, setSubmittable] = useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button htmlType="submit" type="primary" className="mt-2 space-x-2" loading={loading} disabled={!submittable} block>
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
                <SubmitButton {...{ form, loading: isPending }}>
                    Login <span>&rarr;</span>
                </SubmitButton>
            </Form.Item>
        </Form>
    );
}
