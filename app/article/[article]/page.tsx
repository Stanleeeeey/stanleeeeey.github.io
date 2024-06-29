import fs from 'fs';
import md from 'markdown-it';
import matter from 'gray-matter';


import styles from "./page.module.css";

export const metadata = {
    title:"Stanisławs Blog",
    description:"Blog by Stanisław Kawulok",
    icons: {
      icon: '/icon.png', // /public path
    },
  }
  
export async function generateStaticParams() {
    
    var files = fs.readdirSync(`public/posts`);

    
    return files.map((element) => {
        
        console.log(element.slice(0, -3));
        return ({
      article: element.slice(0, -3)
    })})
    
}

export default function Page({params}: any){
    const file = fs.readFileSync(`public/posts/${params.article}.md`);

    let { data: frontmatter, content }  = matter(file)
  return (

    <section className={styles.articleWrap}>

      
      <div className = {styles.article} dangerouslySetInnerHTML={{ __html: md().render(content).split(".$").join('<MathJax>\\(').split("$.").join('\\)</MathJax>') }} />
    
      <div className={styles.footer}>
        <p className={styles.author}>{frontmatter.author}</p>
        <p className={styles.date}>{frontmatter.date}</p>
      </div>
    </section>
  );
}
