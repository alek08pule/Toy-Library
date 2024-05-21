import LibraryBackground from "../Assets/LibraryBackground.png";
import BoyAndTent from "../Assets/BoyAndTent.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homePage">
      <img src={LibraryBackground} alt="Library Toy" />
      <div className="home-title">
        <h1>
          Imagine a library,
          <br />
          but for toys
        </h1>
        <h3>Where every wish is real!</h3>
        <p>
          With over 200 magical playthings waiting just for you,
          <br /> the adventure begins here!
        </p>
        <Link to="/Login" className="login-btn">
          <button>LOGIN</button>
        </Link>
      </div>
      <div className="side-img">
        <img src={BoyAndTent} alt="Tent" />
      </div>
    </div>
  );
};

export default Home;
