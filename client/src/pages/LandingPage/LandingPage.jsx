import Header from "../../partials/PublicComponent/Header/Header";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-900 text-white font-sans">
      {/* Header Section */}

      <Header />
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Conduct more customers in a better way
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Streamline your workflow with our advanced analytics
        </p>
        <div className="space-x-4">
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md">
            Get Started Now
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-md">
            Watch Trailer
          </button>
        </div>
      </section>

      {/* Logo Section */}
      <section className="flex justify-center items-center py-8 space-x-8">
        {["GQ", "The Guardian", "NY Times", "Mashable", "CNN", "HuffPost"].map(
          (logo) => (
            <div key={logo} className="text-xl font-semibold">
              {logo}
            </div>
          )
        )}
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
