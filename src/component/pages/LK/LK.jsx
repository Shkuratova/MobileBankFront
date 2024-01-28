import React from 'react';
import '../../styles/Common.css'
import './LK.css'
import Action from "../../UI/Action";
import {observer} from "mobx-react-lite";
import Description from "../../UI/Description";
import UserStore from "../../../store/UserStore";
export const Lk =observer (() => {
   const {person } = UserStore
    return (
        <>
            <div className="personal info_box">
                <br/>
                <h1>Личный кабинет</h1>
                <div className='person'>
                    {person.sex==='female'?
                        <img className="lk_i" src = '/images/women.png'/>
                        :
                        <img className="lk_i" src = '/images/man.png'/>}
                    <p data-testid = "ln" className='lk_name' >{person.lastName} {person.firstName} {person.thirdName}</p>
                </div>
                <div className="lk_about">
                    <Description title={"Телефон:"} text={person.telephone}/>
                    <Description title={"Почта:"} text={person.email}/>
                </div>


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
                    {/*<Action*/}
                    {/*    path={'/lastlogin' }*/}
                    {/*    img={'/images/history.png'}*/}
                    {/*    width = "50"*/}
                    {/*    height = "50"*/}
                    {/*    name={'История посещений'}/>*/}
                    {/*<Action*/}
                    {/*    path = {'/about'}*/}
                    {/*    width = "50"*/}
                    {/*    height = "50"*/}
                    {/*    img={'/images/info.png'}*/}
                    {/*    name={'О приложении'}/>*/}
                </div>
            </div>
        </>
    );
});

export default Lk;