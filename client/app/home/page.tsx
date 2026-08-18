import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickLinks from "../components/QuickLinks";
import WeatherWidget from "../components/WeatherWidget";
import QuickActions from "../components/QuickActions";
import BrowseProduce from "../components/BrowseProduce";
import RecentListings from "../components/RecentListings";
import InsightCards from "../components/InsightCards";
import WhyCropsmarket from "../components/WhyCropsmarket";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Hero />
        <QuickLinks />
        <BrowseProduce />
        <InsightCards />
        <WeatherWidget />
        <QuickActions />
        <RecentListings />
        <WhyCropsmarket />
      </main>
      <Footer />
    </div>
  );
}
