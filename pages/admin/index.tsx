import React from "react";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { v4 as uuidv4 } from "uuid";
import usePortfolioStore from "@/stores/portfolio-store";

export default function AdminPortfolioListPage() {
  const router = useRouter();
  const { init } = usePortfolioStore((state) => state);

  const handleCreatePortfolio = () => {
    const id = uuidv4();
    // init(id);
    router.push(`${PATH.ADMIN}/${id}`);
  };

  return (
    <div>
      Admin Portfolio List<button onClick={handleCreatePortfolio}>new</button>
      {/* list / edit / delete / publish 여부 */}
    </div>
  );
}
