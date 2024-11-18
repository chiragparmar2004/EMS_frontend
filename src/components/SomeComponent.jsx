import { useDispatch } from "react-redux";
import { showSnackbar } from "../store/slices/snackbar.slice.js"; // Adjust the import path as needed

const SomeComponent = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      showSnackbar({
        message: "This is a success message!",
        severity: "success",
      })
    );
  };

  return <button onClick={handleClick}>Show Snackbar</button>;
};

export default SomeComponent;
