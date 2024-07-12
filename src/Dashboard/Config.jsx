import React from 'react';
import '../assets/css/config.css';

const modelTypes = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-1.0-pro-vision-latest",
  "gemini-1.0-pro"
];

const responseMimeTypes = [
  "text/plain",
  "application/json",
  "application/pdf",
  "image/png"
];

function Config({generationConfig, setGenerationConfig, setModelType}) {
  const handleModelTypeChange = (event) => {
    setModelType(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setGenerationConfig((prevState) => ({
      ...prevState,
      temperature: parseFloat(event.target.value),
    }));
  };

  const handleTopPChange = (event) => {
    setGenerationConfig((prevState) => ({
      ...prevState,
      topP: parseFloat(event.target.value),
    }));
  };

  const handleTopKChange = (event) => {
    setGenerationConfig((prevState) => ({
      ...prevState,
      topK: parseInt(event.target.value),
    }));
  };

  const handleMaxOutputTokensChange = (event) => {
    setGenerationConfig((prevState) => ({
      ...prevState,
      maxOutputTokens: parseInt(event.target.value),
    }));
  };

  const handleResponseMimeTypeChange = (event) => {
    setGenerationConfig((prevState) => ({
      ...prevState,
      responseMimeType: event.target.value,
    }));
  };

  return (
    <div className="container d-flex flex-column align-items-start">
      <div className="itemContainer d-flex">
        <label htmlFor="model-type" className="label">
          Model Type:
        </label>
        <select
          id="model-type"
          className="select "
          value={generationConfig.modelType}
          onChange={handleModelTypeChange}
        >
          {modelTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="itemContainer d-flex">
        <label htmlFor="temperature" className="label">
          Temperature:
        </label>
        <div className="input-box">
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={generationConfig.temperature}
            onChange={handleTemperatureChange}
            id="temperature"
            className="input "
          />
          <span className="value">{generationConfig.temperature.toFixed(1)}</span>
        </div>
      </div>
      <div className="itemContainer d-flex">
        <label htmlFor="topP" className="label">
          topP:
        </label>
        <div className="input-box">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={generationConfig.topP}
            onChange={handleTopPChange}
            id="topP"
            className="input "
          />
          <span className="value">{generationConfig.topP.toFixed(2)}</span>
        </div>
      </div>
      <div className="itemContainer d-flex">
        <label htmlFor="topK" className="label">
          topK:
        </label>
        <div className="input-box">
          <input
            type="range"
            min="0"
            max="256"
            value={generationConfig.topK}
            onChange={handleTopKChange}
            id="topK"
            className="input "
          />
          <span className="value">{generationConfig.topK.toString()}</span>
        </div>
      </div>
      <div className="itemContainer d-flex">
        <label htmlFor="maxOutputTokens" className="label">
          maxOutputTokens:
        </label>
        <div className="input-box">
          <input
            type="range"
            min="100"
            max="20000"
            value={generationConfig.maxOutputTokens}
            onChange={handleMaxOutputTokensChange}
            id="maxOutputTokens"
            className="input "
          />
          <span className="value">{generationConfig.maxOutputTokens.toString()}</span>
        </div>
      </div>
      <div className="itemContainer d-flex">
        <label htmlFor="responseMimeType" className="label">
          Response Type:
        </label>
        <select
          id="responseMimeType"
          className="select "
          value={generationConfig.responseMimeType}
          onChange={handleResponseMimeTypeChange}
        >
          {responseMimeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Config;
