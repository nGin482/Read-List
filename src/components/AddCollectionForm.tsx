import { Dispatch, SetStateAction } from "react";
import {
    Button,
    Modal,
    notification,
    Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadRequestOption } from "rc-upload/lib/interface";

import { CollectionsAPI } from "../services/CollectionsAPI";


interface AddCollectionFormProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCollectionForm = ({ open, setOpen }: AddCollectionFormProps) => {

    const uploadCollection = async (options: UploadRequestOption) => {
        const file = options.file as RcFile;

        const formData = new FormData();
        formData.append("collection", file);
        
        try {
            await CollectionsAPI.uploadCollection(formData)
            options.onSuccess("file uploaded successfully");
            notification.success({
                message: "Collection uploaded!",
                description: `The collection '${file.name}' has been uploaded`,
            });
        }
        catch(error) {
            notification.error({
                message: "Collection upload failed!",
                description: `Error uploading '${file.name}': ${error.message}`,
            });
        }
    };

    return (
        <Modal
            title="Add a previous collection"
            open={open}
            onCancel={() => setOpen(false)}
        >
            <Upload
                name="collection"
                onChange={(data) => {
                    console.log("file status =", data.file.status)
                    if (data.file.status !== "uploading") {
                        console.log("file", data.file)
                    }
                }}
                customRequest={uploadCollection}
            >
                <Button icon={<UploadOutlined />}>Upload collection</Button>
            </Upload>
        </Modal>
    );
};

export default AddCollectionForm;