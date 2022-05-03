import { useHistory } from "react-router-dom";

function Btn() {
  let history = useHistory();

  function handleClick() {
    history.push("/create");
  }

  return (
    <button className="createNote" type="button" onClick={handleClick}>
      Create Note
    </button>
  );
}
export default Btn;
