export const fetchFacets = async (filters) => {
  try {
    const filterBody = JSON.stringify(filters);
    console.log({ filterBody });
    const response = await fetch(
      process.env.NEXT_PUBLIC_CURRENT_SITE + "/api/search-facets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: filterBody, // Send selected filters
      },
    );

    if (!response.ok) {
      // throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching facets:", error);
    return null;
  }
};
