import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
    components: { Layout: { headerBg: "#FFFFFF" }, Button: { controlHeight: 40 }, Input: { controlHeight: 40 } },
    token: {
        fontFamily: "inherit",
        colorPrimary: "#9b48dd",
        borderRadius: 10,
        colorBgContainer: "#FFFFFF",
    },
};

export default theme;
