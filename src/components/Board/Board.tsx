// src/components/Board.tsx
import React, {useEffect, useRef} from 'react';
import styles from './Board.module.scss';
import Card from '@/components/Card/Card';
import { useGameStore, Card as CardType } from '@/store/gameStore';
import { getIconSize } from "@/utils/generateCards.ts";

interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
    optimalColumns: number;
    isMobile: boolean;
}

const Board: React.FC<BoardProps> = ({ optimalColumns, isMobile }) => {
    const cards = useGameStore(state => state.cards);
    const tick = useGameStore(state => state.tick);
    const difficulty = useGameStore(state => state.difficulty);
    const boardRef = useRef<HTMLDivElement>(null);
    const isGameOver = useGameStore(state => state.isGameOver);

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

    return (

        <div className={styles.boardWrapper}>
            <div ref={boardRef} className={boardClass}>
                {cards.map((card: CardType) => (
                    <Card key={card.id} {...card} iconSize={iconSize} />
                ))}
            </div>
        </div>
    );
};

export default Board;
