import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="container col-12 d-flex justify-content-center align-items-center flex-column gap-4 mt-5">
            
            <h2 style={{fontFamily: 'Bebas Neue'}} className="mb-0">Oops...</h2>
            
            <p>The URL you entered does not exist</p>

            <Link to='/'><button className="btn btn-primary">Back to Home page</button></Link>
        </div>
    )
}