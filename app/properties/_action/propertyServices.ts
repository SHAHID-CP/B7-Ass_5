export async function getCategories() {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      next: { revalidate: 3600 }, // 1 hour caching
    });
    if (!res.ok) return [];
    const result = await res.json();
    const categories = result.data;
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getProperties(searchParams: { search?: string; categoryId?: string }) {
  try {
    const query = new URLSearchParams();
    if (searchParams.search) query.append("search", searchParams.search);
    if (searchParams.categoryId) query.append("categoryId", searchParams.categoryId);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${query.toString()}`, {
      cache: "no-store", // Realtime search results
    });

    if (!res.ok) return [];
    const result = await res.json();
    const properties = result.data.items;
    return properties;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
}