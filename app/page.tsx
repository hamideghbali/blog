import ArticleItemList from "@/components/ArticleListItem" // Importing the ArticleItemList component
import { getCategorisedArticles } from "@/lib/articles" // Importing the getCategorisedArticles function

// Define the HomePage functional component
const HomePage = () => {
  // Call getCategorisedArticles to retrieve categorized articles
  const articles = getCategorisedArticles()

  // Log the fetched articles to the console for debugging
  console.log(articles)

  // Return JSX to render the homepage layout
  return (
    // Main section with responsive layout using Tailwind CSS classes
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      {/* Header section with blog title */}
      <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
        <h1>minimal blog</h1>
      </header>
      {/* Section for displaying articles in a grid */}
      <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
        {/* Check if articles is not null before rendering */}
        {articles !== null && 
          // Loop through categories in articles object and render ArticleItemList component for each category
          Object.keys(articles).map((article) => (
            <ArticleItemList
              category={article} // Pass category name as prop to ArticleItemList
              articles={articles[article]} // Pass articles array for the category as prop to ArticleItemList
              key={article} // Use category name as unique key for React's list rendering
            />
          ))}
      </section>
    </section>
  )
}

// Export HomePage as the default export of this module
export default HomePage
