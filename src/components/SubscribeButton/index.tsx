import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/client";
import { api } from "../../Services/api";
import { getStripeJs } from "../../Services/stripe-js";
import { useRouter } from "next/dist/client/router";
import { route } from "next/dist/next-server/server/router";

interface SubscribeButtonprops {
  priceId: string;
}

export function SubcribeButton({ priceId }: SubscribeButtonprops) {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    console.log(session);

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}
