import React from "react";
import { Col, Row } from "react-bootstrap";
import { base_url } from "../../API";
import "./style.css";

// components
import Profile from "../../components/Profile";
import Container from "../../components/Container";
import ExamCard from "../../components/ExamCard";
import ReportCard from "../../components/ReportCard";

const Home = () => {
  const [load, setLoad] = React.useState(false);
  const [examIDs, setExamIDs] = React.useState([]);
  const [completedIDs, setCompletedIDs] = React.useState([]);
  const [available_exams, setAvailableExams] = React.useState([]);
  const [completed_exams, setCompletedExams] = React.useState([]);
  const [result, setResult] = React.useState([
    <Row>
      <Col lg="3" md="3" sm="0"></Col>
      <Col lg="3" md="3" sm="0">
        Correct
      </Col>
      <Col lg="3" md="3" sm="0">
        Wrong
      </Col>
      <Col lg="3" md="3" sm="0">
        Marks Obtain
      </Col>
    </Row>,
  ]);

  React.useEffect(() => {
    if (!load) {
      // fetch(base_url + "/incomplete/exams", {
      //   headers: {
      //     Authorization:
      //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoic3ViaG9AZW1haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9LCJpYXQiOjE2MTUyNzI1MjR9.V0IXVRYm7-KuhSzp3TRsBZ76oyHjs-kUvaRntWgJZ0c",
      //   },
      // })
      //   .then((data) => data.json())
      //   .then((json) => setExamIDs(json["examIDs"]["incompleteExam"]));

      // examIDs.map((data) => {
      //   fetch(base_url + "/incomplete/exam?", {
      //     params: {
      //       id: data,
      //     },
      //     headers: {
      //       Authorization:
      //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoic3ViaG9AZW1haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9LCJpYXQiOjE2MTUyNzI1MjR9.V0IXVRYm7-KuhSzp3TRsBZ76oyHjs-kUvaRntWgJZ0c",
      //     },
      //   })
      //     .then((data) => data.json())
      //     .then((json) =>
      //       setAvailableExams(
      //         available_exams.concat(
      //           <ExamCard exam_id="" exam_name="" full_marks="" time="" />
      //         )
      //       )
      //     );
      // });

      fetch(base_url + "/completed/exams", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoic3ViaG9AZW1haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9LCJpYXQiOjE2MTUyNzI1MjR9.V0IXVRYm7-KuhSzp3TRsBZ76oyHjs-kUvaRntWgJZ0c",
        },
      })
        .then((data) => data.json())
        .then((json) => setCompletedIDs(json.examIDs.completedExam));
      console.log(completedIDs);
      setCompletedExams(
        completed_exams.concat(
          completedIDs.map((data, index) => (
            <ReportCard key={index} exam_name={data.title} />
          ))
        )
      );
      setLoad(true);
    }
  }, []);

  return (
    <div style={{ width: "98%" }}>
      <Row>
        <Col lg="3" md="4" sm="12">
          {/* TODO, use api */}
          <Profile
            name="Student name"
            roll="ROLL0001"
            email="student@email.com"
            department="CSE"
          />
        </Col>
        {console.log("hello" + completedIDs)}
        <Col className="dashboard" lg="9" md="8" sm="12">
          <Container header="Available Exams" body={available_exams} />
          <Container header="Results" body={completed_exams} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
