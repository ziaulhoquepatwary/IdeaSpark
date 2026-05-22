import axios from "axios";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchTrendingIdeas() {
    const response = await axios.get(`${API}/api/ideas`, {
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