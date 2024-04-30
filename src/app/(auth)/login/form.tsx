"use client";

import type { FormInstance } from "antd";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

const SubmitButton: React.FC<React.PropsWithChildren<{ form: FormInstance }>> = ({ form, children }) => {
    const [submittable, setSubmittable] = useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button htmlType="submit" type="primary" className="mt-2 space-x-2" disabled={!submittable} block>
            {children}
        </Button>
    );
};

export default function LoginForm() {
    const [form] = Form.useForm();

    return (
        <Form form={form} layout="vertical" autoComplete="off" requiredMark="optional">
            <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <SubmitButton form={form}>
                    Login <span>&rarr;</span>
                </SubmitButton>
            </Form.Item>
        </Form>
    );
}
