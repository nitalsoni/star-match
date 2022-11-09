import { useEffect, useState } from 'react';
import './css/style.css'
import { utils, colors } from './Helper/utils';

const PlayNumber = (props) => {
    //console.log('rendering the component ....');
    return (
        <button
            className='number'
            style={{ backgroundColor: colors[props.status] }}
            onClick={() => props.onClick(props.number, props.status)}>{props.number}
        </button>
    )
};

const StarDisplay = props => (
    <>
        {
            utils.range(1, props.count).map((starId) => {
                return <div key={starId} className='star'></div>
            })
        }
    </>
);

const PlayAgain = props => (
    <div>
        <h1
            style={{ color: props.status == 'won' ? 'green' : 'red' }}>
            {
                props.status === 'won' ? 'Nice' : 'Game Over'
            }
        </h1>
        <button onClick={() => props.restart()}>Play again</button>
    </div>
);

export const StarMatch = (props) => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(15);

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsOver = availableNums.length == 0;

    const gameStatus = gameIsOver
        ? 'won'
        : secondsLeft == 0 ? 'lost' : 'active';

    console.log(`game status is ${gameStatus}`);
    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }

        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }

        return 'available';
    }

    // const restartGame = () => {
    //     setAvailableNums(utils.range(1, 9));
    //     setCandidateNums([]);
    //     setStars(utils.random(1, 9));
    // }

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus == 'used' || gameStatus != 'active') {
            return;
        }

        let newCandidateNums = currentStatus === 'available' ?
            candidateNums.concat(number)
            : candidateNums.filter(cn => cn != number);

        if (utils.sum(newCandidateNums) != stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));

            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }

    return (
        <div>
            <div className='game'>
                <div className="left">
                    {
                        gameStatus != 'active' ?
                            <PlayAgain restart={props.startNewGame} status={gameStatus} />
                            :
                            <StarDisplay count={stars}></StarDisplay>
                    }
                </div>

                <div className="right">
                    {
                        utils.range(1, 9).map((i) => {
                            return <PlayNumber
                                key={i}
                                number={i}
                                onClick={onNumberClick}
                                status={numberStatus(i)} />
                        })
                    }
                </div>
            </div>
            <div>
                <h3>Time Remaining: {secondsLeft}</h3>
            </div>
        </div>
    );
}
