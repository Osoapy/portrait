import { useEffect, useRef, useState } from "react";
import normalIcon from "./assets/mark.svg";
import notificationIcon from "./assets/mark-notification.svg";

const IDLE_AFTER_MS = 45_000;
const SESSION_KEY = "joao-portfolio-return-reminder-shown";

export function useAwayReminder() {
  const [showReminder, setShowReminder] = useState(false);
  const awayRef = useRef(false);

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    let idleTimer = 0;
    let lastPointerMove = 0;
    let shownWithoutStorage = false;
    if (favicon) favicon.href = normalIcon;

    const becomeAway = () => {
      if (awayRef.current) return;
      awayRef.current = true;
      if (favicon) favicon.href = notificationIcon;
    };

    const armIdleTimer = () => {
      window.clearTimeout(idleTimer);
      if (!document.hidden) {
        idleTimer = window.setTimeout(becomeAway, IDLE_AFTER_MS);
      }
    };

    const returnToSite = () => {
      if (document.hidden) return;
      if (awayRef.current) {
        awayRef.current = false;
        if (favicon) favicon.href = normalIcon;
        try {
          if (sessionStorage.getItem(SESSION_KEY) !== "shown") {
            sessionStorage.setItem(SESSION_KEY, "shown");
            setShowReminder(true);
          }
        } catch {
          if (!shownWithoutStorage) {
            shownWithoutStorage = true;
            setShowReminder(true);
          }
        }
      }
      armIdleTimer();
    };

    const onPointerMove = () => {
      const now = Date.now();
      if (now - lastPointerMove < 1000) return;
      lastPointerMove = now;
      returnToSite();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.clearTimeout(idleTimer);
        becomeAway();
      } else {
        returnToSite();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", returnToSite, { passive: true });
    window.addEventListener("keydown", returnToSite);
    window.addEventListener("scroll", returnToSite, { passive: true });
    window.addEventListener("focus", returnToSite);
    document.addEventListener("visibilitychange", onVisibilityChange);
    armIdleTimer();

    return () => {
      window.clearTimeout(idleTimer);
      if (favicon) favicon.href = normalIcon;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", returnToSite);
      window.removeEventListener("keydown", returnToSite);
      window.removeEventListener("scroll", returnToSite);
      window.removeEventListener("focus", returnToSite);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return { showReminder, closeReminder: () => setShowReminder(false) };
}
