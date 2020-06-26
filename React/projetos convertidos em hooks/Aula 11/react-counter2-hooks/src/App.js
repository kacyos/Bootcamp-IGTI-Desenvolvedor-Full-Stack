import React, { useState, Fragment } from "react";
import Counter from "./components/counter/counter";
import Counter2 from "./components/counter/counter2";
import Band from "./components/Band";

export default function App() {
  const [currentCounter, setCurrenteCounter] = useState(3);
  const [steps, setSteps] = useState(0);

  const handleCount = (clickType) => {
    const counter = clickType === "+" ? currentCounter + 1 : currentCounter - 1;

    setCurrenteCounter(counter);
    setSteps(steps + 1);
  };

  return (
    <Fragment>
      <h3>Band</h3>

      <Band />

      <h3>Counter</h3>
      <Counter />
      <Counter />
      <Counter />
      <h3>Counter2</h3>
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
    </Fragment>
  );
}
