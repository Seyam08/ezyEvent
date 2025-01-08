import mac from "../../assets/mac_mockup.svg";
import CTA from "../../Components/LandingPage/CTA";
import Features from "../../Components/LandingPage/Features";
import UseCase from "../../Components/LandingPage/UseCase";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";
import Footer from "../../partials/PublicComponent/Footer/Footer";
import Header from "../../partials/PublicComponent/Header/Header";

export default function LandingPage() {
  const fadeInRef = useFadeInOnScroll();
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="gradient-bg-2nd" id="hero">
        <div className="bg-landing-bg bg-cover bg-right-bottom bg-fixed relative">
          <Header sticky={true} />
          {/* space */}
          <div className="md:h-32 h-28"></div>
          <div className="width-holder py-8 px-4">
            <div className="max-w-full">
              {/* first section  */}
              <div className="max-w-2xl 2xl:max-w-3xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-[#EDEDED] animate-fade-up">
                  Seamless Event Management, User Control, and Role-Based
                  Access—All in One Place
                </h1>
                <p className="text-md my-6 px-10 text-[#c7c7c7] animate-fade-up">
                  Simplify event creation, user authentication, and attendance
                  tracking with our secure and scalable solution.
                </p>
                <div className="space-x-4">
                  <button className="foreground-2nd text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-100 bg-opacity-20 border border-gray-300 transition hover:text-[#514CFE] animate-fade-down animate-duration-500">
                    Get started
                  </button>
                  <button className="foreground text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 border border-transparent transition hover:text-[#514CFE] animate-fade-down animate-duration-500">
                    Explore
                  </button>
                </div>
              </div>
              {/* space */}
              <div className="md:h-40 h-32"></div>
              {/* second section */}
              <div className="relative">
                <div className="h-auto md:w-[600px] md:max-w-[600px] w-80 max-w-80 absolute m-auto inset-x-0 md:-top-40 -top-24 animate-fade-down animate-duration-500">
                  <img
                    src={mac}
                    alt="Mac Mockup"
                    className="w-full"
                    loading="lazy"
                  />
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
      <section className="bg-primary" id="features">
        <Features />
      </section>

      {/* UseCase Section */}
      <section className="gradient-bg-5th" id="uses">
        <div
          className="bg-landing-bg-2nd bg-contain bg-top bg-no-repeat fadeIn"
          ref={fadeInRef}
        >
          <UseCase />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div>
          <CTA />
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
