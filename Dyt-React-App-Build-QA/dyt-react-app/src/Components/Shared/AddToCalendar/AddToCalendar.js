import { useEffect } from 'react';
import { atcb_init } from 'add-to-calendar-button';
import './AddToCalendar.scss';

const AddToCalendar = () => {

    useEffect(() => { atcb_init() }, []);

    return (
        <div className="atcb">
            {'{'}
            "name":"Reminder to join workshop",
            "startDate":"2023-01-14",
            "endDate":"2023-01-18",
            "location":"World Wide Web",
            "label":"Add To Calendar",
            "options":[
            "Apple|Apple is ok for me",
            "Google|Add to Google Cal",
            "Microsoft365|Use Microsoft instead",
            "Yahoo|Yahoo, really?",
            "iCal|iCall ftw!"
            ],
            "icsFile":"https://add-to-calendar-button.com/demo-event.ics",
            "listStyle":"overlay",
            "size":"8",
            "timeZone":"Europe/Berlin",
            "iCalFileName":"Reminder-Event"
            {'}'}
        </div>
    );
}

export default AddToCalendar;