import React, {useEffect, useState} from 'react';
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import './Maps.css'
import ToAllService from "../../service/ToAllService";
const YandexMap = () => {
    const[coord, setCoords] = useState([])
    useEffect(() => {
        const gerCoord = async ()=>{
            try{
                const respomce = await ToAllService.gerCoords()
                setCoords(respomce.data)
                console.log(respomce.data)
            }catch (e){
                console.log(e)
            }
        }
        gerCoord()

    }, []);
    return (
        <YMaps query={{apikey:"008189ba-0f43-41e3-a99d-0581c46ee5d5"}}>
                <div className="yandex-map">
                    <h1 className="map-title">Отделения банкоматов</h1>
                    <Map
                        defaultState={{center: [46.40, 141.57], zoom: 9}}
                        className={"map"}
                    >
                        {coord.length !==0 &&
                            <div>
                                { coord.map((c) => (
                                    <div key={c.longitude}>
                                    <Placemark   geometry={[c.latitude,c.longitude]}/>
                                    </div>
                                ))
                                }
                            </div>
                            }
                    </Map>
                </div>

        </YMaps>
    );
};

export default YandexMap;