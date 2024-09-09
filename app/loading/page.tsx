"use client";

import { useEffect, useState } from "react";
import { Button } from "@mui/joy";

export default function Page() {
  return (
    <>
      <div>
        <ModalComponent />
      </div>
      <div>
        {/* DataComponent will rerender every time Page rerenders */}
        <DataComponent />
      </div>
    </>
  );
}

const ModalComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
    <Button onClick={() => {
      console.log('click')
      setShowModal(!showModal)
    }}>
    Toggle Modal
    </Button>
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        border: "1px solid #000",
        backgroundColor: "#fff",
        zIndex: 1000,
        display: showModal ? 'block' : 'none'
      }}
    >
      <h1>Modal Component</h1>
    </div>
    </>
  );
};

// Simulate a slow component with rerender on Page state change
const DataComponent = () => {
  // Simulate an expensive calculation
  const expensiveCalculation = () => {
    console.log("Starting expensive calculation...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    console.log("Expensive calculation complete");
    return result;
  };

  // UseEffect will trigger this calculation every time DataComponent rerenders
  useEffect(() => {
    const result = expensiveCalculation();
    console.log("Result of calculation: ", result);
  });

  return (
    <div>
      <h1>Data Component</h1>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          style={{
            padding: "10px",
            border: "1px solid #000",
            margin: "10px",
          }}
        >
          Item {index}
        </div>
      ))}
    </div>
  );
};

