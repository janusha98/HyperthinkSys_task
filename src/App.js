import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import _ from "lodash";

export default function App() {
  const [place, setPlace] = useState("");
  const [weatherContent, setWeatherContent] = useState({});
  console.log(weatherContent);
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
    return setWeatherContent(weatherDetails);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Edit to see some magic happen!</h2>
      <input type="text" onChange={getPlace} />
      <Button onClick={weatherData}>Click</Button>
      {_.isEmpty(weatherContent)
        ? null
        : Object.keys(weatherContent).map((data, id) => (
            <Card key={id}>
              <Card.Body>
                <p>{data.daily[0].rain}</p>
                <p>{data.daily[0].temp}</p>
              </Card.Body>
            </Card>
          ))}
    </div>
  );
}
