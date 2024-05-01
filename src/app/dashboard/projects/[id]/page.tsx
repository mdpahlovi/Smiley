"use client";

import dayjs from "dayjs";
import users from "@/data/users";
import { useState } from "react";
import { notFound } from "next/navigation";
import { Text, Title } from "@/components/export";
import { useProjectStore } from "@/hooks/useProjectHook";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Badge, Button, Divider, Form, Modal, Progress } from "antd";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import AddMember from "@/components/dashboard/projects/add-member";
import EditProject, { EditProjectData } from "@/components/dashboard/projects/edit-project";
import { useDeleteProject } from "@/components/dashboard/projects/delete-project";
import { CalendarOutlined, DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";

dayjs.extend(localizedFormat);

export default function ProjectDetailsPage({ params }: { params: { id?: string } }) {
    const { confirmDelete } = useDeleteProject();
    const [form] = Form.useForm<EditProjectData>();
    const { projects, addMember } = useProjectStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addMemberModal, setAddMemberModal] = useState(false);

    const project = projects.find(({ id }) => id === params?.id);
    if (!params?.id || !project) notFound();

    const { id, name, status, description, start_date, end_date, leader, members, tasks } = project;

    const leaderData = users.find(({ id }) => id === leader);
    const membersData = users.filter(({ email }) => members.includes(email));

    return (
        <>
            <div>
                <Title level={3}>{name}</Title>
                <Badge count={status} />
                <div className="my-6 flex max-md:flex-col justify-between gap-6">
                    <div className="flex gap-4">
                        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setAddMemberModal(true)}>
                            Add Member
                        </Button>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => {
                                setIsModalOpen(true);
                                form.setFieldsValue({ name, status, description });
                            }}
                        >
                            Edit
                        </Button>
                        <Button icon={<DeleteOutlined />} onClick={() => confirmDelete(id, "/dashboard/projects")} danger>
                            Delete
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <AnimatedTooltip items={[leaderData!, ...membersData]} />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-[3.5fr_3.5fr_5fr] gap-4">
                    <div className="flex items-start gap-2">
                        <CalendarOutlined className="mt-1.5" />
                        <div>
                            <Title level={5}>Stated On:</Title>
                            <Text>{dayjs(start_date).format("LL")}</Text>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <CalendarOutlined className="mt-1.5" />
                        <div>
                            <Title level={5}>End On:</Title>
                            <Text>{end_date ? dayjs(end_date).format("LL") : "Date Not Specified"}</Text>
                        </div>
                    </div>
                    <div className="max-md:col-span-full">
                        <Title level={5}>Progress:</Title>
                        <Progress type="line" percent={75} />
                    </div>
                </div>
                <Divider />
                <Title className="uppercase" level={5}>
                    Project Descriptions
                </Title>
                <Text>{description}</Text>
            </div>
            <EditProject {...{ id, form, isModalOpen, setIsModalOpen }} />
            <Modal title="Add Member" open={addMemberModal} onCancel={() => setAddMemberModal(false)} footer={false}>
                <AddMember
                    value={members}
                    onChange={(value) => addMember({ id, emails: value })}
                    options={users.filter(({ id }) => id !== leader)}
                />
            </Modal>
        </>
    );
}
