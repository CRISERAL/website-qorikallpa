import { getAllServices } from "@/src/api/strapi/getAllServices";

export default async function ServicesList() {
  const services = await getAllServices()
  return <section></section>;
}
