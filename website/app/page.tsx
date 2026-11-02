import Feed from "./feed";
import { SummaryCarousel } from "./summary-carousel";
import Welcome from "./welcome";
import { carouselCopy, summaryCards } from "./welcome-data";

// The home page: the welcome (what this is, the countdown, and "How much time do you have?" with a
// reading path for each answer) in the old hero's place, then the summary posts in a carousel,
// newest first, then the live feed. Decided by orchestration on Alex's 17:5x direction.

export default function Home() {
  return (
    <main className="home">
      <Welcome />
      <SummaryCarousel heading={carouselCopy.heading} intro={carouselCopy.intro} cards={summaryCards()} />
      <Feed />
    </main>
  );
}
