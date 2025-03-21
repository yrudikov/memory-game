import React, {useEffect, useState} from 'react';
import styles from './utilsGameComponents.module.scss';
import ResetButton from "@/components/utilsGameComponents/resetButton";
import LevelUpButton from "@/components/utilsGameComponents/levelUpButton";
import content from '@/assets/content.json'
import { GameResult } from "@/store/gameStore.ts";
import { formatDate } from "@/utils/generateCards.ts";


const GameOverModal: React.FC = () => {
    const [lastResult, setLastResult] = useState<GameResult | null>(null);

    console.log('GameOverModal render');
    useEffect(() => {
        const historyString = localStorage.getItem('gameHistory');
        if (historyString) {
            try {
                const history = JSON.parse(historyString) as GameResult[];
                if (history.length > 0) {
                    setLastResult(history[history.length - 1]);
                }
            } catch (error) {
                console.error("Parsing Error", error);
            }
        }
    }, []);



    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <h2>{content.game.gameOverModal.congrats}</h2>
                <p>{content.game.gameOverModal.gameOver}</p>
                <div className={styles.modalResults}>
                    <span>{content.header.attempts} {lastResult?.attempts}</span>
                    <span>{content.header.points} {lastResult?.points}</span>
                    <span>{content.timer.time} {lastResult?.time} {content.timer.seconds}</span>
                    <span>{content.header.points} {formatDate(lastResult?.date)}</span>
                </div>
                <div className={styles.buttonWrapper}>
                <ResetButton/>
                <LevelUpButton/>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;