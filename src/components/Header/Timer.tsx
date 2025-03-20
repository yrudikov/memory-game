import React from 'react';
import styles from '../utilsGameComponents/utilsGameComponents.module.scss';
import {useGameStore} from "@/store/gameStore.ts";
import content from '@/assets/content.json';


const Timer: React.FC = () => {
    const time = useGameStore(state => state.time);

    return <>
        <div className={styles.time}>
            {content.timer.time} {time} {content.timer.seconds}
        </div>
    </>
}

export default Timer;