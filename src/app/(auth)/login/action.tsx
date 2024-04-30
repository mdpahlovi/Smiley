"use server";

import users from "@/data/user";
import { cookies } from "next/headers";

export default async function action(data: { email: string; password: string }) {
    // Check If user is exist
    const user = users.find((user) => user.email === data.email);
    if (!user) return { success: false, message: "Sorry, Your email doesn't exist in our records." };

    // Check If user password is match
    if (!user.password || data.password !== user.password)
        return { success: false, message: "Oops! your password doesn't match our records." };

    // Set user to cookies
    cookies().set("smiley_token", JSON.stringify(user), { maxAge: 60 * 60 * 24 * 1000 });
    return { success: true, message: "Users login successfully", redirect: "/dashboard" };
}
