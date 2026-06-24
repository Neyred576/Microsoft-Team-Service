// Microsoft App Icons as inline SVG components
// Using official Fluent design system colors and shapes

export const AppIcons: Record<string, () => JSX.Element> = {
  Word: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <path fill="#103F91" d="M42 28H22V6h20z"/>
      <path fill="#185ABD" d="M22 6H8C6.9 6 6 6.9 6 8v32c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2V28L22 6z"/>
      <path fill="#103F91" d="M42 28H30V6l12 22z"/>
      <path fill="#fff" d="M16 34l5-20h3l-4 16h6l-4-16h3l5 20h-14z"/>
    </svg>
  ),
  Excel: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <path fill="#0D5C37" d="M42 28H22V6h20z"/>
      <path fill="#107C41" d="M22 6H8C6.9 6 6 6.9 6 8v32c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2V28L22 6z"/>
      <path fill="#0D5C37" d="M42 28H30V6l12 22z"/>
      <path fill="#fff" d="M16 34l4-6-4-6h3l2.5 4.5L24 22h3l-4 6 4 6h-3l-2.5-4.5L19 34h-3z"/>
    </svg>
  ),
  PowerPoint: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <path fill="#B03B14" d="M42 28H22V6h20z"/>
      <path fill="#C43E1C" d="M22 6H8C6.9 6 6 6.9 6 8v32c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2V28L22 6z"/>
      <path fill="#B03B14" d="M42 28H30V6l12 22z"/>
      <path fill="#fff" d="M16 34V22h5c1.7 0 3 .4 3.9 1.2.9.8 1.3 1.9 1.3 3.2 0 1.4-.5 2.5-1.5 3.3-.9.7-2.2 1.1-3.8 1.1H19v3.2h-3zm3-5.4h2c.7 0 1.2-.2 1.6-.5.3-.3.5-.8.5-1.5 0-.6-.2-1.1-.5-1.4-.4-.3-.9-.5-1.7-.5H19v3.9z"/>
    </svg>
  ),
  Outlook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <path fill="#1354B3" d="M42 13H22v22h20z"/>
      <path fill="#0364B8" d="M22 13H6v22h16zM6 35h16v4L6 35z"/>
      <path fill="#0A2767" d="M22 13v22l20 4V9z"/>
      <circle cx="14" cy="24" r="7" fill="#fff"/>
      <ellipse cx="14" cy="24" rx="4" ry="5" fill="#0364B8"/>
      <path fill="#fff" d="M22 13l20-4v26l-20-4z"/>
      <path fill="#e3e3e3" d="M29 18h7v3h-7zm0 5h7v3h-7zm0 5h5v3h-5z" opacity=".7"/>
    </svg>
  ),
  Teams: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <circle cx="30" cy="14" r="6" fill="#5059C9"/>
      <path fill="#5059C9" d="M42 36v-7c0-2.8-2.2-5-5-5H27c-.6 0-1.1.1-1.6.3C27 25.7 28 27.7 28 30v6h14z"/>
      <circle cx="18" cy="13" r="7" fill="#7B83EB"/>
      <path fill="#7B83EB" d="M27 30v7H7c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7z"/>
      <rect fill="#7B83EB" x="7" y="22" width="20" height="15" rx="3"/>
      <path fill="#fff" d="M22 27h-3v9h-2v-9h-3v-2h8v2z"/>
    </svg>
  ),
  OneDrive: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <path fill="#0364B8" d="M29 20.5l-8-8.5c-1-.9-2.3-1.5-3.7-1.5C13.9 10.5 11 13.4 11 17c0 .3 0 .6.1.9L16 18l13 2.5z"/>
      <path fill="#0078D4" d="M29 20.5L16 18l-5.1-.1C8.2 19.2 7 21.5 7 24c0 3.3 2.7 6 6 6h26c3.3 0 6-2.7 6-6 0-2.8-2-5.2-4.8-5.8L29 20.5z"/>
      <path fill="#1490DF" d="M40 20.2C39.1 17.8 36.8 16 34 16c-1.1 0-2.1.3-3 .8L29 20.5l11.2 1.7c.4-.6.7-1.3.8-2z"/>
    </svg>
  ),
  SharePoint: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <circle cx="27" cy="16" r="10" fill="#036C70"/>
      <circle cx="17" cy="26" r="10" fill="#1A9BA1"/>
      <circle cx="27" cy="34" r="8" fill="#37C6D0"/>
      <path fill="#fff" d="M27 16c-1.5 0-3 .3-4.3.9.2 5.2 4.5 9.4 9.7 9.7.6-1.3.9-2.7.9-4.1C33.3 18.9 30.4 16 27 16z"/>
      <path fill="#fff" d="M17 26c0 1.2.2 2.4.7 3.5C19.9 31 22.3 32 25 32c1 0 1.9-.1 2.8-.4.4-1.5.6-3.1.4-4.7-5.1-.4-9.3-4.3-10-9.3C16.5 19.4 17 22.6 17 26z" opacity=".9"/>
    </svg>
  ),
  Forms: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <rect fill="#007735" x="6" y="6" width="36" height="36" rx="4"/>
      <rect fill="#33b966" x="12" y="14" width="24" height="4" rx="2"/>
      <rect fill="#fff" x="12" y="22" width="15" height="4" rx="2"/>
      <rect fill="#fff" x="12" y="30" width="10" height="4" rx="2"/>
      <circle fill="#fff" cx="34" cy="34" r="4"/>
    </svg>
  ),
  Planner: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <rect fill="#217346" x="6" y="6" width="36" height="36" rx="4"/>
      <rect fill="#fff" x="12" y="12" width="10" height="8" rx="1.5"/>
      <rect fill="#fff" x="26" y="12" width="10" height="8" rx="1.5"/>
      <rect fill="#fff" x="12" y="24" width="10" height="8" rx="1.5"/>
      <rect fill="#00b294" x="26" y="24" width="10" height="8" rx="1.5"/>
    </svg>
  ),
  Bookings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <rect fill="#0F6CBD" x="6" y="6" width="36" height="36" rx="4"/>
      <rect fill="#fff" x="14" y="12" width="20" height="4" rx="2"/>
      <rect fill="#fff" x="14" y="20" width="14" height="4" rx="2"/>
      <path fill="#fff" d="M30 32c0-3.3 2.7-6 6-6v-2H12v10h18.2A6 6 0 0 1 30 32z"/>
      <circle fill="#40c6ff" cx="36" cy="32" r="6"/>
      <path fill="#fff" d="M35 29l4 3-4 3V29z"/>
    </svg>
  ),
  Loop: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <rect fill="#8764B8" x="6" y="6" width="36" height="36" rx="18"/>
      <path fill="#fff" d="M24 14c-5.5 0-10 4.5-10 10s4.5 10 10 10h8v-4h-8c-3.3 0-6-2.7-6-6s2.7-6 6-6h6c1.1 0 2-.9 2-2s-.9-2-2-2h-6z"/>
      <path fill="#fff" d="M30 20c-1.1 0-2 .9-2 2s.9 2 2 2h2c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1v4h1c3.9 0 7-3.1 7-7s-3.1-7-7-7h-2z" opacity=".8"/>
    </svg>
  ),
  Defender: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
      <path fill="#0078D4" d="M24 6L8 12v12c0 9 7 17.4 16 20 9-2.6 16-11 16-20V12L24 6z"/>
      <path fill="#50E6FF" d="M24 10L11 15v9c0 7 5.5 13.5 13 16 7.5-2.5 13-9 13-16v-9L24 10z"/>
      <path fill="#fff" d="M21 27l-4-4 1.4-1.4L21 24.2l8.6-8.6L31 17z"/>
    </svg>
  ),
};
