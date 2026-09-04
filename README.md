# ⚡ Gler — Next-Gen HR & Service Management Dashboard 🚀

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0-5A0E2D?style=for-the-badge&logo=daisyui)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

**[🌐 Visit Live Application](https://gler-omega.vercel.app/human-resources)**

<p align="center">
  <img src="https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif" alt="Confused John Travolta Gler Preview" width="500" />
</p>

</div>

---

## 🌟 Overview

**Gler** is a high-performance administrative dashboard designed to streamline service provider workflows, human resource data tables, and financial forecasting. Built with **Next.js 16 (Turbopack)** and styled using **DaisyUI + Tailwind CSS**, Gler delivers dynamic theme swapping, real-time URL state synchronization, and an interactive UX with zero layout flashes.

---

## 🌐 Live Production Deployment

Access the hosted application on Vercel:

👉 **[https://gler-omega.vercel.app/human-resources](https://gler-omega.vercel.app/human-resources)** 👈

---

## 🛠️ Tech Stack & Magic Ingredients

| Category | Technology | Usage in Gler |
| :--- | :--- | :--- |
| **Framework** | ⚛️ **Next.js 16** (App Router) | Server-side rendering, routing, and static page generation via Turbopack |
| **Language** | 📘 **TypeScript** | Strict static type-checking and interface definitions |
| **Styling** | 🎨 **Tailwind CSS** | Utility-first CSS engine for modular component architecture |
| **UI Library** | 🌼 **DaisyUI 5** | Accessible semantic color tokens (`bg-base-100`, `text-primary`) |
| **Theme Engine** | 🌙 **`next-themes`** | Dynamic HTML root dark/light mode toggling |
| **Toast Engine** | 🍞 **`react-hot-toast`** | Lightweight, animated global user feedback popups |
| **Icons** | 🎭 **`react-icons`** | High-density vector icons (FontAwesome / Lucide) |
| **Deployment** | 🚀 **Vercel** | CI/CD automated edge deployment pipeline |

---

## 🔥 Key Features

* 🌓 **Instant Theme Engine:** Swaps active DaisyUI themes (`light` / `synthwave`) system-wide using `next-themes` without re-rendering delays or hydration mismatches.
* 🔍 **Real-time URL Search Synchronization:** Search parameters instantly sync with the browser address bar (`useSearchParams` + `useRouter`) wrapped inside React `<Suspense>` boundaries for full static generation compatibility.
* 🔔 **Integrated Developer Feedback:** Action buttons trigger customized global toast notifications letting users know about features currently under development.
* 🎭 **Easter Egg 404 Page:** Custom error handling page with animated GIF illustrations, screen-shake effects, and randomized excuse generators.

<p align="center">
  <img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" alt="Rocket launch GIF" width="400" />
</p>

---

## 🚀 Local Development Setup Guide

### Prerequisites
* **Node.js**: `v18.x` or higher
* **npm**: `v9.x` or higher

### Step-by-Step Installation

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/your-username/gler.git](https://github.com/your-username/gler.git)
   cd gler