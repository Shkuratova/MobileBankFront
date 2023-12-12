import React, {useState} from 'react';
import '../../styles/Common.css'
import './Other.css'
import ATMItem from "./ATMItem";

const ATM = () => {
    const [atms, setAtms] = useState([
        {id: 1, address: "к1.8, посёлок Аякс, посёлок Русский", time:"8:00", timeEnd:"23:00"},
        {id: 2, address: "к6.2, посёлок Аякс, посёлок Русский", time:"8:00", timeEnd:"23:00"},
        {id: 3, address: "ул. Гоголя, 19, Владивосток", time:"8:00", timeEnd:"23:00"}
    ])
    return (
        <div className='page_chr'>
            <div className='atm_block'>
                <iframe className='map'
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A18d15dca1e496c1f5cdb67e62939d9faf18fb811558de64c57c6d3ef44073e34&amp;source=constructor"
                    width="800" height="700" ></iframe>
            <div className="atm__list">
                {atms.map((atm)=>
                    <ATMItem atm={atm}/>)
                }
            </div>
            </div>
        </div>
    );
};

export default ATM;