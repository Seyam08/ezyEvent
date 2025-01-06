import { Link } from "react-router-dom";
import mockup from "../../assets/screenshot-mockup.png";
import { CalendarIcon, Dashboard, TaskDaily } from "../../icons/icons";

export default function UseCase() {
  const cases = [
    {
      id: 1,
      title: "Seamless Event Management",
      description:
        "Simplify your workflow with intuitive tools that help you plan, schedule, and manage every detail of your event. Keep everything organized and ensure your event’s success without breaking a sweat.",
      image: mockup,
      link: "#",
      icon: (className) => <Dashboard className={className} />,
    },
    {
      id: 2,
      title: "Collaboration Made Easy",
      description:
        "Empower your team to work smarter. Assign roles, coordinate tasks, and keep everyone on the same page with a centralized hub for communication and task tracking.",
      image: mockup,
      link: "#",
      icon: (className) => <TaskDaily className={className} />,
    },
    {
      id: 3,
      title: "Discover and Participate",
      description:
        "Explore events that spark your interest and get involved effortlessly. Whether you want to attend, learn, or connect, our app offers a smooth and enjoyable experience from start to finish.",
      image: mockup,
      link: "#",
      icon: (className) => <CalendarIcon className={className} />,
    },
  ];
  return (
    <div className="width-holder py-28 px-6">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#EDEDED]">
          Empowering Events, Connecting People
        </h1>
        <p className="text-[#c7c7c7] mt-4">
          Our app bridges the gap between event organizers, teams, and
          attendees. Whether you're hosting, collaborating, or participating, we
          ensure a streamlined experience tailored to your needs. From planning
          to participation, we make every interaction meaningful.
        </p>
      </div>

      <div className="space-y-5">
        {cases.map((useCase) => (
          <div
            className={`bg-primary max-w-full flex flex-col ${
              useCase.id % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-8 p-4 md:p-8 rounded-lg box-shadow`}
            key={useCase.id}
          >
            <div className="basis-full md:basis-1/2">
              <img
                src={useCase.image}
                alt="Timeline view of the application"
                className="rounded-lg box-shadow"
                loading="lazy"
              />
            </div>

            <div className={`basis-full md:basis-1/2 text-left`}>
              <h3
                className="bg-clip-text text-transparent gradient-bg-4th font-bold text-base
               md:text-xl uppercase mb-2 inline-flex items-center"
              >
                {useCase.icon(
                  "mr-2 md:mr-5 text-white gradient-bg-4th h-7 w-7 md:h-9 md:w-9 p-1 rounded-lg"
                )}
                {useCase.title}
              </h3>
              <p className="text-tertiary text-sm md:text-lg leading-relaxed mb-4">
                {useCase.description}
              </p>
              <Link
                to={useCase.link}
                className="text-glow font-bold hover:underline hover:decoration-2 hover:underline-offset-4 transition-all"
              >
                Learn more...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
