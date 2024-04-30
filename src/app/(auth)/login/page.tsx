import Link from "next/link";
import Image from "next/image";
import { Button, Input } from "antd";
import { Title, Text } from "@/components/export";
import LoginForm from "./form";

export default function LoginPage() {
    return (
        <div className="flex h-screen justify-center">
            <div className="relative z-10 flex flex-1 bg-white px-6 py-10 shadow-2xl sm:items-center md:flex-none md:px-28">
                <main className="mx-auto w-full max-w-md md:w-96 md:max-w-sm">
                    <Link href="/">
                        <Image src="/logo.png" alt="" width={160} height={48} />
                    </Link>
                    <div className="mt-12 mb-8">
                        <Title level={4}>Login to your account</Title>
                        <Text>
                            Don’t have an account?{" "}
                            <Link href="/register" className="font-medium text-blue-600 hover:underline">
                                Sign up
                            </Link>{" "}
                            for a free trial.
                        </Text>
                    </div>
                    <LoginForm />
                </main>
            </div>
            <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="absolute inset-0 h-full w-full object-cover" src="/background.jpg" alt="" />
            </div>
        </div>
    );
}
