// src/components/Game.tsx
import React, { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import Header from '@/components/Header/Header';
import Board from '@/components/Board/Board';
import styles from '@/styles/Game.module.scss';
import { getOptimalColumns } from "@/utils/generateCards.ts";
import {useIsMobile} from "@/hooks/useIsMobile.ts";


const Game: React.FC = () => {
    const difficulty = useGameStore(state => state.difficulty);
    const cards = useGameStore(state => state.cards);
    const resetAndRestart = useGameStore(state => state.resetAndRestart)


    useEffect(() => {
        resetAndRestart();
    }, [difficulty]);


    const isMobile = useIsMobile();
    const optimalColumns = getOptimalColumns(cards.length, isMobile);

    return (
        <div className={styles.gameContainer}>
            <Header  />
            <Board optimalColumns={optimalColumns} isMobile={isMobile} />
        </div>
    );
};

export default Game;
