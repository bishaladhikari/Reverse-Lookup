// components/Sidebar.tsx
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css'; // Assuming you have CSS Module for sidebar

const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <p>Settings</p>
          </Link>
        </li>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
