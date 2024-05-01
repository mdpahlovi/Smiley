import Link from "next/link";
import { Button } from "antd";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Title } from "@/components/export";

export default function DashboardHome() {
    const data = cookies().get("smiley_token");
    if (!data || !data?.value) redirect("/login");

    return (
        <div className="min-h-[calc(100vh-12.5rem)] flex flex-col justify-center items-center text-center">
            <Link href="/dashboard">
                <Image src="/logo.png" alt="" style={{ marginBottom: 48 }} width={160} height={48} />
            </Link>
            <Title level={2}>
                Hi <span style={{ color: "#9b48dd" }}>{JSON.parse(data.value).name},</span>
            </Title>
            <Title style={{ marginTop: 0 }}>Welcome to Smiley Task!</Title>
        </div>
    );
}
