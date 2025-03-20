// src/components/Header.tsx
import React from 'react';
import styles from './Header.module.scss';
import { useGameStore } from '@/store/gameStore';
import content from '@/assets/content.json';
import DifficultySelector from '@/components/DifficultySelector/DifficultySelector';

interface HeaderProps {
    onReset?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
    const attempts = useGameStore(state => state.attempts);
    const time = useGameStore(state => state.time);
    const points = useGameStore(state => state.points);


    return (
        <header className={styles.gameHeader}>
            <div className={styles.attempts}>
                {content.header.attempts} {attempts}
            </div>
            <div className={styles.points}>
                {content.header.points} {points}
            </div>
            <button onClick={onReset}>
                reset game
            </button>
            <div className={styles.time}>
                {content.header.time} {time} {content.header.seconds}
            </div>
            <DifficultySelector />
        </header>
    );
};

export default Header;
