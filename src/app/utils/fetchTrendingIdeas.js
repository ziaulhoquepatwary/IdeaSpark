async function fetchTrendingIdeas() {
    const res = await fetch(
        "http://localhost:5000/api/ideas?limit=6&sortBy=createdAt&order=desc",
        { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.ideas;
}

export default fetchTrendingIdeas;