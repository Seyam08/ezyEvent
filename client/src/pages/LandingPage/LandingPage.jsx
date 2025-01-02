import mac from "../../assets/mac_mockup.png";
import Header from "../../partials/PublicComponent/Header/Header";

export default function LandingPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="foreground bg-opacity-90">
        <div className=" bg-landing-bg bg-cover bg-center">
          {/* Header Section */}

          <Header />
          <div className="max-w-6xl w-full mx-auto py-8 px-4">
            <div className="max-w-full">
              {/* first section  */}
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-[#EDEDED]">
                  Simplify Event Planning and Management with a Platform
                  Designed for Success
                </h1>
                <p className="text-md my-6 px-10 text-[#c7c7c7]">
                  Take control of every aspect of your events, from user
                  registration to attendance tracking and speaker management.
                  Our secure and user-friendly platform ensures a seamless
                  experience for you and your audience.
                </p>
                <button className="foreground text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition hover:text-[#514CFE]">
                  Get started
                </button>
              </div>
              {/* space */}
              <div className="md:h-40 h-32"></div>
              {/* second section */}
              <div className="relative">
                <div className="h-auto md:w-[600px] md:max-w-[600px] w-80 max-w-80 absolute m-auto inset-x-0 md:-top-40 -top-24">
                  <img src={mac} alt="Mac Mockup" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* extra space */}
        <div className="bg-primary">
          <div className="h-32 md:h-60"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-900 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Expand Your Reach",
                description: "A complete solution for core economy standards.",
              },
              {
                title: "Higher Annualized Growth",
                description: "A complete solution for core economy standards.",
              },
              {
                title: "Book Your Provider",
                description:
                  "Accelerates your decisions with multi-industrial connections.",
              },
              {
                title: "Secure Multi-Usable",
                description: "Core economy information progressive and robust.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                plan: "Basic",
                price: "$65.99",
                features: [
                  "10 GB Bandwidth",
                  "Business Analytics",
                  "24-hour Support",
                ],
              },
              {
                plan: "Standard",
                price: "$75.99",
                features: [
                  "50 GB Bandwidth",
                  "Advanced Analytics",
                  "Priority Support",
                ],
              },
              {
                plan: "Premium",
                price: "$85.99",
                features: [
                  "100 GB Bandwidth",
                  "Expert Analysis",
                  "Premium Support",
                ],
              },
            ].map(({ plan, price, features }) => (
              <div
                key={plan}
                className="bg-white text-gray-900 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">{plan}</h3>
                <p className="text-3xl font-bold mb-4">
                  {price} <span className="text-sm font-normal">/ Yearly</span>
                </p>
                <ul className="text-gray-600 mb-6 space-y-2">
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-300">© 2024 SassPack. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
