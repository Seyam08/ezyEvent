import ProfileSummaryBox from "../../Components/subComponents/AccountsSubComponents/ProfileSummaryBox";
import PageHeading from "../../Components/subComponents/Heading/PageHeading";

export default function MyProfile() {
  return (
    <>
      <PageHeading customClass="mb-3">My Profile</PageHeading>
      <ProfileSummaryBox
        name={"Eddie Brock"}
        role={"Speaker"}
        designation={"Writer, Researcher and Author"}
      />
    </>
  );
}
