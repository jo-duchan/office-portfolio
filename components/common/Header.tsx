import useUserSession, { type SessionState } from "@/hooks/use-user-session";
import { signIn, signOut } from "@/libs/firebase/auth";
import { useRouter } from "next/router";
import PATH from "@/constants/path";

function Header() {
  const userSessionId = useUserSession(null);
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
