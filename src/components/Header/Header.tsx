import React, {memo} from 'react';
import styles from './Header.module.scss';
import DifficultySelector from '@/components/utilsGameComponents/DifficultySelector';
import ResetButton from "@/components/utilsGameComponents/resetButton.tsx";
import Timer from "@/components/Header/Timer.tsx";
import StatsHeader from "@/components/Header/StatsHeader.tsx";

const Header: React.FC = memo( () => {

    console.log('Header render');

    return (
        <header className={styles.gameHeader}>

            <ResetButton />
            <DifficultySelector />
            <div className={styles.statsWrapper}>
                <StatsHeader />
                <Timer/>
            </div>
        </header>
    );
});

export default Header;
