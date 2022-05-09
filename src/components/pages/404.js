import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: "center" }}>Page doesn't exist</p>
      <Link
        style={{ textAlign: "center", display: "block", color: "red" }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
