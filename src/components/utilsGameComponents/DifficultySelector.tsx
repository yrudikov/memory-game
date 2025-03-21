import React from 'react';
import styles from './utilsGameComponents.module.scss';
import {useGameStore, Difficulty} from '@/store/gameStore';
import content from '@/assets/content.json';
import {useShallow} from "zustand/shallow";

interface DifficultySelectorOptions {
    id: number;
    value: string;
    name: string;
}

const DifficultySelector: React.FC = () => {
    const { difficulty, setDifficulty } = useGameStore(useShallow((state) => ({
        difficulty: state.difficulty,
        setDifficulty: state.setDifficulty
    })));

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setDifficulty(e.target.value as Difficulty);
    };
    console.log('DifficultySelector render');

    return (
        <div className={styles.difficultySelector}>
            <label htmlFor="difficulty">
                {content.difficultySelector.label}
            </label>
            <select id="difficulty" className={styles.selectLevel} onChange={handleChange} value={difficulty}>
                {content.difficultySelector.options.map((option: DifficultySelectorOptions) => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </div>
    );
};

export default DifficultySelector;
