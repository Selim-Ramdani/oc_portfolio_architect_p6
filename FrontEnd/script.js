// Get request : Fetch categories
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json(); // Décodage JSON de la réponse
  console.log(categories); // Utilisation des données décodées
};

getCategories();

// Get request : Fetch works
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json(); // Décodage JSON de la réponse
  console.log(works); // Utilisation des données décodées
};

getWorks();
