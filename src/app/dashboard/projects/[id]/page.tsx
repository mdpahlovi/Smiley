"use client";

import dayjs from "dayjs";
import users from "@/data/users";
import { useState } from "react";
import type { Task } from "@/types";
import { notFound } from "next/navigation";
import Column from "@/components/ui/column";
import { Text, Title } from "@/components/export";
import { useTaskStore } from "@/hooks/useTaskHook";
import DeleteTask from "@/components/ui/delete-task";
import { useProjectStore } from "@/hooks/useProjectHook";
import { useProgressHook } from "@/hooks/useProgressHook";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTaskFormStore } from "@/hooks/useTaskFormHook";
import { columnsData, setProjectValues } from "@/constants";
import TaskForm from "@/components/dashboard/tasks/task-form";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import AddMember from "@/components/dashboard/projects/add-member";
import { Badge, Button, Divider, Form, Modal, Progress } from "antd";
import { useDeleteProject } from "@/components/dashboard/projects/delete-project";
import EditProject, { EditProjectData } from "@/components/dashboard/projects/edit-project";
import { CalendarOutlined, DeleteOutlined, EditOutlined, PlusOutlined, UserAddOutlined } from "@ant-design/icons";

dayjs.extend(localizedFormat);

export default function ProjectDetailsPage({ params }: { params: { id?: string } }) {
    const progress = useProgressHook(params.id!);
    const { confirmDelete } = useDeleteProject();
    const { projects, addMember } = useProjectStore();
    const [taskForm] = Form.useForm<Omit<Task, "id">>();
    const [projectForm] = Form.useForm<EditProjectData>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addMemberModal, setAddMemberModal] = useState(false);
    const { tasks: allTask, addTask, editTask } = useTaskStore();
    const { id: taskId, type, addModal, closeModal } = useTaskFormStore();

    const project = projects.find(({ id }) => id === params?.id);
    if (!params?.id || !project) notFound();

    const { id, name, status, description, start_date, end_date, leader, members } = project;

    const leaderData = users.find(({ id }) => id === leader);
    const membersData = users.filter(({ email }) => members.includes(email));

    const tasks = allTask.filter(({ project }) => project === id);

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
                                setProjectValues(projectForm, project);
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
                        <Progress type="line" percent={Math.round(progress)} />
                    </div>
                </div>
                <Divider />
                <Title className="uppercase" level={5}>
                    Project Descriptions
                </Title>
                <Text>{description}</Text>
                <div className="mt-6 flex justify-between">
                    <Title className="uppercase" level={5}>
                        Project Tasks
                    </Title>
                    <Button icon={<PlusOutlined />} onClick={addModal}>
                        Add Task
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-6 overflow-auto">
                    {columnsData.map(({ status, color }, idx) => (
                        <Column key={idx} {...{ status, color, tasks }} form={taskForm} />
                    ))}

                    <DeleteTask />
                </div>
            </div>
            <EditProject form={projectForm} {...{ id, isModalOpen, setIsModalOpen }} />
            <Modal title="Add Member" open={addMemberModal} onCancel={() => setAddMemberModal(false)} footer={false}>
                <AddMember
                    value={members}
                    onChange={(value) => addMember({ id, emails: value })}
                    options={users.filter(({ id }) => id !== leader)}
                />
            </Modal>
            <TaskForm
                form={taskForm}
                onFinish={(value) => {
                    if (type === "Add Task") {
                        addTask({ ...value, project: id });
                        taskForm.resetFields();
                        closeModal();
                    }

                    if (taskId && type === "Edit Task") {
                        editTask({ id: taskId, ...value });
                        taskForm.resetFields();
                        closeModal();
                    }
                }}
            />
        </>
    );
}
