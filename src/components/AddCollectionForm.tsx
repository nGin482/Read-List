import { Dispatch, SetStateAction } from "react";
import {
    Button,
    Modal,
    Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";


interface AddCollectionFormProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCollectionForm = ({ open, setOpen }: AddCollectionFormProps) => {

    return (
        <Modal
            title="Add a previous collection"
            open={open}
            onCancel={() => setOpen(false)}
        >
            <Upload
                name="collection"
                onChange={(data) => {
                    console.log("file status", data.file.status)
                    if (data.file.status !== "uploading") {
                        console.log("file", data.file)
                    }
                }}
            >
                <Button icon={<UploadOutlined />}>Upload collection</Button>
            </Upload>
        </Modal>
    );
};

export default AddCollectionForm;