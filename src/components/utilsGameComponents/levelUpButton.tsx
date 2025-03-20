import React from 'react';
import styles from './utilsGameComponents.module.scss';
import {useGameStore, Difficulty} from "@/store/gameStore.ts";
import content from '@/assets/content.json';


const LevelUpButton: React.FC = () => {
    const difficulty = useGameStore(state => state.difficulty);
    const setDifficulty = useGameStore(state => state.setDifficulty);
    const resetAndRestart = useGameStore(state => state.resetAndRestart)
    const options = [...content.difficultySelector.options]

    const handleIncreaseDifficulty = () => {
        const foundIndex = options.findIndex(option =>
            option.value === difficulty);
        if (foundIndex !== -1 && foundIndex + 1 < options.length) {
        return setDifficulty(options[foundIndex + 1].value as Difficulty);
        }
        return resetAndRestart();
    }
    console.log('LevelUpButton render');

    return <>
    <button className={styles.resetButton} onClick={() => handleIncreaseDifficulty()}>
        {content.levelUpButton}
    </button>
    </>
}

export default LevelUpButton;