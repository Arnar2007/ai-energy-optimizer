function AICoach({ tip }) {
    return (
      <div className="panel coach-panel">
        <p className="eyebrow">AI Coach</p>
        <h2>Smart recommendation</h2>
        <p className="coach-text">{tip}</p>
  
        <div className="question-box">
          <p>Try asking later:</p>
          <span>“Why was my usage high this week?”</span>
        </div>
      </div>
    );
  }
  
  export default AICoach;