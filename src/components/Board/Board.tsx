// src/components/Board.tsx
import React, {useEffect, useRef} from 'react';
import styles from './Board.module.scss';
import Card from '@/components/Card/Card';
import { useGameStore, Card as CardType } from '@/store/gameStore';

interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
    optimalColumns: number;
    isMobile: boolean;
}

const Board: React.FC<BoardProps> = ({ optimalColumns, isMobile }) => {
    const cards = useGameStore(state => state.cards);
    const tick = useGameStore(state => state.tick);
    const difficulty = useGameStore(state => state.difficulty);
    const boardRef = useRef<HTMLDivElement>(null);

    const boardClass = `${styles.board} ${styles[`board-${difficulty}`]}`;

    useEffect(() => {
        if (boardRef.current) {
            boardRef.current.style.setProperty('--columns', String(optimalColumns));
        }
    }, [optimalColumns, isMobile]);

    // Запускаем таймер, обновляющий время каждую секунду
    useEffect(() => {
        const timer = setInterval(() => tick(), 1000);
        return () => clearInterval(timer);
    }, [tick]);

    return (

        <div className={styles.boardWrapper}>
            <div ref={boardRef} className={boardClass}>
                {cards.map((card: CardType) => (
                    <Card key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
};

export default Board;
