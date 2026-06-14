# Nexora - Community & Event Management Platform

> **Rise above. Together.**

Nexora is a modern, high-fidelity community and event management platform built with React, TypeScript, and TailwindCSS. It features a customizable community chat workspace, interactive stats dashboards, live events tracking, and a digital certificates verification system.

---

## 🌟 Key Features

*   **📊 Premium Analytics Dashboard (`/dashboard`)**
    *   Dynamic quick action tiles for event creation, certificate lookup, and community hub access.
    *   Interactive visual tracking with live monthly attendance bar charts (Framer Motion animations).
    *   Leaderboard showcasing top community contributors and event organizers.
*   **💬 Custom Community Workspaces (`/community`)**
    *   A clean, custom Discord-inspired 3-pane interface tailored with Nexora's signature warm/amber accents.
    *   Real-time categorizable community hub channels (Tech, Gaming, Arts, Sports, Business).
    *   Dynamic chat bubbles with integrated attachment and emoji triggers.
    *   Collapsible active members list for clean focus.
*   **📅 Event Hub (`/events`)**
    *   Comprehensive list of upcoming events with dynamic attendee capacity meters.
    *   Interactive "Create Event" engine.
    *   Full-page detailed view for individual events.
*   **🎓 Certificate Generation & Verification (`/certificates`)**
    *   Generate and export custom professional certificates.
    *   Unique public verification routes (`/verify/:id`) to check authenticity instantly.

---

## 🛠️ Tech Stack

*   **Framework:** React 19 + TypeScript + Vite
*   **Styling:** TailwindCSS + Custom Vanila CSS overrides
*   **Animations:** Framer Motion
*   **UI Components:** Radix UI primitives & Lucide Icons
*   **State Management / Querying:** TanStack React Query

---

## 🚀 Getting Started

Follow these steps to run Nexora locally on your machine:

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/rohithrk7/nexora.git
cd nexora

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and use the template from `.env.example`:
```bash
cp .env.example .env
```
Fill in your Firebase credentials in the `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application.

---

## 📄 License
This project is private and created for community showcase purposes.
