import { Link } from "react-router-dom";
import TooltipIcon from "../../../Components/subComponents/AnimatedIcons/TooltipIcon";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  LinkIcon,
  MailIcon,
} from "../../../icons/icons";

const facebook = import.meta.env.VITE_DEVELOPERS_FACEBOOK;
const linkedin = import.meta.env.VITE_DEVELOPERS_LINKEDIN;
const email = import.meta.env.VITE_DEVELOPERS_MAIL;
const github = import.meta.env.VITE_DEVELOPERS_GITHUB;
const webLink = import.meta.env.VITE_DEVELOPERS_WEBSITE;

// console.log(facebook, linkedin, email, github);
export default function Footer() {
  return (
    <footer className="gradient-bg-2nd">
      <div className="max-w-6xl mx-auto px-4 py-14 md:px-6">
        {/* first row */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold uppercase mb-4 text-gray-100">
            Where To?
          </h3>
          {/* Navigation Links */}
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center space-x-6">
              {[
                "Outside",
                "Interior",
                "Location",
                "Video",
                "Team",
                "Enquire",
              ].map((item) => (
                <li key={item} className="py-2">
                  <Link
                    to="#"
                    className="text-base md:text-lg text-gray-400 hover:text-gray-100 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* second row */}
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-end space-y-10">
          {/* Developes info */}
          <div>
            <div className="text-xs text-gray-400 mb-3 flex flex-row justify-center space-x-1">
              <p>
                &copy; 2025
                <span className="uppercase text-gray-100"> Seyam</span>
              </p>
              <TooltipIcon
                text="Website"
                icon={LinkIcon}
                link={webLink}
                h="h-4"
                w="w-4"
                color="text-gray-300"
              />
              — All rights reserved
            </div>
            <div className="flex flex-row w-full justify-center space-x-5 py-1 border border-gray-300 rounded-full bg-slate-300 bg-opacity-20 hover:bg-opacity-0 transition-colors">
              <TooltipIcon
                text="Facebook"
                icon={FacebookIcon}
                link={facebook}
                h="h-5"
                w="w-5"
                color="text-gray-200"
              />
              <TooltipIcon
                text="Linkedin"
                icon={LinkedinIcon}
                link={linkedin}
                h="h-5"
                w="w-5"
                color="text-gray-200"
              />
              <TooltipIcon
                text="Email"
                icon={MailIcon}
                link={`mailto:${email}`}
                h="h-5"
                w="w-5"
                color="text-gray-200"
              />
              <TooltipIcon
                text="Github"
                icon={GithubIcon}
                link={github}
                h="h-5"
                w="w-5"
                color="text-gray-200"
              />
            </div>
          </div>
          {/* Explore app */}
          <div>
            <button className="text-base text-gray-200 transition-colors py-1 px-8 border border-gray-300 rounded-full bg-slate-300 bg-opacity-20 hover:bg-opacity-0">
              <Link to="#" className="">
                Explore App
              </Link>
            </button>
          </div>
          {/* Technological stack*/}
          <div>
            <p className="text-xs">Framework and Library used</p>
            <p className="text-sm font-bold uppercase">
              React, Redux and Tailwind.css
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
