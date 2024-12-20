import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import RegisteredUsers from "./routes/RegisteredUsers";
import Sidebar from "./components/Sidebar";
import AddUser from "./routes/AddUser";
import CompletePayment from "./routes/CompletePayment";
import DonationPage from "./routes/DonationPage";

const AppLayout = () => (
  <div className="App w-full min-h-screen bg-white flex">
    <Sidebar />
    <div className="content w-full">
      {/* This is where the routed content will appear */}
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // The layout that includes the sidebar
    children: [
      {
        path: "/",
        element: <RegisteredUsers />,
      },
      {
        path: "/add_user",
        element: <AddUser />,
      },
      {
        path: "/complete-payment",
        element: <CompletePayment />,
      },
      {
        path: "/donate",
        element: <DonationPage />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App w-full min-h-screen bg-white flex">
        <Sidebar />
        <div className="content w-full">
          {/* Main content rendered by the router */}
        </div>
      </div>
    </RouterProvider>
  );
}

export default App;
