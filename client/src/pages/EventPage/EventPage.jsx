import { useParams } from "react-router-dom";
import dummyImage from "../../assets/dummy-image-removebg-preview.svg";
import image from "../../assets/user.svg";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import ErrorBox from "../../Components/subComponents/ErrorBox/ErrorBox";
import FullScreenLoader from "../../Components/subComponents/Loader/FullScreenLoader/FullScreenLoader";
import { useGetEventQuery } from "../../features/Events/eventApi";
import { resErrorHandler } from "../../helper/commmon/resErrorHandler";

export default function EventPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useGetEventQuery(id);
  console.log(data, error, isLoading);

  if (isLoading) {
    return (
      <div className="bg-primary">
        <FullScreenLoader />
      </div>
    );
  }
  if (error) {
    const extractError = resErrorHandler(error); // Use the error extractor function
    let errorDesc = "";
    if (extractError.message === "Unauthorized URL!") {
      errorDesc = "You are not allowed to view this page";
    }
    return (
      <div className="bg-primary">
        <ErrorBox
          status={error.status}
          heading={extractError.message}
          desc={errorDesc}
        />
      </div>
    );
  }
  if (data) {
    return (
      <div className="bg-primary">
        {/* <div className=" fixed bottom-2 right-2 z-50">
        <ToogleMode customClass={"drop-shadow-sm"} />
      </div> */}
        {/* Event Details Section */}
        <div className="container mx-auto px-6 py-10">
          {/* Header Section */}
          <div className="relative">
            <img
              src={dummyImage}
              alt="Event Banner"
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-80 bg-primary bg-opacity-70 flex items-center justify-center text-white">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-primary">
                  Dream World Wide in Jakarta
                </h1>
                <p className="mt-2 text-xl text-secondary">
                  By <span className="text-glow font-medium">Saqib Rahman</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
            {/* Left Column */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-secondary">
                Speakers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-primary">
                <ProfileCard
                  name={"Jhon Doe"}
                  designation={"Writer, Researcher and Author"}
                  avatar={image}
                  customClass="bg-secondary box-shadow"
                />
                <ProfileCard
                  name={"Jhon Doe"}
                  designation={"Writer, Researcher and Author"}
                  avatar={image}
                  customClass="bg-secondary box-shadow"
                />
                <ProfileCard
                  name={"Jhon Doe"}
                  designation={"Writer, Researcher and Author"}
                  avatar={image}
                  customClass="bg-secondary box-shadow"
                />
              </div>
              <h2 className="text-2xl font-bold mt-8 mb-4">Hours</h2>
              <p className="text-gray-700">
                Weekday Hours: <strong>7 PM - 10 PM</strong>
              </p>
              <p className="text-gray-700">
                Sunday Hours: <strong>10 AM - 3 PM</strong>
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                How can I contact the organizer with any questions?
              </h2>
              <p className="text-gray-700">
                Please visit{" "}
                <a href="#" className="text-indigo-600 underline">
                  www.dreamworldwide.net
                </a>{" "}
                and refer to the FAQ section for all questions and contact
                information.
              </p>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-secondary">
                Date & Time
              </h2>
              <div className="bg-secondary shadow-lg rounded-lg p-6 mb-6">
                <p className="text-tertiary font-medium">
                  Saturday, Sep 14, 2019 at 8:30 PM
                </p>
                <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:foreground transition-all">
                  Attend Now (Free)
                </button>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">Event Location</h3>
                <p className="text-gray-700">Balai Kartini, Jakarta Selatan</p>
                <div className="mt-4">
                  <iframe
                    title="Map"
                    className="w-full h-48 rounded"
                    src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                    Indonesia Events
                  </span>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                    Jakarta Events
                  </span>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                    UI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Other Events */}
          <h2 className="text-2xl font-bold mt-12 mb-4">
            Other Events You May Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="Event"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    Event Title {item}
                  </h3>
                  <p className="text-gray-700">Location, Date</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 EzyEvent. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
}
