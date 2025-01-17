export const getRandomDesignation = (index) => {
  const designations = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "QA Engineer",
    "DevOps Engineer",
    "Technical Lead",
    "Business Analyst",
    "Front-end Developer",
    "Back-end Developer",
  ];

  // If an index is provided and is valid, return the corresponding designation
  if (typeof index === "number" && index >= 0 && index < designations.length) {
    return designations[index];
  } else {
    // Otherwise, return a random designation
    const randomIndex = Math.floor(Math.random() * designations.length);
    return designations[randomIndex];
  }
};
