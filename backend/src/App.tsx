import './App.sass';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
