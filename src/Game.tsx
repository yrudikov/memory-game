import React, {useEffect, memo, useMemo} from 'react';
import {useGameStore} from '@/store/gameStore';
import Header from '@/components/Header/Header';
import Board from '@/components/Board/Board';
import styles from '@/styles/Game.module.scss';
import {getOptimalColumns} from "@/utils/generateCards.ts";
import {useIsMobile} from "@/hooks/useIsMobile.ts";
import GameOverModal from "@/components/utilsGameComponents/GameOverModal.tsx";
import {useShallow} from "zustand/shallow";


const Game: React.FC = memo( () => {
    const { difficulty, cards, resetAndRestart, isGameOver } = useGameStore(
        useShallow(state => ({
            difficulty: state.difficulty,
            cards: state.cards,
            resetAndRestart: state.resetAndRestart,
            isGameOver: state.isGameOver,
        }))
    );


    useEffect(() => {
        resetAndRestart();
    }, [difficulty, resetAndRestart]);


    const isMobile = useIsMobile();
    const optimalColumns = useMemo(
        () => getOptimalColumns(cards.length, isMobile),
        [cards.length, isMobile]
    );

    console.log('Game render');
    return (
        <div className={styles.gameContainer}>
            <Header/>
            <Board optimalColumns={optimalColumns} isMobile={isMobile}/>
            {isGameOver && <GameOverModal />}
        </div>
    );
});

export default Game;
