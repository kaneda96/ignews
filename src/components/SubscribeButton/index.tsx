import styles from "./styles.module.scss";

interface SubscribeButtonprops {
  priceId: string;
}

export function SubcribeButton({ priceId }: SubscribeButtonprops) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
