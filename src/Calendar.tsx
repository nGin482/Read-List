import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import './Calendar.css';

const Calendar = ({ dates }: { dates: string[][] }) => {
    const [datesAvailable, setDatesAvailable] = useState<Dayjs[]>([]);
    const [dateChosen, setDateChosen] = useState<Dayjs>(null);
    const history = useHistory<string>();
    
    useEffect(() => {
        if (dates.length > 0) {
            setDatesAvailable(dates[0].map(date => dayjs(date, 'D-M-YYYY')));
        }
    }, [dates])

    useEffect(() => {
        if (dateChosen) {
            history.push(`/stories/${dateChosen.format('D-M-YYYY')}`);
        }
    }, [dateChosen]);
    
    return (
        datesAvailable.length > 0 ? (
            <DatePicker
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