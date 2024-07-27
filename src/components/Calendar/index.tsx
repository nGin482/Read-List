import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker, GetProps, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { CollectionsAPI } from '../../services/CollectionsAPI';
import './Calendar.css';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const Calendar = () => {
    const [datesAvailable, setDatesAvailable] = useState<Dayjs[]>([]);
    const [dateChosen, setDateChosen] = useState<Dayjs>(null);
    const history = useHistory<string>();
    
    useEffect(() => {
        getCollections();
    }, []);

    useEffect(() => {
        if (dateChosen) {
            history.push(`/stories/${dateChosen.format('DD-MM-YYYY')}`);
        }
    }, [dateChosen]);

    const getCollections = async () => {
        const collections = await CollectionsAPI.getAllCollections();
        setDatesAvailable(collections.map(collection => dayjs(collection.date)));
    };

    const disableDate: RangePickerProps['disabledDate'] = (current) => {
        return !datesAvailable.find(date => date.isSame(current));
    };
    
    return (
        datesAvailable.length > 0 ? (
            <DatePicker
                disabledDate={disableDate}
                minDate={datesAvailable[0]}
                maxDate={datesAvailable[datesAvailable.length - 1]}
                onChange={setDateChosen}
            />
        ) : (
            <Spin />
        )
    );
};

export default Calendar;