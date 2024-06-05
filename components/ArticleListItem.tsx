import Link from "next/link" // Importing Link component from Next.js
import type { ArticleItem } from "@/types" // Importing ArticleItem type from custom types

// Define Props interface for ArticleItemList component
interface Props {
  category: string // Type for category (string)
  articles: ArticleItem[] // Type for articles (array of ArticleItem)
}

// Define ArticleItemList functional component receiving Props as input
const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <div className="flex flex-col gap-5"> {/* Container div with vertical flex layout and spacing */}
      <h2 className="font-cormorantGaramond text-4xl">{category}</h2> {/* Category title */}
      <div className="flex flex-col gap-2.5 font-poppins text-lg"> {/* Container div for article links */}
        {/* Map over articles array to render each article as a Link component */}
        {articles.map((article, id) => (
          <Link
            href={`/${article.id}`} // Specify the article URL based on its ID
            key={id} // Use the array index as the unique key for each Link component
            className="text-neutral-900 hover:text-amber-700 transition duration-150" // Styling for the Link component
          >
            {article.title} {/* Display the article title as the link text */}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ArticleItemList // Export ArticleItemList as the default export of this module
