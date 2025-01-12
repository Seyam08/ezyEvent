export const getRandomDesignation = () => {
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

  const randomIndex = Math.floor(Math.random() * designations.length);
  return designations[randomIndex];
};
