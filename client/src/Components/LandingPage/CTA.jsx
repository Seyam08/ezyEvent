export default function CTA() {
  return (
    <div className="width-holder gradient-bg-6th my-5 border-8 border-[#dedae6] dark:border-[#2b323b] rounded-3xl">
      <div className="p-10 md:p-20 space-y-5 bg-landing-bg-3rd bg-cover bg-right bg-no-repeat">
        <h2 className="text-white text-2xl md:text-4xl font-bold">
          Take Control of Your Events Today!
        </h2>
        <p className="max-w-xl text-gray-200 text-base md:text-lg font-medium">
          Create, manage, and track your events with ease. Start organizing
          smarter with our secure platform.
        </p>
        <div className="space-x-2 md:space-x-5">
          <button className="bg-[#efefef] dark:bg-gray-800 text-base py-1 px-4 md:py-2 md:px-6 rounded-full font-bold text-gray-800 dark:text-[#EDEDED] border-2 border-white dark:border-gray-800 hover:bg-transparent hover:text-white dark:hover:text-gray-800 transition-colors">
            Host an event
          </button>
          <button className="bg-transparent text-base py-1 px-4 md:py-2 md:px-6 rounded-full font-bold text-white dark:text-gray-800 border-2 border-white dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white transition-colors">
            Join an event
          </button>
        </div>
      </div>
    </div>
  );
}
