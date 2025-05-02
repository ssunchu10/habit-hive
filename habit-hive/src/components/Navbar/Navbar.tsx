// components/Navbar/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { LayoutDashboard, PlusCircle, BarChart2, User } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/create-habit", label: "Create", icon: <PlusCircle size={20} /> },
  { href: "/analytics", label: "Analytics", icon: <BarChart2 size={20} /> },
  { href: "/profile", label: "Profile", icon: <User size={20} /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.href} className={styles.navItem}>
            <Link href={link.href} className={styles.navLink}>
              <div className={`${styles.iconWrapper} ${pathname === link.href ? styles.active : ""}`}>
                {link.icon}
                <span className={styles.label}>{link.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
