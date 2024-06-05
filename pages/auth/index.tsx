import React from "react";
import { signIn } from "@/libs/firebase/auth";
import { useRouter } from "next/router";
import PATH from "@/constants/path";

export default function AdminAuthPage() {
  const router = useRouter();
  const onSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    const pass = formData.get("pass") as string;
    const result = await signIn(id, pass);

    if (result?.ok) {
      router.push(PATH.ADMIN_HOME);
    }
  };
  return (
    <div>
      Admin Auth
      <form onSubmit={onSumit}>
        <input type="text" name="id" />
        <input type="text" name="pass" />
        <button>로그인</button>
      </form>
    </div>
  );
}
