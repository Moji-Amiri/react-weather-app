import { useEffect, useState } from 'react'
import './App.css'
import TopButtons from './components/TopButtons'
import Input from './components/Input'
import TimeAndLocation from './components/TimeAndLocation'
import TemptureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/weatherService'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let initLoc = localStorage.getItem('city') ? localStorage.getItem('city') : 'london'
  const [query, setQuery] = useState({ q: initLoc });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      // const message = query.q ? query.q : "current location.";
      // toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        )

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 27 : 78;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };


  return (
    <div className="App">
      <div className={`md:px-32 md:rounded-lg mx-auto max-w-screen-md md:mt-6 md:py-5 py-1 px-8 bg-gradient-to-br  
      h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Input setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemptureAndDetails weather={weather} />

            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}
        <ToastContainer autoClose={1750} theme="colored" newestOnTop={true} />
      </div>
    </div>
  );
}

export default App;
