'use client';

import { useEffect } from 'react';
import { ref, onValue, set, onDisconnect, push, serverTimestamp } from 'firebase/database';
import { db } from '../lib/firebase';

export default function AnalyticsTracker() {
  useEffect(() => {
    if (!db) return;

    // ─── PRESENCE TRACKING (Live Visitors) ───────────────────────────────────
    // Firebase's .info/connected is the gold standard for presence detection.
    // It fires TRUE when the client has an active connection, FALSE otherwise.
    const connectedRef = ref(db, '.info/connected');

    let mySessionRef: ReturnType<typeof push> | null = null;

    const unsubConnected = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We are connected — register this session
        mySessionRef = push(ref(db, 'analytics/active_visitors'));

        // Tell Firebase: "when I disconnect, remove my entry immediately"
        onDisconnect(mySessionRef).remove();

        // Now write our presence marker
        set(mySessionRef, { connectedAt: serverTimestamp() });
      }
    });

    // ─── PAGE VIEW TRACKING ───────────────────────────────────────────────────
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const viewsRef = ref(db, 'analytics/total_views');
    const dailyViewsRef = ref(db, `analytics/daily_views/${today}`);

    const hasVisitedThisSession = sessionStorage.getItem('mts_visited');
    if (!hasVisitedThisSession) {
      sessionStorage.setItem('mts_visited', 'true');

      // Increment total views (once per session)
      onValue(viewsRef, (snapshot) => {
        set(viewsRef, (snapshot.val() || 0) + 1);
      }, { onlyOnce: true });

      // Increment today's daily view count (once per session)
      onValue(dailyViewsRef, (snapshot) => {
        set(dailyViewsRef, (snapshot.val() || 0) + 1);
      }, { onlyOnce: true });
    }

    // ─── CLEANUP ──────────────────────────────────────────────────────────────
    return () => {
      // Stop listening to connection state
      unsubConnected();
      // Manually remove our session entry if component unmounts
      if (mySessionRef) {
        set(mySessionRef, null);
      }
    };
  }, []);

  return null;
}
