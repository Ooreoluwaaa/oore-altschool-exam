import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {
  path?: string;
};
export default function GoBackButton({ path }: Props) {
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