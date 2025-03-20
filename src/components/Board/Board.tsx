// src/components/Board.tsx
import React, {useEffect, useRef, memo} from 'react';
import styles from './Board.module.scss';
import Card from '@/components/Card/Card';
import {useGameStore, Card as CardType} from '@/store/gameStore';
import { getIconSize } from "@/utils/generateCards.ts";
import {useShallow} from 'zustand/shallow';

interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
    optimalColumns: number;
    isMobile: boolean;
}

const Board: React.FC<BoardProps> = memo( ({ optimalColumns, isMobile }) => {
    const { cards, tick, difficulty, isGameOver } = useGameStore(
        useShallow((state) => ({
            cards: state.cards,
            tick: state.tick,
            difficulty: state.difficulty,
            isGameOver: state.isGameOver,
        }))
    );

    const boardRef = useRef<HTMLDivElement>(null);
    const boardClass = `${styles.board} ${styles[`board-${difficulty}`]}`;

    useEffect(() => {
        if (boardRef.current) {
            boardRef.current.style.setProperty('--columns', String(optimalColumns));
        }
    }, [optimalColumns, isMobile]);


    useEffect(() => {
        if (!isGameOver) {
            const timer = setInterval(() => tick(), 1000);
            return () => clearInterval(timer);
        }
    }, [tick, isGameOver]);

    const iconSize = getIconSize(difficulty, isMobile);

    console.log('Board render');

    return (

        <div className={styles.boardWrapper}>
            <div ref={boardRef} className={boardClass}>
                {cards.map((card: CardType) => (
                    <Card key={card.id} {...card} iconSize={iconSize} />
                ))}
            </div>
        </div>
    );
});

export default Board;
