import { LucideProps } from "lucide-react";

const IconButton = ({
  icon: Icon,
  onClick,
  className,
  ...props
}: {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`p-1.5 h-fit rounded-full hover:bg-blue-300 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
      {...props}>
      <Icon size={16} />
    </div>
  );
};

export default IconButton;
