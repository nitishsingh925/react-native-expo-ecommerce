import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

export function useAuthHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const finish = () => {
      setHydrated(true);
      clearTimeout(timeout);
    };

    const unsub = useAuthStore.persist.onFinishHydration(finish);

    if (useAuthStore.persist.hasHydrated()) {
      finish();
    } else {
      // Fallback in case hydration event never fires
      timeout = setTimeout(finish, 500);
    }

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  return hydrated;
}
