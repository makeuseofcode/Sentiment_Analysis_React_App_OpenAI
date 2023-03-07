
import './App.css';
import React, {useState} from 'react';

function App() {
  const [message, setMessage] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [prompt, setPrompt] = useState("");

  const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

  // 'prompt': "What is the sentiment of this message?" + message,

  const APIBODY ={
    'model': "text-davinci-003",
    'prompt': prompt + message,
    'max_tokens': 60,
    'top_p': 1.0,
    'frequency_penalty': 0.0,
    'presence_penalty': 0.0,
  }

 


  async function handleClick() {
     await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(APIBODY)

    }).then(response => 
    {return response.json()}
    ).then((data) => {
      console.log(data);
      setSentiment(data.choices[0].text.trim());
    }).catch((error) => {
      console.error(error);
    });

};


  return (
    <div className="App">
      <header className="App-header">

        <h2> Sentiment Analysis Application</h2>
        <div className="input">
              <p> Enter a prompt </p>
              <input 
                className="prompt"
                type="text" 
                placeholder="Enter prompt..."
                onChange={(e) => setPrompt(e.target.value)}
              />
              <p> Enter the message to classify </p>
              <textarea
                className="textArea" 
                type="text" 
                placeholder="Type your message..."
                cols={50}
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
              />
         </div>

         <div className="Response">
            <button onClick={handleClick}> Get Message sentiment</button>
              {sentiment !== "" ? <p> The message is {sentiment} </p>  : null }
         </div>
      
      </header>
    </div>
  );
}

export default App;
