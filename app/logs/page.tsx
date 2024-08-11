"use client";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Logs = () => {
  const [logType, setLogType] = useState("");
  const { data: session } = useSession();
  const { toast } = useToast();

  const fetchUserLog = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const user = await res.json();
      setLogType(user.logType);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchUserLog();
    console.log("logType " + logType);
  }, [session]);

  return (
    <div className="space-y-4">
      <h1 className="h1">Logs</h1>
      {logType === "" ? <div>You haven't setup tracking logs yet.</div> : <div>Show logs</div>}
    </div>
  );
};
export default Logs;
