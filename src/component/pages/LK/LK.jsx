import React from 'react';
import '../../styles/Common.css'
import './LK.css'
import {useParams} from "react-router-dom";
import Action from "../../reUse/Action";
import CardList from "../Home/CardList";
const Lk = () => {
    const p = useParams()
    return (
        <div className="page_chr lk">
             <CardList/>
            <div className="personal">
                <div className='person'>
                    <img className="lk_i" src = '/images/person.png'/>
                    <p className='lk_name'>Иванов Б.Н.</p>
                </div>
                <div className='lk_act'>
                    <Action
                        path = {'/editpassword/' + p.id}
                        img={'/images/key.png'}
                        name = {'Изменить пароль'}/>
                    <Action
                        path = {'/editlogin/' + p.id}
                        img={'/images/change.png'}
                        name={'Изменить логин'}/>
                    <Action
                        path={'/lastlogin/' + p.id}
                        img={'/images/history.png'}
                        name={'История посещений'}/>
                    <Action
                        path = {'/about'}
                        img={'/images/info.png'}
                        name={'О приложении'}/>
                </div>
            </div>
        </div>
    );
};

export default Lk;