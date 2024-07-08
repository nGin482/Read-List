import { useState, useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";

import services from "../../services/services";
import { SearchOptions } from "../../utils/types";

interface SearchBoxProps {
    openSearch: boolean
    setOpenSearch: () => void
    searchCallback: (field: string, value: string) => void
}

const SearchForm = ({ openSearch, setOpenSearch, searchCallback }: SearchBoxProps) => {
    const [searchField, setSearchField] = useState<SearchOptions | ''>('');
    const [searchValue, setSearchValue] = useState('');
    const [fandoms, setFandoms] = useState<string[]>([]);

    useEffect(() => {
        if (searchField === 'fandoms') {
            services.getFandoms().then(fandoms => {
                setFandoms(fandoms.map(fandom => fandom.name));
            });
        }
    }, [searchField]);

    const [form] = Form.useForm();

    const search = () => {
        console.log(searchField, searchValue);
        searchCallback(searchField, searchValue);
        setOpenSearch()
    };

    return (
        <Modal
            open={openSearch}
            title="Search Stories"
            onOk={search}
            okText="Search"
            onCancel={setOpenSearch}
        >
            <Form
                form={form}
            >
                <Form.Item
                    name="field"
                    label="Search By"
                >
                    <Select
                        options={[
                            { label: 'Title', value: 'title' },
                            { label: 'Fandom', value: 'fandoms' },
                        ]}
                        onChange={(value: SearchOptions) => setSearchField(value)}
                    />
                </Form.Item>
                {searchField !== '' && (
                    <Form.Item
                        name="value"
                        label={searchField === 'fandoms' ? 'Fandoms' : 'Title'}
                    >
                        {searchField === 'fandoms' ? (
                            <Select
                                options={fandoms.map(fandom => ({
                                    label: fandom,
                                    value: fandom
                                }))}
                                onChange={(value: string) => setSearchValue(value)}
                            />
                        ) : (
                            <Input onChange={event => setSearchValue(event.currentTarget.value)} />
                        )}
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default SearchForm;