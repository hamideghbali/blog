import Link from "next/link" // Importing Link component from Next.js
import { ArrowLeftIcon } from "@heroicons/react/24/solid" // Importing ArrowLeftIcon from Heroicons
import { getArticleData } from "@/lib/articles" // Importing getArticleData function

// Define the Article functional component
const Article = async ({ params }: { params: { slug: string } }) => {
  // Fetch article data based on the provided slug parameter
  const articleData = await getArticleData(params.slug)

  // Return JSX to render the article page
  return (
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5"> {/* Main section with responsive layout */}
      <div className="flex justify-between font-poppins"> {/* Header section with navigation */}
        {/* Link to navigate back to home page */}
        <Link href={"/"} className="flex flex-row gap-1 place-items-center"> {/* Using Next.js Link for client-side navigation */}
          <ArrowLeftIcon width={20} /> {/* Back arrow icon */}
          <p>back to home</p> {/* Text for back navigation */}
        </Link>
        <p>{articleData.date.toString()}</p> {/* Display article date */}
      </div>
      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} // Render HTML content from articleData
      />
    </section>
  )
}

export default Article // Export Article as the default export of this module
