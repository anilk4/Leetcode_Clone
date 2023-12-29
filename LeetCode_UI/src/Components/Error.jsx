import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  // You can use navigate to redirect to a specific page or handle errors accordingly
  const handleNavigate = () => {
    // Example: Redirect to the home page
    navigate('/');
  };

  return (
    <div>
      <h1>Error Page</h1>
      <p>Oops! Something went wrong.</p>
      <button onClick={handleNavigate}>Go to Home</button>
    </div>
  );
};

export default Error;
