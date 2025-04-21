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
export const searchQuery = async (params: SearchParams) => {
  try {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })

    console.log(`Sending search request: ${searchParams.toString()}`)

    const response = await instance.get(`/search/query?${searchParams.toString()}`, {
      timeout,
    })
    // console.log(`Search response received with ${response.data.results.length} results`)

    // Log the types of results received
    // const courseResults = response.data.results.filter((r: { type: string; }) => r.type === "course").length
    // const instructorResults = response.data.results.filter((r: { type: string; }) => r.type === "instructor").length
    // console.log(`Results breakdown: ${courseResults} courses, ${instructorResults} instructors`);
    console.log("RESPONSE", response.data)

    return response.data
  } catch (error) {
    console.error("Error in searchQuery:", error)
    throw error
  }
}