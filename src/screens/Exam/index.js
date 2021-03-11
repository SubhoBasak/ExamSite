import React from "react";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { base_url } from "../../API";
import "./style.css";

// components
import Question from "../../components/Question";
import QuestionNav from "../../components/QuestionNav";

const Exam = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [all_question, setAllQuestion] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [seenStatus, setSeenStatus] = React.useState([1, 0, 0]);
  const [totalQuestion, setTotalQuestion] = React.useState(3);
  const [answers, setAnswer] = React.useState([-1, -1, -1]);
  const [time, setTime] = React.useState(900);

  const history = useHistory();

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  React.useEffect(() => {
    fetch(base_url + "", {
      headers: {
        params: {
          Authorization: localStorage.getItem("token"),
        },
      },
    });
  });

  setTimeout(() => {
    if (time === 0) {
      history.push("/");
    } else if (time > 0) {
      setTime(time - 1);
    }
  }, 999);

  const submit_answer = () => {
    console.log("answer submitted");
  };

  const loading_screen = (
    <div
      className="d-flex justify-content-center align-item-center"
      style={{ height: "100vh" }}
    >
      <h1>Loading...</h1>
    </div>
  );

  const question_paper = (
    <Row style={{ width: "98%" }}>
      <Col className="bg-primary" lg="3" md="3" sm="12">
        <QuestionNav
          all_question={all_question}
          setCurrentQuestion={setCurrentQuestion}
          seenStatus={seenStatus}
          setSeenStatus={setSeenStatus}
          answers={answers}
          time={time}
        />
      </Col>
      <Col lg="9" md="9" sm="12">
        <Question
          // question={all_question[currentQuestion].question}
          // option_a={all_question[currentQuestion].options[0].a}
          // option_b={all_question[currentQuestion].options[0].b}
          // option_c={all_question[currentQuestion].options[0].c}
          // option_d={all_question[currentQuestion].options[0].d}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          seenStatus={seenStatus}
          setSeenStatus={setSeenStatus}
          totalQuestion={totalQuestion}
          answers={answers}
          setAnswer={setAnswer}
          submit_answer={submit_answer}
        />
      </Col>
    </Row>
  );

  return <div>{loaded ? question_paper : loading_screen}</div>;
};

export default Exam;
