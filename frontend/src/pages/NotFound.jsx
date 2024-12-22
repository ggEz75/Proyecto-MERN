import { Link } from "react-router-dom"
import { Card } from "../components/ui";

function NotFound() {
    return (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center flex-col">

            <Card>
            <h1 className="text-4xl my-2 font-bold">Page Not Found</h1>
            <h3 className="text-2xl">404</h3>

            <Link to="/">Go back to Home</Link>
            </Card>

        </div>
    );
    }

export default NotFound