import ProfileInfo from "../../Components/subComponents/AccountsSubComponents/ProfileInfo";
import ProfileSummaryBox from "../../Components/subComponents/AccountsSubComponents/ProfileSummaryBox";
import EditIconComponent from "../../Components/subComponents/AnimatedIcons/EditIconComponent";
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
      <div className="py-3 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary">
            Personal information
          </h2>
          <div className="absolute top-4 right-4">
            <EditIconComponent />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 text-sm text-secondary">
          <ProfileInfo title={"First Name"} info={"Jhon"} />
          <ProfileInfo title={"Last Name"} info={"Doe"} />
          <ProfileInfo title={"Email address"} info={"jackadams@gmail.com"} />
          <ProfileInfo title={"Phone"} info={"(213) 555-1234"} />
          <ProfileInfo title={"Bio"} info={"Product Designer"} />
        </div>
      </div>
    </>
  );
}
