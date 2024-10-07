import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function High() {
    const [highest, setHighest] = useState(0);
    const score_data = useSelector((state) => state.score.value);

    useEffect(() => {
        const savedHighest = localStorage.getItem("highestScore");
        if (savedHighest) {
            setHighest(parseInt(savedHighest, 10)); // Parse the saved value as an integer
        }
    }, []); // This effect runs only once when the component is mounted

    // Update the highest score if the score_data exceeds it and save it to localStorage
    useEffect(() => {
        if (score_data > highest) {
            setHighest(score_data);
            localStorage.setItem("highestScore", score_data); // Save to localStorage
        }
    }, [score_data, highest]);
    return (
        <div className="d-flex justify-content-center align-items-center bg-dark vh-100 text-white">
            <div className="text-center w-100">
                <h1 className="display-4">
                    Highest Score is
                    <span className="text-danger"> {highest}</span>
                </h1>
            </div>
        </div>
    );
}

export default High;
