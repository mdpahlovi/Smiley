import dayjs from "dayjs";
import { Badge, Button, Divider, Progress } from "antd";
import projects from "@/data/projects";
import { notFound } from "next/navigation";
import { Text, Title } from "@/components/export";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { CalendarOutlined, DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";

dayjs.extend(localizedFormat);

const people = [
    {
        id: 1,
        name: "John Doe",
        designation: "Software Engineer",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
        id: 2,
        name: "Robert Johnson",
        designation: "Product Manager",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 3,
        name: "Jane Smith",
        designation: "Data Scientist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 4,
        name: "Emily Davis",
        designation: "UX Designer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 5,
        name: "Tyler Durden",
        designation: "Soap Developer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
        id: 6,
        name: "Dora",
        designation: "The Explorer",
        image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
];

export default function ProjectDetailsPage({ params }: { params: { id?: string } }) {
    const project = projects.find(({ id }) => id === params?.id);
    if (!params?.id || !project) notFound();

    const { id, name, status, description, start_date, end_date, leader, members, tasks } = project;

    return (
        <div>
            <Title level={3}>{name}</Title>
            <Badge count={status} />
            <div className="my-6 flex max-md:flex-col justify-between gap-6">
                <div className="flex gap-4">
                    <Button type="primary" icon={<UserAddOutlined />}>
                        Add Member
                    </Button>
                    <Button icon={<EditOutlined />}>Edit</Button>
                    <Button icon={<DeleteOutlined />} danger>
                        Delete
                    </Button>
                </div>
                <div className="flex items-center">
                    <AnimatedTooltip items={people} />
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
    );
}
