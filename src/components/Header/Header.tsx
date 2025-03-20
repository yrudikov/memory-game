// src/components/Header.tsx
import React from 'react';
import styles from './Header.module.scss';
import { useGameStore } from '@/store/gameStore';
import content from '@/assets/content.json';
import DifficultySelector from '@/components/utilsGameComponents/DifficultySelector';
import ResetButton from "@/components/utilsGameComponents/resetButton.tsx";
import Timer from "@/components/utilsGameComponents/Timer.tsx";


const Header: React.FC = () => {
    const attempts = useGameStore(state => state.attempts);
    const points = useGameStore(state => state.points);

    console.log('Header render');

    return (
        <header className={styles.gameHeader}>
            <div className={styles.attempts}>
                {content.header.attempts} {attempts}
            </div>
            <div className={styles.points}>
                {content.header.points} {points}
            </div>
            <Timer />
            <ResetButton />
            <DifficultySelector />
        </header>
    );
};

export default Header;
