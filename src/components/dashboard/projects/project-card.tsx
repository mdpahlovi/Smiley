import dayjs from "dayjs";
import Link from "next/link";
import { Card, Progress } from "antd";
import type { Project } from "@/types";
import { Ribbon, Text, Title } from "@/components/export";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { CalendarOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

dayjs.extend(localizedFormat);

export default function ProjectCard({ id, status, name, start_date, end_date }: Project) {
    return (
        <Ribbon text={status}>
            <Card
                actions={[
                    <EditOutlined key="edit" />,
                    <Link key="view" href={`/dashboard/projects/${id}`}>
                        View Details
                    </Link>,
                    <DeleteOutlined key="delete" />,
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
    );
}
