import {
  HomeFeaturesMobile,
  HomeHero,
  HomeInfo,
  HomeFeaturesDesktop,
  HomeTeamMembers,
  HomeArtistsWorks,
  HomeArtists,
  // HomeGeneratedArts,
} from "src/components/home";
import useWindowSize from "src/hooks/useWindowSize";

export function HomePage() {
  const { width } = useWindowSize();
  return (
    <>
      <HomeHero />
      {/* <HomePartners /> - temporary we are not using that component... */}
      <HomeInfo />
      {width >= 834 ? <HomeFeaturesDesktop /> : <HomeFeaturesMobile />}
      <HomeArtists />
      <HomeArtistsWorks />
      <HomeTeamMembers />
      {/* <HomeGeneratedArts /> - temporary we are not using that component... */}
    </>
  );
}
