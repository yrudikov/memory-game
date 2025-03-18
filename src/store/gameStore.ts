import { create } from 'zustand';
import { IconType } from 'react-icons';

export interface Card {
    id: number;
    icon: IconType;
}

export interface GameState {
    cards: Card[];

    setCards: (cards: Card[]) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    cards: [],

    setCards: (cards: Card[]) => set({cards}),
}))