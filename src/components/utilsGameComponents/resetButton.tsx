import React from 'react';
import styles from './utilsGameComponents.module.scss';
import {useGameStore} from "@/store/gameStore.ts";
import content from '@/assets/content.json';


const ResetButton: React.FC = () => {
    const resetAndRestart = useGameStore(state => state.resetAndRestart)

    return <>
    <button className={styles.resetButton} onClick={resetAndRestart}>
        {content.resetButton}
    </button>
    </>
}

export default ResetButton;