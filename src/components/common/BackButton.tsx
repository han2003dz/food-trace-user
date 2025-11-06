import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to: string;
  title: string;
}

export const BackButton = ({ to, title }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button variant="ghost" onClick={() => navigate(to)} className="gap-2">
      <ArrowLeft className="w-4 h-4" />
      {title}
    </Button>
  );
};
