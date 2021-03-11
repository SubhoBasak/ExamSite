import React from "react";
import { Col, Row } from "react-bootstrap";
import { base_url } from "../../API";
import { useHistory } from "react-router-dom";
import "./style.css";

// components
import Profile from "../../components/Profile";
import Container from "../../components/Container";
import ExamCard from "../../components/ExamCard";
import ReportCard from "../../components/ReportCard";

const Home = () => {
  const [load, setLoad] = React.useState(false);
  const [completedIDs, setCompletedIDs] = React.useState([]);
  const [incompletedIDs, setIncompletedIDs] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    if (!load) {
      fetch(base_url + "/incomplete/exams", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((data) => data.json())
        .then((json) => setIncompletedIDs(json.examIDs.incompleteExam));
      fetch(base_url + "/completed/exams", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((data) => data.json())
        .then((json) => setCompletedIDs(json.examIDs.completedExam));
      setLoad(true);
    }
  }, []);

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

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
        <Col className="dashboard" lg="9" md="8" sm="12">
          <Container
            key="cnt-0"
            header="Available Exams"
            body={incompletedIDs.map((data, index) => {
              <ExamCard key={"aval_exam_" + index} exam_name={data.title} />;
            })}
          />
          <Container
            key="cnt-1"
            header="Results"
            body={[
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
            ].concat(
              completedIDs.map((data, index) => (
                <ReportCard
                  key={"report_card_" + index}
                  exam_name={data.title}
                />
              ))
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
