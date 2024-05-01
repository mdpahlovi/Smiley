import type { User } from "@/types";
import { Avatar, Select } from "antd";
import { Text } from "@/components/export";

type AddMemberProps = { value: string[]; onChange: (value: string[]) => void; options: User[] };

export default function AddMember({ value, onChange, options }: AddMemberProps) {
    return (
        <Select
            allowClear
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select Member"
            value={value}
            onChange={onChange}
            onClear={() => onChange([])}
            options={options.map(({ image, name, email }) => ({
                value: email,
                label: (
                    <div className="flex items-center gap-2">
                        <Avatar src={image} />
                        <Text>{name}</Text>
                    </div>
                ),
            }))}
        />
    );
}
