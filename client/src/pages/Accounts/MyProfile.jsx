import { useSelector } from "react-redux";
import ProfileInfo from "../../Components/subComponents/AccountsSubComponents/ProfileInfo";
import ProfileSummaryBox from "../../Components/subComponents/AccountsSubComponents/ProfileSummaryBox";
import TooltipIcon from "../../Components/subComponents/AnimatedIcons/TooltipIcon";
import PageHeading from "../../Components/subComponents/Heading/PageHeading";
import { getRandomDesignation } from "../../helper/static data/getRandomDesignation";
import { EditIcon } from "../../icons/icons";

export default function MyProfile() {
  const { myAccount } = useSelector((state) => state.account);
  const { avatar, email, name, role, username } = myAccount || {};

  const designation = getRandomDesignation();
  return (
    <>
      <PageHeading customClass="mb-3">My Profile</PageHeading>
      <ProfileSummaryBox
        name={name}
        role={role}
        designation={designation}
        avatar={avatar}
      />
      <div className="py-3 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary">
            Personal information
          </h2>
          <div className="absolute top-4 right-4">
            <TooltipIcon text={"Edit"} icon={EditIcon} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 text-sm text-secondary">
          <ProfileInfo title={"Full Name"} info={name} />
          <ProfileInfo title={"Username"} info={username} />
          <ProfileInfo title={"Email address"} info={email} />
          <ProfileInfo title={"Phone"} info={"(213) 555-1234"} />
        </div>
      </div>
    </>
  );
}
