import { Link } from "react-router-dom";


export default function Page404() {
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: 48 }}>Page Not Found</h1>
            <p style={{ textAlign: "center", fontSize: 24, color: "red" }}>Error 404</p>
            <p style={{ textAlign: "center", marginTop: 16 }}>
                Please check URL or go <Link to="/" style={{color: "blue"}}> 
                     To Home Page
                </Link>
            </p>
        </div>
    )
}