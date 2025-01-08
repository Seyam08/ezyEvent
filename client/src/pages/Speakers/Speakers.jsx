import image from "../../assets/user.svg";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import PageHeading from "../../Components/subComponents/Heading/PageHeading";

export default function Speakers() {
  return (
    <>
      <PageHeading>Speakers List</PageHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-primary mt-5">
        <ProfileCard
          name={"Jhon Doe"}
          designation={"Writer, Researcher and Author"}
          avatar={image}
          facebook={"https://www.facebook.com/"}
          linkdin={"https://www.linkdin.com/"}
          X={"https://www.x.com/"}
          customClass="bg-secondary box-shadow"
        />
        <ProfileCard
          name={"Jhon Doe"}
          designation={"Writer, Researcher and Author"}
          avatar={image}
          linkdin={"https://www.linkdin.com/"}
          X={"https://www.x.com/"}
          customClass="bg-secondary box-shadow"
        />
        <ProfileCard
          name={"Jhon Doe"}
          designation={"Writer, Researcher and Author"}
          avatar={image}
          facebook={"https://www.facebook.com/"}
          X={"https://www.x.com/"}
          customClass="bg-secondary box-shadow"
        />
        <ProfileCard
          name={"Jhon Doe"}
          designation={"Writer, Researcher and Author"}
          avatar={image}
          facebook={"https://www.facebook.com/"}
          linkdin={"https://www.linkdin.com/"}
          customClass="bg-secondary box-shadow"
        />
      </div>
    </>
  );
}
