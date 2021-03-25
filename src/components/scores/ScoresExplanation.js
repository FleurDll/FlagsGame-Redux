import React, { useState } from "react";

const ScoresExplanation = ({ setShowExplanation }) => {
    const [hover, setHover] = useState(false);
    return (
        <>
            <i
                onClick={() => setShowExplanation(false)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={`${hover && "yellow "} close icon`}
            ></i>
            <p>With each game played, score = points.</p>
            <p>But, depending on the success rate, you get a bonus or a penalty.</p>
            <div className="score-schema">
                <table>
                    <tbody>
                        <tr className="schema-percentage">
                            <td>0%</td>
                            <td>25%</td>
                            <td>50%</td>
                            <td>75%</td>
                            <td>100%</td>
                        </tr>
                    </tbody>
                </table>
                <div className="interval-score"></div>
                <table>
                    <tbody>
                        <tr className="schema-points">
                            <td>-5</td>
                            <td>-2</td>
                            <td>+2</td>
                            <td>+5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>And to reward the strongest among us : <br /> 100% = +10 points.</p>
            <p>Example : you got 14/20. Your success rate is 70%. Therefore, you won 14 + 2 = 19 points.</p>
        </>
    );
};

export default ScoresExplanation;