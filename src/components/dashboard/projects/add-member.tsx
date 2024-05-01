import users from "@/data/users";
import { Text } from "@/components/export";
import { AutoComplete, Avatar, Modal } from "antd";
import { useProjectStore } from "@/hooks/useProjectHook";

type AddMemberProps = {
    id: string;
    addMemberModal: boolean;
    setAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddMember({ id, addMemberModal, setAddMemberModal }: AddMemberProps) {
    const { addMember } = useProjectStore();

    return (
        <Modal title="Add Member" open={addMemberModal} onCancel={() => setAddMemberModal(false)} footer={false}>
            <AutoComplete
                className="w-full"
                options={users.map(({ image, name, email }) => ({
                    value: email,
                    label: (
                        <div className="flex items-center gap-2">
                            <Avatar size="large" src={image} />
                            <div className="flex flex-col">
                                <Text>{name}</Text>
                                <Text>{email}</Text>
                            </div>
                        </div>
                    ),
                }))}
                onSelect={(value) => {
                    setAddMemberModal(false);
                    addMember({ id, email: value });
                }}
                placeholder="input here"
            />
        </Modal>
    );
}
