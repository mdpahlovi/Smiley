import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
    components: {
        Input: { controlHeight: 40 },
        Button: { controlHeight: 40 },
        Select: { controlHeight: 40 },
        Layout: { headerBg: "#FFFFFF" },
        DatePicker: { controlHeight: 40 },
    },
    token: {
        fontFamily: "inherit",
        colorPrimary: "#9b48dd",
        borderRadius: 10,
        colorBgContainer: "#FFFFFF",
    },
};

export default theme;
