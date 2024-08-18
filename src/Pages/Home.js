import logoWhite from "../Assets/Logo2White.png";
import Layer_1 from "../Assets/Layer_1.png";
import { Link } from "react-router-dom";
const Home = ({ logoWhite }) => {
  return (
    <div className="homePage">
      <div className="top-nav">
        <img src={logoWhite} alt="Logo" />
      </div>
      <div className="content">
        <div className="home-column1">
          <img src={Layer_1} alt="Tent" />
        </div>
        <div className="home-column2">
          <h1>
            Imagine a library,
            <br />
            but for toys
          </h1>
          {/* <h3>Where every wish is real!</h3> */}
          <p>
            With over 200 magical playthings waiting just for you,
            <br /> the adventure begins here!
          </p>
          <Link to="/Login" className="login-btn">
            <button>LOGIN</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
