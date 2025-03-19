// src/components/Card.tsx
import React from 'react';
import styles from './Card.module.scss';
import { useGameStore } from '@/store/gameStore';
// import content from '@/assets/content.json';

interface CardProps {
    id: number;
    icon: React.ComponentType<{ size?: number }>;
    isFlipped: boolean;
    isMatched: boolean;
}

const Card: React.FC<CardProps> = ({ id, icon: Icon, isFlipped, isMatched }) => {
    const flipCard = useGameStore(state => state.flipCard);


    // Обработчик клика по карточке
    const handleClick = (): void => {
        if (!isFlipped && !isMatched) {
            flipCard(id);
        }
    };

    return (
        <div
            className={`${styles.card} ${isFlipped ? styles.flipped : ''} ${isMatched ? styles.matched : ''}`}
            onClick={() => handleClick()}
            data-card-id={id}
        >
            <div className={styles.cardInner}>
                {isFlipped || isMatched ? (
                    <div className={styles.cardFront}>
                        {Icon && <Icon size={48} />}
                    </div>
                ) : (
                    <div className={styles.cardBack}>
                        <p>?</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
