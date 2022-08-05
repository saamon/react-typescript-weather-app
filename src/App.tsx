import React, {useState} from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Results from "./components/Results";
import './App.css';

type ResultsStateType = {
    country: string;
    cityName: string;
    temperature: string;
    conditionText: string;
    icon: string;
}

function App() {
    const [city, setCity] = useState<string>("");
    const [results, setResults] = useState<ResultsStateType>({
        country: "",
        cityName: "",
        temperature: "",
        conditionText: "",
        icon: ""
    });

    const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`https://api.weatherapi.com/v1/current.json?key=cdd4739fe800460cb29160414220508&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                setResults({
                    cityName: data.location.cityName,
                    conditionText: data.current.condition.text,
                    country: data.location.country,
                    icon: data.current.condition.icon,
                    temperature: data.location.temp_c
                })
            })
    }

        return (
            <div className="wrapper">
                <div className="container">
                <Title/>
                <Form setCity={setCity} getWeather={getWeather}/>
                <Results results={results}/>
                </div>
            </div>
        );
    }


export default App;
