import { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';

import services from '../../../services/services';
import { checkValidationAddFandom } from '../../../utils/index';
import { FandomArchive } from '../../../../types/index';
import './AddFandom.css';


const AddFandom = () => {

    const [modalOpen, setModalOpen] = useState(true);
    const [form] = Form.useForm<FandomArchive>();

    const addFandom = async () => {
        await form.validateFields().then(async () => {
            const values = form.getFieldsValue();
            console.log(values)
            const { name, ffn_url, ao3_url, search } = values;
            try {
                checkValidationAddFandom(name, ffn_url || '', ao3_url || '');
                console.log('validation passed')
                setModalOpen(current => !current);
                console.log('adding new fandom')
            }
            catch(error) {
                console.error(error.message)
                return false;
            }
        });
    };

    return (
        <Modal
            title="Add new Fandom"
            open={modalOpen}
            onOk={addFandom}
            okText="Add new Fandom"
            onCancel={() => setModalOpen(current => !current)}
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
