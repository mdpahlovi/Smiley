"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types";
import { Card, Form, Progress } from "antd";
import { useDeleteProject } from "./delete-project";
import { Ribbon, Text, Title } from "@/components/export";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EditProject, { type EditProjectData } from "./edit-project";
import { CalendarOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

dayjs.extend(localizedFormat);

export default function ProjectCard({ id, status, name, start_date, end_date, description }: Project) {
    const { confirmDelete } = useDeleteProject();
    const [form] = Form.useForm<EditProjectData>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Ribbon text={status}>
                <Card
                    actions={[
                        <EditOutlined
                            key="edit"
                            onClick={() => {
                                setIsModalOpen(true);
                                form.setFieldsValue({ name, status, description });
                            }}
                        />,
                        <Link key="view" href={`/dashboard/projects/${id}`}>
                            View Details
                        </Link>,
                        <DeleteOutlined key="delete" onClick={() => confirmDelete(id)} />,
                    ]}
                >
                    <Title level={4}>{name}</Title>
                    <Text strong>
                        <CalendarOutlined /> Stated On: {dayjs(start_date).format("LL")}
                    </Text>
                    <div className="my-2 flex justify-center">
                        <Progress type="circle" percent={75} />
                    </div>
                    <Text strong>
                        <CalendarOutlined /> End On: {end_date ? dayjs(end_date).format("LL") : "Date Not Specified"}
                    </Text>
                </Card>
            </Ribbon>
            <EditProject {...{ id, form, isModalOpen, setIsModalOpen }} />
        </>
    );
}
