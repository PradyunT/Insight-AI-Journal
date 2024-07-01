import { Github } from "lucide-react";
import IconButton from "./iconButton";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-[100%] py-4 px-8 border border-t-2 flex flex-row">
      <p>Built by Pradyun T</p>
      <div className="flex-1" />
      <Link href="https://github.com/PradyunT/Insight-AI-Journal">
        <IconButton icon={Github} className="hover:bg-gray-300" />
      </Link>
    </div>
  );
};
export default Footer;
