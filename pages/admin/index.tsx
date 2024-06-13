import React from "react";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { v4 as uuidv4 } from "uuid";
import usePortfolioStore from "@/stores/portfolio-store";

export default function AdminPortfolioListPage() {
  const router = useRouter();
  const { create } = usePortfolioStore();

  const handleCreatePortfolio = () => {
    const id = uuidv4();
    create(id);
    router.push(`${PATH.ADMIN}/${id}`);
  };

  return (
    <div>
      Admin Portfolio List<button onClick={handleCreatePortfolio}>new</button>
      {/* 비밀번호 재설정 이메일 보내기 참고: https://firebase.google.com/docs/auth/web/manage-users?hl=ko#send_a_password_reset_email */}
      {/* list = edit / delete / publish 여부 */}
    </div>
  );
}
