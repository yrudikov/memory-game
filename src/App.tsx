import React from 'react';
import Game from './Game';
import styles from './styles/App.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Game />
        </div>
    );
};

export default App;