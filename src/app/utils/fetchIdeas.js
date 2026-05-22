const API = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchIdeas({ search, category, sortBy, page }) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);
    if (sortBy && sortBy !== "createdAt") params.set("sortBy", sortBy);
    if (page) params.set("page", page);
    params.set("limit", "12");


    const res = await fetch(
        `${API}/api/ideas?${params.toString()}`,
        { cache: "no-store" }
    );

    if (!res.ok) return { ideas: [], pagination: { total: 0, page: 1, totalPages: 0 } };

    return res.json();
}

export default fetchIdeas;