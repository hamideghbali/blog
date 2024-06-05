import fs from "fs"
import matter from "gray-matter"
import path from "path"
import moment from "moment"
import { remark } from "remark"
import html from "remark-html"

import type { ArticleItem } from "@/types"

// Define the directory where article Markdown files are located
const articlesDirectory = path.join(process.cwd(), "articles")

// Function to retrieve and sort articles based on date
const getSortedArticles = (): ArticleItem[] => {
  // Read filenames of all Markdown files in the articles directory
  const fileNames = fs.readdirSync(articlesDirectory)

  // Map each filename to extract article metadata and return an array of articles
  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "") // Extract article ID from filename

    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf-8") // Read file contents

    const matterResult = matter(fileContents) // Parse front matter of the Markdown file

    // Extract article metadata (ID, title, date, category) from the front matter
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
    }
  })

  // Sort articles based on their date using Moment.js for date parsing and comparison
  return allArticlesData.sort((a, b) => {
    const format = "DD-MM-YYYY"
    const dateOne = moment(a.date, format)
    const dateTwo = moment(b.date, format)
    return dateTwo.isBefore(dateOne) ? -1 : dateOne.isBefore(dateTwo) ? 1 : 0
  })
}

// Function to categorize sorted articles by their category
export const getCategorisedArticles = (): Record<string, ArticleItem[]> => {
  const sortedArticles = getSortedArticles() // Retrieve sorted articles
  const categorisedArticles: Record<string, ArticleItem[]> = {} // Initialize object to store categorized articles

  // Iterate over each sorted article and categorize them by their category
  sortedArticles.forEach(article => {
    if (!categorisedArticles[article.category]) {
      // Create a new array for the category if it doesn't exist
      categorisedArticles[article.category] = []
    }
    // Add the article to the corresponding category array
    categorisedArticles[article.category].push(article)
  })

  // Return the object containing categorized articles
  return categorisedArticles
}

// Function to retrieve detailed data for a specific article ID
export const getArticleData = async (id: string) => {
  const fullPath = path.join(articlesDirectory, `${id}.md`) // Get full path of the Markdown file

  const fileContents = fs.readFileSync(fullPath, "utf-8") // Read file contents

  const matterResult = matter(fileContents) // Parse front matter of the Markdown file

  // Process Markdown content to HTML using remark and remark-html plugins
  const processedContent = await remark().use(html).process(matterResult.content)
  
  const contentHtml = processedContent.toString() // Get HTML content as string

  // Format article data (ID, title, category, formatted date) to be returned
  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM Do YYYY")
  }
}
