import React, {useState} from 'react';
import Modal from 'react-modal';
import './Calendar.css';

const Calendar = (dates) => {
    dates = dates.dates
    const [month, setMonth] = useState('')
    const [date, setDate] = useState('')
    const [open, setOpen] = useState(false)
    // on choosing date, make request and redirect
    if (dates.length !== 0) {

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
        
        if (date !== '') {
            console.log(date)
        }
        
        const selectDate = (givenDate) => {
            setDate(givenDate)
            setOpen(false)
        }
        Modal.setAppElement('#root')
        const customStyles = {
            content: {
                backgroundColor: 'rgb(251, 130, 97)'
            }
        }
    
        return (
            <div id="modal">
            <button onClick={() => setOpen(true)}>Change Date</button>
                <Modal isOpen={open} id="calendar-view" style={customStyles}>
                    <button onClick={() => setOpen(false)}>Close</button> <br/>
                    <div id="headers">
                        <div id="month-change-prev"><span onClick={() => handleMonthChange('Prev')}>Prev</span></div>
                        <div id="month-shown"><span>{month}</span></div>
                        <div id="month-change-next"><span onClick={() => handleMonthChange('Next')}>Next</span></div>
                    </div>
                    <ul>{month !== '' ? datesList.find(item => item.monthName === month).datesFromMonth.map(givenDate => <li onClick={() => selectDate(givenDate)}>{givenDate}</li>): ''}
                    </ul>
                </Modal>
            </div>
        )
    }
    else {
        Modal.setAppElement('#root')
        return <Modal isOpen={true}>Waiting for available dates to be retrieved from the server ...</Modal>
    }
}

export default Calendar;