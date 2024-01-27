import React, {useEffect, useState} from 'react';
import {GeolocationControl, Map, Placemark, withYMaps, YMaps} from "@pbe/react-yandex-maps";
import './Maps.css'
import ToAllService from "../../service/ToAllService";
import PointItem from "./PointItem";
const YandexMap = () => {
    const[coord, setCoords] = useState([])
    const [point, setPoint] = useState( [43.025143920543236, 131.89073607706007])
    const[isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        setIsLoad(true)
        const gerCoord = async ()=>{
            try{
                const respomce = await ToAllService.gerCoords()
                setCoords(respomce.data)
                console.log(respomce.data)
                setIsLoad(false)
            }catch (e){
                console.log(e)
            }
        }
        gerCoord()

    }, []);
    return (
        <YMaps query={{apikey:"008189ba-0f43-41e3-a99d-0581c46ee5d5"}}>
                <div className="yandex-map">
                    <Map
                        modules={["geolocation"]}
                        state={{center: point,zoom:16}}
                        className={"map"}

                    >
                        <GeolocationControl state={{enabled:true}}/>
                        {coord.length !==0 &&
                            <div>
                                { coord.map((c) => (
                                    <div key={c.longitude}>
                                    <Placemark options={{iconColor:"#6B3FA0"}}  geometry={[c.latitude,c.longitude]}/>
                                    </div>
                                ))
                                }
                            </div>
                            }
                    </Map>
                    {coord.length!== 0 &&
                        <div className="atm-list">
                            {coord.map((c)=>(
                                <PointItem key ={c.description.about}
                                           coord={point}
                                           setPoint={setPoint}
                                           point={c}/>
                                ))
                            }

                        </div>
                    }

                </div>

        </YMaps>
    );
};

export default YandexMap;