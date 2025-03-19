import { Card } from '@/store/gameStore';
import { icons } from '@/assets/icons';

const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

 export const generateCards = (difficulty: string): Card[] => {
    let numPairs = 0;
    switch (difficulty) {
        case 'easy':
            numPairs = 3;
            break;
        case 'medium':
            numPairs = 6;
            break;
        case 'hard':
            numPairs = 10;
            break;
        case 'banana':
            numPairs = 21;
            break;
        default:
            numPairs = 3;
    }

    if (numPairs > icons.length) {
        console.error('Not enough icons for the selected difficulty level');
        return [];
    }

     const shuffledIcons = shuffleArray(icons);
     const selectedIcons = shuffledIcons.slice(0, numPairs);

    let newCards: Card[] = [];
    let id = 0;
    selectedIcons.forEach(icon => {
        newCards.push({ id: id++, icon, isFlipped: false, isMatched: false });
        newCards.push({ id: id++, icon, isFlipped: false, isMatched: false });
    });

    return newCards.sort(() => Math.random() - 0.5);
};

export const getOptimalColumns = (totalCards: number, isMobile: boolean = false): number => {
    let columns = Math.ceil(Math.sqrt(totalCards));
    if (isMobile && columns > 1) {
        columns = columns - 1;
    }
    return columns;
};
