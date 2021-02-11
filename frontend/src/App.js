import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import { render } from 'react-dom';
import SurveyAnswers from './SurveyAnswers';

function App() {

  const [topics, setTopics] = useState([]);
  const [submits, setSubmits] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [topicQuestion, setTopicQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(null);
  const headers = {"Access-Control-Allow-Origin": "*"};

  useEffect(() => {
    loadTopics();
    loadSubmits();
  }, [selectedTopic]);

  function sendSurvey () {
    const survey = {'topicName': topicInput, 'topicQuestion': topicQuestion}
    Axios.post('http://localhost:8080/controller/postTopic', survey).then((response) => {
      window.alert("Successfully Saved!");
      setTopicInput("");
      setTopicQuestion("")
      loadTopics();
    })
  }

  function loadTopics() {
    Axios.get('http://localhost:8080/controller/getTopics').then(response => {
      console.log(response);
      setTopics(response.data)
    })
  }

  function loadSubmits() {
    Axios.get('http://localhost:8080/controller/getSubmits').then(response => {
      console.log(response);
      setSubmits(response.data)
    })
  }

  function sendSubmits () {
    const submit = {'score': score, 'feedback': feedback, 'topicId': selectedTopic.id}
    Axios.post('http://localhost:8080/controller/postSubmits', submit).then((response) => {
      window.alert("Successfully Saved!");
      setScore(null);
      setFeedback("");
      loadSubmits();
    })
  }

  function scoreChange(number) {
    if (score == null) {
      setScore(number)
      document.getElementById("score" + number).style.backgroundColor= "red";
    }
  }

  const renderList = () => {
    const submitAnswers = submits.filter(submit => submit.topicId === selectedTopic.id);
    if (submitAnswers && submitAnswers.length > 0){
      return (
        <div>
            <table style={{width: "100%"}}>
              <tr>
                <th>SubmitId</th>
                <th>Score</th>
                <th>Feedback</th>
              </tr>
              {submitAnswers.map(answer => 
                <tr>
                  <th>{answer.submitId}</th>
                  <th>{answer.score}</th>
                  <th>{answer.feedback}</th>
                </tr>
              )}
            </table>
          </div>
      )
    }

  }

  return (
    <div style={{ textAlign: 'center' }}>

      <div className="createSurvey">
        <h1 style={{ textAlign: 'center' }}>Create Survey</h1>
        <div className='surveyField'>
          <label htmlFor="topic">Topic</label><br />
          <input id="topic" value={topicInput} onChange={(i) => setTopicInput(i.target.value)} />
        </div>
        <div className='surveyField'>
          <label htmlFor="question">Question</label><br />
          <textarea id="question" rows="10" cols="50" value={topicQuestion} onChange={(i) => setTopicQuestion(i.target.value)}></textarea>
          {/* <input className="question" id="question" onChange={(i) => setTopicQuestion(i.target.value)} /> */}
        </div>
        <button onClick={sendSurvey}>Create Survey</button>
      </div>

      {topics.length > 0 &&
        <div>
          <div className="submitSurvey">
            <h1 style={{ textAlign: 'center' }}>Submit and List Survey</h1>
            <select placeholder="Choose Option" name="bilgi" onChange={(i) => setSelectedTopic(topics.find(topic => topic.id == i.target.value))}>
              <option value="" disabled selected >Please Choose...</option>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.topicName}</option>
              ))}
            </select>

            {selectedTopic && <div>
              <h4>{selectedTopic.topicQuestion}</h4>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number =>
                <button disabled={score} id={'score' + number} className="score" onClick={() => scoreChange(number)}>{number}</button>
              )}
            </div>
            }
            <h4 style={{ textAlign: 'center' }}>What is the most important reason for your score?</h4>
            <textarea rows="12" cols="80" value={feedback} onChange={(i) => setFeedback(i.target.value)}></textarea>
            <div> <button onClick={() => sendSubmits()}>Submit Survey</button></div>
          </div>

          <br/><br/>
          <SurveyAnswers submits={submits} selectedTopic={selectedTopic}></SurveyAnswers>
          <br/><br/>
        </div>
      }
      <div style={{ width: "100%" }}></div>
    </div>
  );
}

export default App;
