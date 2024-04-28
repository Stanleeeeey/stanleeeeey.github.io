


import styles from "./page.module.css";
import fs from 'fs';

export const metadata = {
    title:"Stanisławs portfolio",
    description:"Website by Stanisław Kawulok",
    icons: {
      icon: '/icon.png', // /public path
    },
  }
  


export default function Home() {


    const now = new Date();
    const hours = now.getHours();
    let greeting = "Hi I'm";
    if(hours <= 12){greeting ="Good morning! I'm"}
    else if(hours <= 18){greeting = "Good afternoon! I'm"}
    else {greeting = "Good evning! I'm"}
    
    var files = fs.readdirSync(`public/posts`);

  return (
    <main className={styles.main} >
     <section className={styles.landingPage} id ="landing-page">
        <div className={styles.greetingWrap}>
            <h2 id = "greeting" >{greeting}</h2>
            <h1 className={styles.title}>Stanisław Kawulok</h1>
            <h2 className = {styles.nickname}>or Stanleeeeey</h2>

            <div className={styles.additionalInfo}>
               <p>and I love coding, board gaming, reading, maths, and listening to good music</p>
            </div>
        </div>
        <canvas id="testing"></canvas>
    </section>

    <section className={styles.projectsSection} id="projects">
        <h1 className = {styles.title}>My projects</h1>
        
        <div className={styles.projectsWrap}>
            <a  href = 'https://alotech-cansat.github.io/alotech-website/' className={`${styles.project} ${styles.left}`}>

                <div className={styles.topWrap}>
                    <h1>Alotech cansat</h1>
                    <p>code for  project </p>
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
            <a className={`${styles.project} ${styles.left}`} href="hangman/hangman.html">
                <div className={styles.topWrap}>
                    <h1>Hangman Game</h1>
                    <p>Play hangman online (computer only)</p>
                </div>
                <div className={styles.techsWrap}>
                    <p >HTML</p>
                    <p >CSS</p>
                    <p >JS</p>
                </div>    
            </a>
        </div>
        
    </section>

    <section className={styles.blogSection}>
        <h1 className={styles.title}>Blog</h1>
        <div className={styles.blogWrap}>
            {files.map(element => {
                const file = JSON.parse(fs.readFileSync(`public/posts/${element}`, 'utf-8'));
                return (
                <div key = {element} className={styles.postWrap} id = "blog">
                    
                    <a href = {`/article/${element.slice(0, -5)}`} className={styles.post}>
                        <div className={styles.postInfo}>
                            <h3>{file['title']}</h3>
                            <p>{file['date']}</p>
                        </div>
                        <p>{file['subtitle']}</p>
                    </a>

            
                </div>
                )
        })}
        </div>

    </section>
    </main>
  );
}
