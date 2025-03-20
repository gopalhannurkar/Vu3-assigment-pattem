import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async ({ limit = 20, skip = 0, search = '', categories = [] }) => {
    try {
        let url = search
            ? `${API_URL}/search?q=${search}&limit=${limit}&skip=${skip}`
            : `${API_URL}?limit=${limit}&skip=${skip}`;

        // Filter by categories if any are selected
        if (categories.length > 0) {
            url += `&category=${categories.join(',')}`;
        }

        const response = await axios.get(url);
        return response.data; // Returns { products: [], total: 100 }
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [], total: 0 }; // Return empty data in case of error
    }
};