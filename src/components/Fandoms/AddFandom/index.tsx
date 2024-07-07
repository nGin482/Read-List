import { Dispatch, SetStateAction } from 'react';
import { Form, Input, Modal, notification, Select } from 'antd';

import services from '../../../services/services';
import { validateFandom } from '../../../utils/index';
import { FandomArchive } from '../../../../types/index';
import './AddFandom.css';


interface AddFandomProps {
    createFandom: boolean
    setCreateFandom: Dispatch<SetStateAction<boolean>>
}

const AddFandom = ({ createFandom, setCreateFandom }: AddFandomProps) => {

    const [form] = Form.useForm<FandomArchive>();

    const addFandom = async () => {
        await form.validateFields().then(async () => {
            const values = form.getFieldsValue();
            const { name, ffn_url, ao3_url } = values;
            try {
                validateFandom(name, ffn_url || '', ao3_url || '');
                const response = await services.addFandom(values);
                form.resetFields();
                setCreateFandom(current => !current);
                notification.success({
                    message: `The fandom ${name} has been added to the list`
                });
            }
            catch(error) {
                notification.error({
                    message: error?.response?.data.message || error.message
                });
            }
        });
    };

    return (
        <Modal
            title="Add new Fandom"
            open={createFandom}
            onOk={addFandom}
            okText="Add new Fandom"
            onCancel={() => setCreateFandom(current => !current)}
        >
            <Form
                form={form}
                initialValues={{ search: 'one' }}
            >
                <Form.Item
                    label="Fandom Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please provide the name of the fandom' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Fanfiction.Net URL"
                    name="ffn_url"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="AO3 URL"
                    name="ao3_url"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Pages to search"
                    name="search"
                >
                    <Select
                        options={[
                            { label: 'One page', value: 'one' },
                            { label: 'Many pages', value: 'many' }
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFandom;
