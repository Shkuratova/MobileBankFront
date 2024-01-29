import React from 'react';

const Timer = ({Request, error}) => {
    const [ seconds, setSeconds ] = React.useState(200);

    React.useEffect(() => {
        if (seconds > 0 ) {
            setTimeout(setSeconds, 1000, seconds - 1);
        }
    }, [seconds]);
    const getTime = ()=>{
        let min = Math.floor(seconds/60)
        let sec = seconds %60
        if(sec > 9) return (min + `:${sec}`)
        else  return (min + `:0${sec}`)
    }
    return (
        <div>
            {seconds && !error?
                <p style={{marginLeft:"10px", color:"grey"}}>{getTime()}</p>
                :
                <button onClick={Request} className="btn__link">Отправить код повторно</button>
            }
        </div>
    );
};

export default Timer;