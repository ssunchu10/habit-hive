import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    })();
  }, []);

  return user;
}
