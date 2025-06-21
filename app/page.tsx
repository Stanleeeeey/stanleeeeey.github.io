


import styles from "./page.module.css";
import fs from 'fs';
import matter from 'gray-matter';
import Script from 'next/script'


export const metadata = {
    title:"Stanleeeeey portfolio",
    description:"Portfolio by Stanisław Kawulok.  ",
    keywords:['Stanisław', "Kawulok", "Portfolio", "Stanleeeeey", "Stanislaw", 'st@n!ey'],
    authors:[{name:"Stanisław Kawulok"}],
    creator:"Stanisław Kawulok",
    siteName:"Stanleeeeey portfolio",
    robots:{
        index:true,
        follow:true,
    },
    icons: {
      icon: '/icon.png', // /public path
    },
  }
  


export default function Home() {

    files = fs.readdirSync('public/posts').reverse();
    const posts = files.map((fileName) => {
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`public/posts/${fileName}`, 'utf-8');
        const { data: frontmatter } = matter(readFile);
        
        return {
          slug,
          frontmatter,
        };
    });


    
    var files = fs.readdirSync(`public/posts`);

  return (
    <main className={styles.main} >
        <Script src="../js/main.js"></Script>
     <section className={styles.landingPage} id ="landing-page">
        <div className={styles.greetingWrap}>
            <h2 id = "greeting" >hi</h2>
            <h1 className={styles.title}>Stanisław Kawulok</h1>
            <h2 className = {styles.nickname}>known as Stanleeeeey or St@n!ey</h2>

            <div className={styles.additionalInfo}>
               <p>and I love coding, board gaming, reading, maths, and listening to good music</p>
            </div>
        </div>
        <canvas id="testing"></canvas>
    </section>

    <section className={styles.projectsSection} id="projects">
        <h1 className = {styles.title}>My projects</h1>
        
        <div className={styles.projectsWrap}>
            <a  href = 'https://github.com/Alotech-cansat/cansat' className={`${styles.project} ${styles.left}`}>

                <div className={styles.topWrap}>
                    <h1>Alotech cansat</h1>
                    <p>code for the alotech cansat project prepared for the ESA cansat competition </p>
                </div>
                <div className={styles.techsWrap}>
                    <p>arduino</p>
                    <p>cpp</p>
                </div>

                
            </a>
            <a className={`${styles.project} ${styles.right}`} href='https://github.com/Stanleeeeey/quotes'>
                <div className={styles.topWrap}>
                    <h1>Quotes</h1>
                    <p>code for website with qoutes</p>
                </div>
                <div className={styles.techsWrap}>
                    <p>python</p>
                    <p >HTML</p>
                    <p>CSS</p>
                    <p >JS</p>
                </div>
            </a>
            <a className={`${styles.project} ${styles.left}`} href="https://github.com/Stanleeeeey/stanleeeeey.github.io">
                <div className={styles.topWrap}>
                    <h1>Source code of the website</h1>
                    <p>check out how was this website built!</p>
                </div>
                <div className={styles.techsWrap}>
                    <p >HTML</p>
                    <p >CSS</p>
                    <p >JS</p>
                    <p >NEXTJS</p>
                </div>    
            </a>
        </div>
        
    </section>

    <section className={styles.blogSection}>
        <h1 className={styles.title}>Blog</h1>
        <div className={styles.blogWrap}>
            <div  className={styles.postWrap} id = "blog">
            {posts.map(({ slug, frontmatter }) => {
                
                return (
                
                    
                    <a key = {slug} href = {`/article/${slug}`} className={styles.post}>
                        <div className={styles.postInfo}>
                            <h3>{frontmatter.title}</h3>
                            
                            <p>{frontmatter.date}</p>
                        </div>
                        <p>{frontmatter.subtitle}</p>
                    </a>

            
                
                )
                
            })}
            </div>
        </div>

    </section>
    </main>
  );
}
