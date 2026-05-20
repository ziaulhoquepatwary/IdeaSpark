import axios from "axios";

async function fetchTrendingIdeas() {
    const response = await axios.get("http://127.0.0.1:5000/api/ideas", {
        params: {
            limit: 6,
            sortBy: "createdAt",
            order: "desc"
        },
        headers: { 'Cache-Control': 'no-store' }
    });

    return response.data?.ideas || response.data || [];
}

export default fetchTrendingIdeas;