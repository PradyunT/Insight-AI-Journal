import { Github } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-[100%] p-4 px-8 border border-t-2 flex flex-row mt-16">
      <p>Built by Pradyun T</p>
      <div className="flex-1" />
      <Github className="ml-2" size={20} />
    </div>
  );
};
export default Footer;
