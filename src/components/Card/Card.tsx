import React, {useCallback, memo} from 'react';
import styles from './Card.module.scss';
import { useGameStore } from '@/store/gameStore';
import { FaQuestion } from "react-icons/fa6";

interface CardProps {
    id: number;
    icon: React.ComponentType<{ size?: number }>;
    isFlipped: boolean;
    isMatched: boolean;
    iconSize: number;
}

const Card: React.FC<CardProps> = memo (({ id, icon: Icon, isFlipped, isMatched, iconSize }) => {
    const flipCard = useGameStore(state => state.flipCard);


    const handleClick = useCallback( (): void => {
        if (!isFlipped && !isMatched) {
            flipCard(id);
        }
    },[id, isFlipped, isMatched, flipCard]);
    console.log('Card render');

    return (
        <div
            className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
            onClick={() => handleClick()}
            data-card-id={id}
        >
            <div className={styles.cardInner}>
                <div className={`${styles.cardFront} ${isMatched ? styles.matched : ''}`}>
                    {Icon && <Icon size={iconSize} />}
                </div>
                <div className={styles.cardBack}>
                    <FaQuestion size={iconSize} />
                </div>
            </div>
        </div>
    );
});

export default Card;
