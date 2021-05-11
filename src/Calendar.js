import React, {useState} from 'react';
import Modal from 'react-modal';

const Calendar = (dates) => {
    dates = dates.dates
    const [month, setMonth] = useState('')
    const [date, setDate] = useState('')

    const getMonth = (date) => {
        const givenMonth = date.slice(date.indexOf('-')+1, date.lastIndexOf('-'))
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return months[Number(givenMonth)-1]
    }
    const datesList = []
    dates.map(month => {
        const monthObj = {monthName: getMonth(month[0]), datesFromMonth: month}
        datesList.push(monthObj)
    })
    if (month === '') {
        setMonth(datesList[0].monthName)
    }
    console.log(month)
    console.log(date)
    
    return (
        <div id='calendar-view'>
            <span onClick={() => setMonth(datesList[0].monthName)}>Prev</span> 
            <span>{month}</span> <span onClick={() => setMonth(datesList[1].monthName)}>Next</span>
            <ul>{month !== '' ? datesList.find(item => item.monthName === month).datesFromMonth.map(givenDate => <li onClick={() => setDate(givenDate)}>{givenDate}</li>): ''}</ul>
        </div>
    )
}

export default Calendar;