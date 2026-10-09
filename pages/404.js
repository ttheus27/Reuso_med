import styles from "@/styles/404.module.scss";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className={styles.containerTotal}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div id="scene" className={styles.scene} data-hover-only="false">
            <div className={styles.circle}></div>

            <div className={styles.one}>
              <div className={styles.content}>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
              </div>
            </div>

            <div className={styles.two}>
              <div className={styles.content}>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
              </div>
            </div>

            <div className={styles.three}>
              <div className={styles.content}>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
              </div>
            </div>

            <p className={styles.p404}>404</p>
            <p className={styles.p404}>404</p>
          </div>

          <div className={styles.text}>
            <article>
              <p>
                OPS! Parece que você se perdeu. Volte para a página inicial para
                navegar entre os eventos!
              </p>
              <Link href="/">
                <button>voltar para home!</button>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </section>
  );
}
