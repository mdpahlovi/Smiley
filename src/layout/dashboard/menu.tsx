"use client";

import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ProjectOutlined, UnorderedListOutlined } from "@ant-design/icons";

export default function DashboardMenu() {
    const route = useRouter();
    const pathname = usePathname();

    return (
        <Menu
            mode="inline"
            selectedKeys={[pathname]}
            onSelect={({ key }) => route.push(key)}
            items={[
                { key: "/dashboard", icon: <ProjectOutlined />, label: "Home" },
                { key: "/dashboard/projects", icon: <ProjectOutlined />, label: "Projects" },
                { key: "/dashboard/tasks", icon: <UnorderedListOutlined />, label: "Tasks" },
            ]}
        />
    );
}
