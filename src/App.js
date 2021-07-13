import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function App() {
  const [place, setPlace] = useState("");
  const [weatherContent, setWeatherContent] = useState({});
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
    const latLong = await googleApi(place);
    let weatherDetails;
    weatherDetails = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latLong.lat}&lon=${latLong.lng}&appid=bfc7e3515b286d62d95bf81265bff46c`
      )
      .then((response) => setWeatherContent(response.data))
      .catch((e) => console.log(e));
    return <DisplayWeatherContent {...weatherContent} />;
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Edit to see some magic happen!</h2>
      <input type="text" onChange={getPlace} />
      <Button onClick={weatherData}>Click</Button>
    </div>
  );
}
