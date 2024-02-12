import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useSidebarState = () => {
  const path = usePathname();
  const [currentRoute, setCurrentRoute] = useState(path);

  useEffect(() => {
    setCurrentRoute(path);
  }, [path]);

  return { currentRoute };
};

export default useSidebarState;
