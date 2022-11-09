import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { CardList, Form } from './Card';
import { StarMatch } from './StarMatch';

class App extends React.Component {
    //const [counter, setCounter] = useState(0);
    //const [gameId, setGameId] = useState(1);

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         profiles: testData
    //     };
    // }

    state = {
        profiles: [],
        gameId: 1
    };

    // onAddProfile = (newProfile) => {
    //     this.setState(prevState => ({
    //         profiles: [...prevState.profiles, newProfile]
    //     }));
    // }

    // render() {
    //     return (
    //         <div>
    //             <Form onAdd={this.onAddProfile} />
    //             <CardList profiles={this.state.profiles} />
    //         </div>
    //     );
    // }

    render() {

        return (
            <div style={{ alignSelf: 'center' }}>
                <StarMatch key={this.state.gameId} startNewGame={() => this.setState({
                    gameId: this.state.gameId + 1
                })}></StarMatch>
            </div>
        );
    }
}

export default App;