import { getIsLoading } from '../../store/api-communication/api-communication.selectors.ts';
import styles from './loading-screen.module.css';
import { useAppSelector } from '../../hook';

export function LoadingScreen() {
  const isLoading = useAppSelector(getIsLoading);

  return isLoading ? (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  ) : null;
}
