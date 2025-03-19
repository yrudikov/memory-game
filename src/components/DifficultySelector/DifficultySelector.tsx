// src/components/DifficultySelector.tsx
import React from 'react';
import styles from './DifficultySelector.module.scss';
import { useGameStore, Difficulty } from '@/store/gameStore';
import content from '@/assets/content.json';

const DifficultySelector: React.FC = () => {
    const setDifficulty = useGameStore(state => state.setDifficulty);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setDifficulty(e.target.value as Difficulty);
    };

    return (
        <div className={styles.difficultySelector}>
            <label htmlFor="difficulty">
                {content.difficultySelector.label}
            </label>
            <select id="difficulty" onChange={handleChange}>
                <option value="easy">{content.difficultySelector.options.easy}</option>
                <option value="medium">{content.difficultySelector.options.medium}</option>
                <option value="hard">{content.difficultySelector.options.hard}</option>
                <option value="banana">{content.difficultySelector.options.banana}</option>
            </select>
        </div>
    );
};

export default DifficultySelector;
