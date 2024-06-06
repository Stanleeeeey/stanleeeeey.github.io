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

/*
export default function Page({params}: any){

    const file = JSON.parse(fs.readFileSync(`public/posts/${params.article}.json`, 'utf-8'));
 
    return(
        <section className={styles.articleWrap}>
            <div className={styles.article}>
            <h1 className={styles.title}>{file['title']}</h1>
            <div className={styles.articleText}>
                <h2 className={styles.subtitle}>{file['subtitle']}</h2>

            
                {file['text'].map((element: string ) => {
                    return (<p key = {element} className={styles.paragraph} >&emsp; {element}</p>)
                })}
            </div>
            <div className={styles.footer}>
                <p className={styles.author}>{file['author']}</p>
                <p className={styles.date}>{file['date']}</p>
            </div>
            <div className={styles.morePosts}>
                
                <a href="/#blog">more posts</a>
            </div>
            </div>

      </section>
    )
}*/