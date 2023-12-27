import React, {useEffect, useState} from 'react';
import '../../styles/Common.css'
import './LK.css'
import {useParams} from "react-router-dom";
import Action from "../../reUseComponents/Action";
import CardList from "../Home/CardList";
import {observable} from "mobx";
import {observer} from "mobx-react-lite";
import PersonStore from "../../../store/PersonStore";
export const Lk =observer (() => {
   const {person } = PersonStore
    const p = useParams()
   console.log(person)
    return (
        <div className="page_chr lk">
            <div className="personal">
                <div className='person'>
                    {person.sex==='female'?
                        <img className="lk_i" src = '/images/women.png'/>
                        :
                        <img className="lk_i" src = '/images/man.png'/>}
                    <p className='lk_name' >{person.lastName} {person.firstName} {person.thirdName}</p>
                </div>
                <p className='lk_about'>Телефон: {person.telephone}</p>
                <p className='lk_about' >Почта: {person.email}</p>

                <div className='lk_act'>
                    <Action
                        path = {'/editpassword' }
                        img={'/images/key.png'}
                        width = "50"
                        height = "50"
                        name = {'Изменить пароль'}/>
                    <Action
                        path = {'/editlogin' }
                        img={'/images/change.png'}
                        width = "50"
                        height = "50"
                        name={'Изменить логин'}/>
                    <Action
                        path={'/lastlogin' }
                        img={'/images/history.png'}
                        width = "50"
                        height = "50"
                        name={'История посещений'}/>
                    <Action
                        path = {'/about'}
                        width = "50"
                        height = "50"
                        img={'/images/info.png'}
                        name={'О приложении'}/>
                </div>
            </div>
        </div>
    );
});

export default Lk;