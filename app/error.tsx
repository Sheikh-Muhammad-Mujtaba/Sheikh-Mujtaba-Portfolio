"use client";

import Link from "next/link";
import { useEffect } from "react";
import Header from "../components/header";
import styles from "../styles/fallback-page.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.page}>
      <Header logoLink="/" />
      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="error-title">
          <span className={styles.signal} aria-hidden="true" />
          <span className={styles.badge}>Unexpected Error</span>
          <span className={styles.code}>500</span>
          <h1 id="error-title" className={styles.title}>
            Something went wrong while loading this page.
          </h1>
          <p className={styles.description}>
            The issue has been logged. You can try again now, go back to the homepage, or
            continue to the services section.
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={() => reset()} className={styles.primaryAction}>
              Try Again
            </button>
            <Link href="/" className={styles.secondaryAction}>
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
