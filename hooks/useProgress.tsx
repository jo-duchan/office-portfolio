import { useState } from "react";
import { createPortal } from "react-dom";
import Progress from "@/components/common/Progress";

function useProgress() {
  const portal =
    typeof window !== "undefined" && document.getElementById("portal");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hideProgress = () => setIsLoading(false);
  const showProgress = () => setIsLoading(true);

  const progress = isLoading && portal && createPortal(<Progress />, portal);

  return { progress, showProgress, hideProgress };
}

export default useProgress;
