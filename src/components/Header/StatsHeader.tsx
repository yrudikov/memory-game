import styles from "@/components/Header/Header.module.scss";
import content from "@/assets/content.json";
import React, {memo} from "react";
import {useGameStore} from "@/store/gameStore.ts";
import {useShallow} from "zustand/shallow";


const StatsHeader: React.FC = memo(() => {
    const {attempts, points} = useGameStore(useShallow(state => ({
        attempts: state.attempts,
        points: state.points,
    })));

    console.log('StatsHeader render');

    return <>
        <div className={styles.attempts}>
            {content.header.attempts} {attempts}
        </div>
        <div className={styles.points}>
            {content.header.points} {points}
        </div>
    </>

});

export default StatsHeader;

