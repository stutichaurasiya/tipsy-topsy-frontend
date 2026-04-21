import CategoryPage from "./categorypage";

export default function Page({ params }) {
  return <CategoryPage slug={params.slug} />;
}