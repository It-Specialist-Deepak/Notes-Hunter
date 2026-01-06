import Feature11 from "./self-component/Home/Feature.jsx";
import Hero from "./self-component/Home/HeroSection.jsx";
import NotesCard from "./self-component/Notes/NotesCard.jsx";
import Feature from "./self-component/Home/Feature.jsx"
import PYPCollection from "./self-component/Home/PYPCollection.jsx";
function HomePage() {
  return (
    <>
      <Hero />
       <section className="bg-gradient-to-br bg-gradient-to-br 
from-[#081a2d] 
via-[#0b3a4a] 
to-[#061622] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text text-transparent mb-4">
            Explore Recent Notes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through the latest notes shared by students and educators.
          </p>
        </div>
      <NotesCard />
      </div>
      </section>
      <PYPCollection />
      <Feature />
    </>
  );
}
export default HomePage;
