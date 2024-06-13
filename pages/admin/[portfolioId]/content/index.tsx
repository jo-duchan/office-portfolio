import React from "react";
import usePortfolioStore from "@/stores/portfolio-store";

export default function AdminPortfolioBodyEditPage() {
  const { item, init, updateHead } = usePortfolioStore((state) => state);

  console.log("body", item);
  return <div>Admin Portfolio Content Section Edit Page</div>;
}
