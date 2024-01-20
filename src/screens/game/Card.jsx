import React from 'react';
import question from '../../assets/memoryGame/question.png';


const Card = ({ type, image, isFlipped, onClick }) => {
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
            {isFlipped ? (
                <img src={image} alt={type} className="card-image" />
            ) : (
                <img src={question} alt={type} />
            )}
        </div>
    );
};

export default Card;



