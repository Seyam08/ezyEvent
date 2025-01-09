import { Link } from "react-router-dom";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";
import {
  ArrowUp,
  CalendarIcon,
  LockIcon,
  TaskDaily,
  UserGroupIcon,
} from "../../icons/icons";

export default function Features() {
  const fadeInRef = useFadeInOnScroll();
  const features = [
    {
      id: 1,
      title: "Event Management Made Simple",
      description:
        "Create, edit, and manage events with attendance tracking, speaker lists, and more.",
      action: "CRUD",
      icon: (
        <div className="gradient-bg w-12 h-12 rounded-2xl flex items-center justify-center">
          <CalendarIcon className={"text-white h-8 w-8"} />
        </div>
      ),
    },
    {
      id: 2,
      title: "User Registration and Profiles",
      description:
        "Allow users to sign up, upload avatars, and manage their profiles effortlessly. Session-based authentication ensures secure access.",
      action: "Authentication",
      icon: (
        <div className="gradient-bg w-12 h-12 rounded-2xl flex items-center justify-center">
          <LockIcon className={"text-white h-8 w-8"} />
        </div>
      ),
    },
    {
      id: 3,
      title: "Role-Based Access Control (RBAC)",
      description:
        "Assign roles and permissions to manage users and event resources effectively.",
      action: "Authorization",
      icon: (
        <div className="gradient-bg w-12 h-12 rounded-2xl flex items-center justify-center">
          <UserGroupIcon className={"text-white h-8 w-8"} />
        </div>
      ),
    },
    {
      id: 4,
      title: "Attendance Tracking",
      description:
        "We bring a crucial productivity factor to the product development process, right down to real-time factory monitoring and control.",
      action: "Tracking",
      icon: (
        <div className="gradient-bg w-12 h-12 rounded-2xl flex items-center justify-center">
          <TaskDaily className={"text-white h-8 w-8"} />
        </div>
      ),
    },
  ];

  return (
    <div className="width-holder py-28 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">
          Features of Ezy Event
        </h1>
        <p className="text-secondary mt-4">
          the following backend-driven features with short descriptions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`gradient-bg-3rd p-6 rounded-sm box-shadow flex gap-5 items-start fadeIn`}
            ref={fadeInRef}
          >
            <div className="flex flex-col gap-14">
              <h2 className="text-glow font-bold underline decoration-4 underline-offset-8 text-2xl">
                {feature.id}
                {"."}
              </h2>
              {feature.icon}
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-semibold text-secondary">
                {feature.title}
              </h3>
              <p className="text-tertiary text-sm">{feature.description}</p>
              <button className="text-glow font-bold w-max">
                <Link
                  to={"/register"}
                  className="flex items-center space-x-2 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all"
                >
                  <span>{feature.action}</span>
                  <ArrowUp
                    className={
                      "h-6 w-6 rotate-90 text-white p-0.5 foreground-2nd bg-opacity-80 rounded-full border border-gray-300"
                    }
                  />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
