
import { create } from 'zustand';
import { IconType } from 'react-icons';
import { generateCards } from '@/utils/generateCards';

export interface Card {
    id: number;
    icon: IconType;
    isFlipped: boolean;
    isMatched: boolean;
}


export type Difficulty = 'easy' | 'medium' | 'hard' | 'banana';

export interface GameResult {
    attempts: number;
    points: number;
    time: number;
    difficulty: Difficulty;
    date: string;
}


export interface GameState {
    cards: Card[];
    attempts: number;
    time: number;
    points: number;
    revealedCards: number[];
    difficulty: Difficulty;
    name: string | null;
    isGameOver: boolean;


    setCards: (cards: Card[]) => void;
    flipCard: (id: number) => void;
    incrementAttempts: () => void;
    incrementPoints: () => void;
    setDifficulty: (difficulty: Difficulty) => void;
    resetGame: () => void;
    tick: () => void;
    setRevealedCards: (cards: number[]) => void;
    setName: (name: string | null) => void;
    saveResult: () => void;
    resetAndRestart: () => void;
}


export const useGameStore = create<GameState>((set, get) => ({
    cards: [],
    attempts: 0,
    time: 0,
    points: 0,
    revealedCards: [],
    difficulty: 'easy',
    name: null,
    isGameOver: false,

    setName: (name) => set({name}),


    setCards: (cards: Card[]) => set({ cards }),


    flipCard: (id: number) => {
        const { cards, revealedCards, incrementAttempts, incrementPoints, saveResult } = get();


        if (revealedCards.length === 2) return;


        const cardIndex = cards.findIndex(card => card.id === id);

        if (cards[cardIndex].isFlipped || cards[cardIndex].isMatched) return;


        const updatedCards = cards.map(card =>
            card.id === id ? { ...card, isFlipped: true } : card
        );
        const newRevealedCards = [...revealedCards, id];
        set({ cards: updatedCards, revealedCards: newRevealedCards });


        if (newRevealedCards.length === 2) {
            incrementAttempts();
            setTimeout(() => {
                const [firstId, secondId] = newRevealedCards;
                const firstCard = updatedCards.find(card => card.id === firstId);
                const secondCard = updatedCards.find(card => card.id === secondId);
                if (firstCard && secondCard) {
                    if (firstCard.icon === secondCard.icon) {
                        incrementPoints();

                        const matchedCards = updatedCards.map(card =>
                            card.id === firstId || card.id === secondId
                                ? { ...card, isMatched: true }
                                : card
                        );
                        set({ cards: matchedCards, revealedCards: [] });
                        if (matchedCards.every(card => card.isMatched)) {
                            saveResult();
                        }
                    } else {

                        const resetCards = updatedCards.map(card =>
                            card.id === firstId || card.id === secondId
                                ? { ...card, isFlipped: false }
                                : card
                        );
                        set({ cards: resetCards, revealedCards: [] });
                    }
                }
            }, 1000);
        }
    },



    incrementAttempts: () => set(state => ({ attempts: state.attempts + 1 })),

    incrementPoints: () => set(state => ({ points: state.points + Math.round(1000 / state.attempts) })),


    setDifficulty: (difficulty: Difficulty) => set({ difficulty }),


    resetGame: () => set({ attempts: 0, time: 0, revealedCards: [], points: 0, isGameOver: false }),


    tick: () => set(state => ({ time: state.time + 1 })),


    setRevealedCards: (cards: number[]) => set({ revealedCards: cards }),

    saveResult: () => {
        const { attempts, time, difficulty, points } = get();
        const result: GameResult = {
            attempts,
            points,
            time,
            difficulty,
            date: new Date().toISOString(),
        };
        const historyString = localStorage.getItem('gameHistory');
        const history = historyString ? JSON.parse(historyString) : [];
        history.push(result);
        localStorage.setItem('gameHistory', JSON.stringify(history));

        set({ isGameOver: true });
    },
    resetAndRestart: () => {
        get().resetGame();
        const { difficulty } = get();
        const newCards = generateCards(difficulty);
        set({ cards: newCards });
    },
}));

