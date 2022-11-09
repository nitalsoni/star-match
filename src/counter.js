import { useState } from 'react';
function Button(args) {
  return <button onClick={() => args.clickEvt(args.increment)}>+{args.increment}</button>;
}

function Display(args) {
  return <div>{args.message}</div>;
}

function ResetButton(args) {
  return <button onClick={() => args.reset()}>Reset</button>
}

function counterComp() {
  const [counter, setCounter] = useState(0);
  const handleClick = (step) => setCounter(counter + step);
  const resetClick = () => setCounter(0);
  return <div>
    <Button clickEvt={handleClick} increment={1} />
    <Button clickEvt={handleClick} increment={2} />
    <Button clickEvt={handleClick} increment={5} />
    <Button clickEvt={handleClick} increment={10} />
    <Display message={counter} />

    <ResetButton reset={resetClick} />
  </div>;
}

export default counterComp;
