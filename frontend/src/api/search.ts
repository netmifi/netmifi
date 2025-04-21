import instance from "./instance";

const timeout = 60 * 1000; //1 minute in milliseconds

export const suggestions = async (credentials: { q: string }) => {
    // for login request
    const { q } = credentials;
    const response = await instance.get(`/search/suggestion?q=${encodeURIComponent(q)}`, {
        timeout,
    });
    console.log(response.data.data)
    return response.data.data;
};

// Search query function
export const searchQuery = async (credentials: {
    q: string
    type?: string
    page?: number
    limit?: number
  })=> {
    const { q, type, page = 1, limit = 10 } = credentials
  
    let url = `/search/query?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`
  
    if (type) {
      url += `&type=${encodeURIComponent(type)}`
    }
  
    const response = await instance.get(url, {
      timeout,
    })
  
    return response.data
  }