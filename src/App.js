import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const StyledButton = styled(Button)`
  font-size: 1em;
  margin: 1em;
  padding: 4px 5px;
  border-radius: 3px;
`;

export default function App() {
  const [place, setPlace] = useState("");
  let [weatherContent, setWeatherContent] = useState("");
  let wdata;
  const getPlace = (e) => {
    setPlace(e.target.value);
  };
  const googleApi = async (placeName) => {
    let latLong,
      place = placeName;
    latLong = await axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=a3d9db842e7241ebbbf07e0a219e02f8`
      )
      .then((response) => response.data.results[0].geometry)
      .catch((e) => console.log(e));
    return latLong;
  };

  const weatherData = async () => {
    let weatherDetails;
    const latLong = await googleApi(place);
    weatherDetails = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latLong.lat}&lon=${latLong.lng}&appid=bfc7e3515b286d62d95bf81265bff46c`
      )
      .then((response) => response.data)
      .catch((e) => console.log(e));
    // console.log(weatherContent);
    return weatherDetails;
  };

  const clickHandler = async () => {
    const data = await weatherData();
    wdata = data;
  };
  return (
    <div className="App">
      <Row>
        <h1>Hello CodeSandbox</h1>
        <Col lg={8}>
          <input type="text" onChange={getPlace} />
          <StyledButton onClick={clickHandler}>Go</StyledButton>
          {clickHandler}
        </Col>
      </Row>
      {!!wdata ? (
        <Row>
          <Card>
            <Card.Body>
              <p>Temperature: {wdata["daily"][0].temp}</p>
              <p>RainFall: {wdata["daily"][0].rain}</p>
            </Card.Body>
          </Card>
        </Row>
      ) : null}
    </div>
  );
}
