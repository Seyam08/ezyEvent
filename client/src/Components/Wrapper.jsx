import Header from "./subComponents/Header/Header";

export default function Wrapper() {
  return (
    <div>
      <div className="flex md:flex-row flex-col">
        <div className="bg-secondary basis-full md:basis-1/6 md:min-h-screen">
          <Header />
        </div>
        <div className="bg-primary basis-full md:basis-5/6 min-h-screen">
          page area
        </div>
      </div>
    </div>
  );
}
