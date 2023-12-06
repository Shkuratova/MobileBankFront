import React from 'react';
import {useParams} from "react-router-dom";

const RenameCard = () => {
    const p = useParams()
    return (
        <div>
            rename card with id {p.id}
        </div>
    );
};

export default RenameCard;