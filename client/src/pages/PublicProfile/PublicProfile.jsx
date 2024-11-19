import image from "../../assets/user.png";
import TooltipIcon from "../../Components/subComponents/AnimatedIcons/TooltipIcon";
import { FacebookIcon, LinkedinIcon, NewTwitterIcon } from "../../icons/icons";

export default function PublicProfile() {
  const facebook = "facebook.com";
  const linkdin = "facebook.com";
  const X = "facebook.com";
  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-tertiary rounded-lg p-6 flex flex-col items-center justify-between md:items-start">
          <div className="w-20 h-20 cursor-pointer">
            <img
              src={image}
              alt="Avatar"
              className="p-1 rounded-full ring-1 ring-[#8C5BFE] h-full w-full"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4 text-primary">
            Joseph R. Robinson
          </h2>
          <p className="text-glow">Creative Art Director</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-tertiary">Email Address: </span>
              <span className="text-secondary">info@gmail.com</span>
            </p>
            <p>
              <span className="text-tertiary">Phone Number: </span>
              <span className="text-secondary">+91 0365 2398 02</span>
            </p>
            <p>
              <span className="text-tertiary">Gender: </span>
              <span className="text-secondary">Male</span>
            </p>
            <p>
              <span className="text-tertiary">Language: </span>
              <span className="text-secondary">English</span>
            </p>
            <p>
              <span className="text-tertiary">Address: </span>
              <span className="text-secondary">
                Strode-ulice 54, Cabor 83586
              </span>
            </p>
          </div>
        </div>

        <div className="bg-tertiary rounded-lg p-6 md:col-span-2 flex flex-col justify-between">
          <div className="text-lg font-semibold mb-4 text-primary">
            Records:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-glow">4</span>
              <span className="text-sm text-tertiary">Speaked at</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-glow">12</span>
              <span className="text-sm text-tertiary">Hosted</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-glow">267</span>
              <span className="text-sm text-tertiary">Audience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-glow">12</span>
              <span className="text-sm text-tertiary">Attended</span>
            </div>
          </div>
          <div className="text-lg font-semibold mt-4 mb-3 text-primary">
            About Me:
          </div>
          <p className="text-tertiary text-sm">
            When referring to Lorem Ipsum, different expressions are used,
            normally fill text, fictitious text, blind text or placeholder text.
            In short, the meaning can also be zero, but its usefulness is so
            clear as to go the centuries and resist the ironic and versions that
            came with the arrival of the web constructor adopted as well.
          </p>
          <div className="bg-tertiary flex flex-row w-full justify-center space-x-5 py-2 rounded-md mt-5">
            {facebook ? (
              <TooltipIcon
                text="Facebook"
                icon={FacebookIcon}
                link={facebook}
              />
            ) : null}
            {linkdin ? (
              <TooltipIcon text="Linkdin" icon={LinkedinIcon} link={linkdin} />
            ) : null}
            {X ? (
              <TooltipIcon text="Linkdin" icon={NewTwitterIcon} link={X} />
            ) : null}
          </div>
        </div>

        <div className="bg-tertiary rounded-lg p-6 md:col-span-2">
          <div className="text-lg font-semibold mb-4 text-primary">
            UpComing Events
          </div>
          <div className="flex justify-between items-center bg-primary p-4 rounded-lg">
            <div>
              <p className="text-sm text-tertiary">Leave Type</p>
              <p className="font-semibold text-secondary">Vacation</p>
            </div>
            <div>
              <p className="text-sm text-tertiary">Duration</p>
              <p className="font-semibold text-secondary">
                03 Dec 2023 - 12 Dec 2023
              </p>
            </div>
            <div>
              <p className="text-sm text-tertiary">Status</p>
              <p className="text-green-500 font-semibold">Approved</p>
            </div>
            <button className="text-glow font-semibold hover:underline">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
