import Header from "../Components/Header/Header";
import UserPage from "./UserPage";
const MyProfile = ({ logo }) => {
  return (
    <>
      <Header logo={logo} />
      <p>Profile</p>
      <UserPage />
    </>
  );
};

export default MyProfile;
