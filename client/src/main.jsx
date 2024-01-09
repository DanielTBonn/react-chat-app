import ReactDOM from "react-dom/client";
import App from './App';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1 className="display-2">Wrong Page!</h1>,
        children: [
            {
                path: '/home',
                element: <HomePage />
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)