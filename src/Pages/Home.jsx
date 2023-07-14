import { Button } from "react-bootstrap";
import Footer from "../Components/Footer";

function Home() {
    return (
        <div className="vh-100 d-flex flex-column">
            <div className="d-flex flex-column justify-content-center align-items-center border flex-grow-1">
                <h1 className="pb-4 fw-bold">Task Manager App</h1>
                <div className="d-flex flex-wrap justify-content-center">
                    <Button size="lg" className="px-5 m-1 fs-4" href="./signup">Signup</Button>
                    <Button size="lg" className="px-5 m-1 fs-4" href="./login">Login</Button>
                    <Button size="lg" className="px-5 m-1 fs-4" href="./all-tasks">userpanel</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Home;