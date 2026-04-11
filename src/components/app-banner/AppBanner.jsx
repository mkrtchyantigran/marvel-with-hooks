import "./appBanner.scss";
import avengers from "../../resources/img/Avengers.png"
import avengersLogo from "../../resources/img/Avengers logo.png"
export default function AppBanner() {
    return (
        <div className="app__banner">
            <img src={avengers} alt="Avengers" width={152} height={100} />
            <h3 className="app__banner-text">
                New comics every week! <br />
                Stay tuned!
            </h3>
            <img src={avengersLogo} alt="Avengers Logo" width={133} height={100} />
        </div>
    );
}