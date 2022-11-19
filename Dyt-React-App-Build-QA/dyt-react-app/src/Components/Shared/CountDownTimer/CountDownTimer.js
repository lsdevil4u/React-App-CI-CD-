import { useState, useRef, useEffect } from 'react';
import './CountDownTimer.scss';

const CountDownTimer = (props) => {
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSec, setTimerSec] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        const startTimer = props.startDate;
        const countdownDate = new Date(startTimer).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const mnts = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                //stop 
                clearInterval(interval.current);
            } else {
                setTimerDays(days)
                setTimerHours(hours)
                setTimerMinutes(mnts)
                setTimerSec(secs)

            }
        }, 1000);

    };


    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }

    }, []);

    return (
        <div className='count-down-timer'>
            <div className='count'>
                <section>
                    <p>{timerDays}</p>
                    <p><small>DAYS</small></p>
                    {/* <span>:</span> */}
                </section>

                <section>
                    <p>{timerHours}</p>
                    <p><small>HRS</small></p>
                    {/* <span>:</span> */}
                </section>

                <section>
                    <p>{timerMinutes}</p>
                    <p><small>MINS</small></p>
                    {/* <span>:</span> */}
                </section>

                <section>
                    <p>{timerSec}</p>
                    <p><small>SECS</small></p>
                </section>
            </div>
        </div>
    )
}

export default CountDownTimer