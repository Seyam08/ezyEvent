import Header from "./subComponents/Header/Header";

export default function Wrapper() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="bg-secondary basis-1/6 min-h-screen">
          <Header />
        </div>
        <div className="bg-primary basis-5/6 min-h-screen">page area</div>
      </div>
    </div>
  );
}
