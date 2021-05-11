import React, {useState} from 'react';
import Modal from 'react-modal';

const Calendar = (dates) => {
    dates = dates.dates
    const [month, setMonth] = useState('')
    const [date, setDate] = useState('')
    let monthIdx = 0

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
        setMonth(datesList[monthIdx].monthName)
    }
    const handleMonthChange = (direction) => {
        if (direction === 'Next') {
            if (monthIdx <= datesList.length-1) {
                monthIdx++
            }
        }
        if (direction === 'Prev') {
            if (monthIdx >= 1) {
                monthIdx--
            }
        }
        setMonth(datesList[monthIdx].monthName)
    }
    console.log(month)
    if (date !== '') {
        console.log(date)
    }
    
    return (
        <div id='calendar-view'>
            <span onClick={() => handleMonthChange('Prev')}>Prev</span> 
            <span>{month}</span> <span onClick={() => handleMonthChange('Next')}>Next</span>
            <ul>{month !== '' ? datesList.find(item => item.monthName === month).datesFromMonth.map(givenDate => <li onClick={() => setDate(givenDate)}>{givenDate}</li>): ''}</ul>
        </div>
    )
}

export default Calendar;