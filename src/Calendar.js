import React, {useState} from 'react';
import Modal from 'react-modal';

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
        
        // styles
        if (date !== '') {
            console.log(date)
        }
    
        const padding = {
            padding: 5
        }
    
        return (
            <div id='calendar-view'>
                <button onClick={() => setOpen(true)}>Change Date</button>
                <Modal isOpen={open}>
                    <button onClick={() => setOpen(false)}>Close</button>
                    <span onClick={() => handleMonthChange('Prev')} style={padding}>Prev</span> 
                    <span style={padding}>{month}</span> <span onClick={() => handleMonthChange('Next')} style={padding}>Next</span>
                    <ul>{month !== '' ? datesList.find(item => item.monthName === month).datesFromMonth.map(givenDate => <li onClick={() => {
                        setDate(givenDate)
                        setOpen(false)
                        }}>{givenDate}</li>): ''}
                    </ul>
                </Modal>
            </div>
        )
    }
    else {
        return <Modal isOpen={true}>Waiting for available dates to be retrieved from the server ...</Modal>
    }
}

export default Calendar;