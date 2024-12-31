import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <div>
        <h1>
          Meet <span>Llemval</span>
        </h1>
        <h3>A simplified way to compare multiple LLMs in context of your needs.</h3>
      </div>
      <button>
        <Link to="/Dashboard">Get Started</Link>
      </button>
    </>
  );
}
