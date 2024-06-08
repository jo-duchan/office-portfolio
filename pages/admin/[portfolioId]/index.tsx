import React, { useEffect } from "react";
import usePortfolioStore from "@/stores/portfolio-store";

export default function AdminPortfolioTopSectionEditPage() {
  const { item } = usePortfolioStore((state) => state);

  useEffect(() => {
    console.log(item);
  }, []);

  return <div>Admin Portfolio Top Section Edit Page</div>;
}
