import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "../../styles/Common.css";
import './idElements.css';
import '../../reUseComponents/Action.css'
import CardService from "../../../service/CardService";
import CardActive from "./CardActive";
import CardBlocked from "./CardBlocked";

const CardById = () => {
    const inf= useParams()
    const [card, setCard] = useState()

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const getCard = async ()=>{
            try {
                const response = await CardService.cardById(inf.id)
                setCard(response.data[0])
                setIsLoading(false)
            }catch (e) {
                console.log(e.response.data)
            }
        }
        getCard()

    }, [inf.id]);
    return (
           <div className="page_chr">
               {isLoading? <div></div>
                   :
                   <>
                   {card.is_activated ?
                           <CardActive card={card}/>
                           :
                           <CardBlocked card={card}/>
                   }
                   </>
               }
           </div>
    );
};

export default CardById;