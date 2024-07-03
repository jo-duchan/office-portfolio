import React, { useEffect } from "react";
import Head from "next/head";
import requestResetPassWord from "@/libs/firebase/reset-password";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import useModal from "@/hooks/useModal";
import useProgress from "@/hooks/useProgress";
import TextField from "@/components/common/TextField";

export default function AdminAuthPage() {
  const { modal, showModal } = useModal();
  const { progress, showProgress, hideProgress } = useProgress();
  const { register, handleSubmit } = useForm<FieldValues>();

  const router = useRouter();
  const handleSendRequestResetMail = async (data: FieldValues) => {
    showProgress();
    await requestResetPassWord(data.email);

    hideProgress();
    router.push(PATH.ROOT);
  };

  useEffect(() => {
    const modalContent = (
      <>
        <TextField
          register={register}
          name="email"
          label="Email"
          placeholder="Id로 사용하는 Email을 작성해 주세요."
        />
      </>
    );
    showModal({
      title: "Reset Password",
      children: modalContent,
      closeAction: router.back,
      actionLabel: "Send",
      action: handleSubmit(handleSendRequestResetMail),
    });
  }, []);

  return (
    <>
      <Head>
        <title>Admin Reset Password</title>
      </Head>
      {modal}
      {progress}
    </>
  );
}
