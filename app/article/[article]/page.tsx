import fs from 'fs';

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
    return files.map((element) => ({
      slug: element.slice(0, -5)
    }))
}

export default function Type({params}: any){

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
}