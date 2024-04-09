import {
  ServicesFeatures,
  ServicesHero,
  ServicesInfo,
} from "src/components/services";

export function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServicesInfo />
      <ServicesFeatures />
    </div>
  );
}
