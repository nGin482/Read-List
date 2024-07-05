import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from "antd";

import services from '../../../services/services';
import { validateFandom } from '../../../utils';
import { FandomArchive } from '../../../../types';

interface UpdateFandomProps {
    fandom: FandomArchive
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const UpdateFandom = ({ fandom, openModal, setOpenModal }: UpdateFandomProps) => {

    const [form] = Form.useForm<FandomArchive>();

    useEffect(() => {
        form.setFieldsValue(fandom);
    }, [fandom]);

    const updateFandom = async () => {
        const values = form.getFieldsValue();
        const { name, ffn_url, ao3_url } = values;
        
        try {
            validateFandom(name, ffn_url || '', ao3_url || '');
            // services.updateFandom(fandom).then(data => {
            //     setField('')
            //     setNewData('')
            // }).catch(err => {
            //     setField('')
            //     setNewData('')
            // })
        }
        catch (error) {
            // setMessage(checkValidation.message)
        }
    };

    return (
        <Modal
            title={`Update ${fandom.name}`}
            open={openModal}
            okText="Update"
            onOk={updateFandom}
            onCancel={() => setOpenModal(current => !current)}
        >
            <Form
                form={form}
            >
                <Form.Item
                    label="Fandom Name"
                    name="name"
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
                    label="Search pages"
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

export default UpdateFandom;
