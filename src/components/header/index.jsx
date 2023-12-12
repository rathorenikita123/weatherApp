import styles from "./style.module.css";
import { RiSunFoggyLine } from "react-icons/ri";
import { IoMdRefreshCircle } from "react-icons/io";

export const Header = ({ refresh, coordinates }) => {
  const handleRefresh = () => {
    const { lat, lon, sunrise, sunset } = coordinates;
    refresh(lat, lon, sunrise, sunset);
  };

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <RiSunFoggyLine /> Weather 99
      </div>
      {coordinates && (
        <button onClick={handleRefresh} className={styles.refresh}>
          <IoMdRefreshCircle />
          Refresh
        </button>
      )}
    </header>
  );
};
