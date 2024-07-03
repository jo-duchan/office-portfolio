import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { signIn } from "@/libs/firebase/auth";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import textStyles from "@/styles/typography";
import { colors } from "@/styles/primitive-tokens";
import useModal from "@/hooks/useModal";
import useProgress from "@/hooks/useProgress";
import TextField from "@/components/common/TextField";

export default function AdminAuthPage() {
  const { modal, showModal } = useModal();
  const { progress, showProgress, hideProgress } = useProgress();
  const { register, handleSubmit } = useForm<FieldValues>();
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const handleSignIn = async (data: FieldValues) => {
    showProgress();
    const result = await signIn(data.id, data.password);

    if (result?.ok) {
      hideProgress();
      router.push(PATH.ADMIN);
    } else {
      setError(true);
      hideProgress();
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
        <div>
          <TextField
            register={register}
            name="password"
            label="Password"
            placeholder="암호를 입력해 주세요."
            type="password"
          />
          {error && (
            <ErrorMessage>
              ID와 비밀번호를 확인하고, 다시 시도해주세요.
            </ErrorMessage>
          )}
        </div>
        <TextButton onClick={() => router.push(PATH.RESET_PASSWORD)}>
          비밀번호 변경
        </TextButton>
      </>
    );
    showModal({
      title: "Sign In",
      children: modalContent,
      closeAction: router.back,
      actionLabel: "Sign In",
      action: handleSubmit(handleSignIn),
    });
  }, [error]);

  return (
    <>
      <Head>
        <title>Admin Auth</title>
      </Head>
      {modal}
      {progress}
    </>
  );
}

const ErrorMessage = styled.span`
  display: block;
  width: 100%;
  height: 20px;
  ${textStyles.body3.regular};
  color: ${colors.red[400]};
  margin-top: 12px;
`;

const TextButton = styled.span`
  ${textStyles.label2.bold};
  color: ${colors.neutral[600]};
  text-decoration-line: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
  user-select: none;
`;
