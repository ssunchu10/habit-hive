'use client'

import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.page}>
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dbqyagrzd/video/upload/v1726401024/file_ko4vzt.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className={styles.logo}>
        <Image
          src="/favicon1.svg"
          alt="Habit Hive Logo"
          width={40}
          height={40}
        />
      </div>

      <div className={styles.overlay}>
        <div className={styles.textSection}>
          <h1>Welcome to Habit Hive</h1>
          <p>Your space to build habits, your way.</p>
        </div>
        <div className={styles.actions}>
          <Link href="/register" className={styles.buttonSecondary}>
            Sign Up
          </Link>
          <Link href="/login" className={styles.button}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
