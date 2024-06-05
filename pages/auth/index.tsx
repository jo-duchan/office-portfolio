import React from "react";
import { signIn } from "@/libs/firebase/auth";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";

export default function AdminAuthPage() {
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const router = useRouter();
  const handleSignIn = async (data: FieldValues) => {
    const result = await signIn(data.id, data.pass);

    if (result?.ok) {
      router.push(PATH.ADMIN_HOME);
    }
  };
  return (
    <div>
      Admin Auth
      <form onSubmit={handleSubmit(handleSignIn)}>
        <input type="text" {...register("id")} />
        <input type="text" {...register("pass")} />
        <button>로그인</button>
      </form>
    </div>
  );
}
