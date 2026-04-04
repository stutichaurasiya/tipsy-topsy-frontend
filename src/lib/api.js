const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Get all products
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  return res.json();
}