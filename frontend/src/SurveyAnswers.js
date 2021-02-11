import React, { useEffect, useState } from 'react';
import "./SurveyAnswers.css";

const SurveyAnswers = (props) => {
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        setAnswers(props.submits.filter(submit => submit.topicId === props.selectedTopic.id));
        console.log(props)
    }, [props.submits, props.selectedTopic])

    if (answers && answers.length > 0){
        return (
            <div>
                <table style={{ width: "100%" }}>
                    <tr>
                        <th>SubmitId</th>
                        <th>Score</th>
                        <th>Feedback</th>
                    </tr>
                    {answers.map(answer =>
                        <tr>
                            <td>{answer.submitId}</td>
                            <td>{answer.score}</td>
                            <td>{answer.feedback}</td>
                        </tr>
                    )}
                </table>
            </div>
        );
    } else {

        return null
    }
};

export default SurveyAnswers;