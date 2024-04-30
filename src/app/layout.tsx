import "./globals.css";

import theme from "./theme";
import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import { Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const poppins = Poppins({
    display: "swap",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: {
        default: "Smiley Task | Project Management Application",
        template: "%s - Smiley Task",
    },
    description: "A project management application that allows users to manage tasks, and projects.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <AntdRegistry>
                    <ConfigProvider theme={theme}>{children}</ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
