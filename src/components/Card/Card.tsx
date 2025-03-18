
import React from 'react';
import styles from './Card.module.scss';
// import { useGameStore } from '@/store/gameStore';
import content from '@/assets/content.json';

interface CardProps {
    id: number;
    icon: React.ComponentType<{ size?: number }>;
}

const Card: React.FC<CardProps> = ({ id, icon: Icon }) => {


    return (
        <div data-card-id={id} className={styles.test}>
            <div >
                <div >
                    {<Icon size={48} />}
                </div>
                <div >
                    Cards {content.test}
                </div>
            </div>
        </div>
    );
};

export default Card;
