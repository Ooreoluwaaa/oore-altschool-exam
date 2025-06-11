import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function GoBackButton({ path }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => (path ? navigate(path) : navigate(-1))}
      className="bg-neon-navy rounded-[20px] font-semibold"
    >
      Go Back
    </Button>
  );
}
