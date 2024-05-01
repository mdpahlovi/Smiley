import Tasks from "./client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = { title: "Tasks" };

export default function TaskPage() {
    const data = cookies().get("smiley_token");
    if (!data || !data?.value) redirect("/login");

    return <Tasks userEmail={JSON.parse(data?.value).email} />;
}
