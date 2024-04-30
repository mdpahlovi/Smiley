import { Button } from "antd";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
    const data = cookies().get("smiley_token");

    if (!data || !data?.value) {
        redirect("/login");
    } else {
        redirect("/dashboard");
    }

    return <Button type="primary">Smiley Home Page</Button>;
}
