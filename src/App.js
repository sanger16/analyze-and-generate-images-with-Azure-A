import React from 'react';
/* Import analyseImage */
import {analyseImage, isConfigured} from './azure-image-analysis.js';



//Create a component that take the URL as input and return the JSON response of the Computer Vision API whem the Analyse button is clicked
const ImageAnalysis = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const url = document.getElementById('url').value;
      const response = await analyseImage(url);
      response.url = url;
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!data) return (
    <div>
      <h1>Computer Vision</h1>
      <InputUrl></InputUrl>
      <Button handleClick={handleGenerate} text='Analyse' ></Button>
      <Button text='Generate' ></Button>
    </div>
  );

  
  
  return (
    <div>
      <h1>Computer Vision</h1>
      <InputUrl></InputUrl>
      <Button handleClick={handleGenerate} text='Analyse' ></Button>
      <Button text='Generate' ></Button>
      <h1>Computer Vision Analysis</h1>
      <img src={data.url} alt=''></img>
      <span>{JSON.stringify(data, null, 2)}</span>
    </div>
  );
}


const InputUrl = () => {
  return(<input type='text' name='url' id='url' placeholder='Enter URLs to analyze or textual promtp to generate an image'></input>)
}

const Button = ({ handleClick, text }) => {
  return(<button onClick={handleClick} id={ text }>{ text }</button>)
}

function App() {
  const values = {analyseButton: 'Analyse', generateButton: 'Generate'};
  console.log(isConfigured());
  if (isConfigured() === false) {
    return <p>Please set your environment variables for your Computer Vision subscription key and endpoint.</p>;
} 
  return (
  <>
    <ImageAnalysis ></ImageAnalysis>
  </>
  );
}

export default App;
