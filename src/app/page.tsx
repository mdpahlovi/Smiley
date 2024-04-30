import { Button } from "antd";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
    const data = cookies().get("smiley_token");
    if (!data?.value) redirect("/login");

    return <Button type="primary">Button</Button>;
}
