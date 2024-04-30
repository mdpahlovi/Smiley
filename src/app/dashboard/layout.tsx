import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardMenu from "@/layout/dashboard/menu";
import { Layout, Header, Content, Footer, Sider } from "@/components/export";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
    const data = cookies().get("smiley_token");
    if (!data || !data?.value) redirect("/login");

    return (
        <Layout>
            <Sider theme="light" breakpoint="lg" collapsedWidth="0">
                <Link href="/" className="h-16 flex justify-center items-center">
                    <Image src="/logo.png" alt="" width={144} height={44} />
                </Link>
                <DashboardMenu />
            </Sider>
            <Layout>
                <Header className="px-6" />
                <Content className="m-6 mb-0">
                    <div className="bg-[#FFFFFF] p-6 min-h-[calc(100vh_-9.5rem)]">{children}</div>
                </Content>
                <Footer className="h-16 text-center">Smiley Task ©{new Date().getFullYear()} Created by Ant Design</Footer>
            </Layout>
        </Layout>
    );
}
