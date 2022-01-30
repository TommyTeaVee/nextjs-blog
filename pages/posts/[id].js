import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from '../../lib/posts'
import Head from "next/head";
import utilStyles from '../../styles/util.module.css'


export async function getStaticPaths() {
    const paths = getAllPostsIds()
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps ({params}){
    const postData = await getPostData(params.id)
      return {
          props: {
              postData
          }
      }
  }
export default function Posts({postData}){
    return(
    <Layout>
<Head>
    <title>
        {postData.title}
    </title>
</Head>
        {postData.title}
        <br />
        {postData.id}
        <br/>
       <Date dateString={postData.date} />
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
    </Layout>
    )
}