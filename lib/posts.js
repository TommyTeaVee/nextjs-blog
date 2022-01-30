import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData(){
    //Get filenames under posts
    const  fileNames = fs.readdirSync(postsDirectory)
    const  allPostsData = fileNames.map(fileName =>{

        //remove .md from filenames to get an ID
     const id = fileName.replace(/\.md$/,'')
    
     //Read markdown files as a string
     const fullpath = path.join(postsDirectory, fileName)
     const fileContents = fs.readFileSync(fullpath, 'utf8')

     //Use gray-matter to pass metadata section
     const matterResult= matter(fileContents)
    
    //Combine data with the ID
      return {
          id,
           ...matterResult.data

      }
    })

    //Sort all posts by date
    return allPostsData.sort(({Date:a}, {Date:b})=>{
        if(a < b){
            return 1
        } else if(a > b){
            return -1
        }else {
            return 0
        }
    })
}
    
export function getAllPostsIds(){
        const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
    }

    export async function getPostData(id) {
        const fullPath = path.join(postsDirectory, `${id}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
      
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)
        // Use remark to convert markdown into HTML string
  const processedContent = await remark()
  .use(html)
  .process(matterResult.content)
const contentHtml = processedContent.toString()
        // Combine the data with the id
        return {
          id,
          contentHtml,
          ...matterResult.data
        }
      }
