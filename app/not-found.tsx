import Link from "next/link";
import Header from "../components/header";
import styles from "../styles/fallback-page.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Header logoLink="/" />
      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="not-found-title">
          <span className={styles.signal} aria-hidden="true" />
          <span className={styles.badge}>Page Not Found</span>
          <span className={styles.code}>404</span>
          <h1 id="not-found-title" className={styles.title}>
            The page you requested does not exist.
          </h1>
          <p className={styles.description}>
            It may have moved, been deleted, or the URL may be incorrect. Use one of the
            options below to continue exploring the portfolio.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryAction}>
              Back to Home
            </Link>
            <Link href="/services" className={styles.secondaryAction}>
              View Services
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
