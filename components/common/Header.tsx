import useUserSession from "@/hooks/use-user-session";
import { signOut } from "@/libs/firebase/auth";
import { useRouter } from "next/router";
import PATH from "@/constants/path";

interface Props {
  sessionCookie: string | null;
}

function Header({ sessionCookie }: Props) {
  const userSessionId = useUserSession(sessionCookie);
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push(PATH.ROOT);
  };

  if (userSessionId) {
    return (
      <header>
        admin <button onClick={handleSignOut}>로그아웃</button>
      </header>
    );
  }

  return <header>user</header>;
}

export default Header;
