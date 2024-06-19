import styled from "styled-components";
import useUserSession from "@/hooks/use-user-session";
import { signOut } from "@/libs/firebase/auth";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { colors } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props {
  sessionCookie: string | null;
}

interface UserRouteInfo {
  [key: string]: {
    path: string;
  };
}

const userRouteInfo: UserRouteInfo = {
  home: { path: "" },
  about: { path: "" },
  work: { path: "" },
  contact: { path: "" },
};

function Header({ sessionCookie }: Props) {
  const userSessionId = useUserSession(sessionCookie);
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push(PATH.ROOT);
  };

  const handleMovePage = (path: string) => {
    console.log(path);
  };

  const renderAdminMenu = () => {
    if (userSessionId) {
      return (
        <>
          <Divider />
          <MenuItem>Admin Home</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </>
      );
    }

    return null;
  };

  return (
    <Container>
      <LogoSection>Company Logo</LogoSection>
      <MenuSection>
        {Object.keys(userRouteInfo).map((key) => (
          <MenuItem
            key={key}
            onClick={() => handleMovePage(userRouteInfo[key].path)}
          >
            {key}
          </MenuItem>
        ))}
        {renderAdminMenu()}
      </MenuSection>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 52px;
  padding-inline: 110px;

  background-color: ${colors.neutral[800]};
  color: ${colors.neutral[100]};
`;

const LogoSection = styled.div``;

const MenuSection = styled.nav`
  display: flex;
  gap: 24px;
  text-transform: capitalize;
`;

const MenuItem = styled.div`
  ${textStyles.body3.regular};
  cursor: pointer;
  user-select: none;
`;

const Divider = styled.div`
  width: 1px;
  height: 17px;
  background-color: ${colors.neutral[400]};
`;
