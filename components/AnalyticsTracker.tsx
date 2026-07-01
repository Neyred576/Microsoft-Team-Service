'use client';

import { useEffect } from 'react';
import { ref, onValue, set, onDisconnect, push } from 'firebase/database';
import { db } from '../lib/firebase';

export default function AnalyticsTracker() {
  useEffect(() => {
    if (!db) return;

    // Track Live Visitors (Presence)
    const activeVisitorsRef = ref(db, 'analytics/active_visitors');
    
    // We create a unique reference for this specific user session
    const mySessionRef = push(activeVisitorsRef);
    
    // Set the value to true to indicate we are online
    set(mySessionRef, true);
    
    // When I disconnect, remove my session from the active_visitors list
    onDisconnect(mySessionRef).remove();

    // Track Weekly Views and Daily Views
    const viewsRef = ref(db, 'analytics/total_views');
    
    // Get current date string (YYYY-MM-DD) for daily tracking
    const today = new Date().toISOString().split('T')[0];
    const dailyViewsRef = ref(db, `analytics/daily_views/${today}`);
    
    const hasVisitedThisSession = sessionStorage.getItem('mts_visited');
    if (!hasVisitedThisSession) {
      sessionStorage.setItem('mts_visited', 'true');
      
      // Increment total views
      const unsubscribeTotal = onValue(viewsRef, (snapshot) => {
        const currentViews = snapshot.val() || 0;
        set(viewsRef, currentViews + 1);
        unsubscribeTotal();
      }, { onlyOnce: true });

      // Increment daily views
      const unsubscribeDaily = onValue(dailyViewsRef, (snapshot) => {
        const currentDailyViews = snapshot.val() || 0;
        set(dailyViewsRef, currentDailyViews + 1);
        unsubscribeDaily();
      }, { onlyOnce: true });
    }

    // Cleanup when component unmounts (e.g. user leaves site)
    return () => {
      set(mySessionRef, null);
    };
  }, []);

  return null; // This component doesn't render anything
}
