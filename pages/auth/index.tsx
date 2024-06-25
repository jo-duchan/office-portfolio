import React, { useEffect } from "react";
import Head from "next/head";
import { signIn } from "@/libs/firebase/auth";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import useModal from "@/hooks/useModal";
import TextField from "@/components/common/TextField";

export default function AdminAuthPage() {
  const { modal, showModal } = useModal();
  const { register, handleSubmit } = useForm<FieldValues>();

  const router = useRouter();
  const handleSignIn = async (data: FieldValues) => {
    const result = await signIn(data.id, data.password);

    if (result?.ok) {
      router.push(PATH.ADMIN);
    }
  };

  useEffect(() => {
    const modalContent = (
      <>
        <TextField
          register={register}
          name="id"
          label="ID"
          placeholder="아이디를 입력해 주세요."
        />
        <TextField
          register={register}
          name="password"
          label="Password"
          placeholder="암호를 입력해 주세요."
          type="password"
        />
      </>
    );
    showModal({
      title: "Sign In",
      children: modalContent,
      closeAction: router.back,
      actionLabel: "Sign In",
      action: handleSubmit(handleSignIn),
    });
  }, []);

  return (
    <>
      <Head>
        <title>Admin Auth</title>
      </Head>
      {modal}
    </>
  );
}
