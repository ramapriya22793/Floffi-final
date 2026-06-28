# Floffi Admin Vercel Deployment Guide

This guide describes how to deploy the Floffi Admin Dashboard to Vercel. 

We have updated the code to support a dedicated admin-only deployment. By configuring a single environment variable, you can make the entire website load the Admin Panel directly at the root URL (e.g., `https://your-admin-domain.vercel.app/`).

---

## Prerequisites

Before starting, make sure you have:
1. A **Vercel account** (sign up for free at [vercel.com](https://vercel.com)).
2. Your Floffi project repository pushed to **GitHub**, **GitLab**, or **Bitbucket**.
3. Your **Supabase Credentials**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## Deployment Options

You can deploy this codebase in two ways depending on your needs:

| Option | Behavior | How to Configure |
| :--- | :--- | :--- |
| **Option A: Dedicated Admin Site (Recommended)** | The deployment will **only** serve the Admin Panel. Visiting `https://domain.com/` will immediately load the admin login page. | Set the environment variable `VITE_ADMIN_ONLY=true`. |
| **Option B: Shared Deployment** | The customer store runs at `https://domain.com/` and the admin panel is accessed via `https://domain.com/admin`. | Leave `VITE_ADMIN_ONLY` blank or unset. |

---

## Step-by-Step Vercel Deployment Instructions

Follow these steps to deploy:

### Step 1: Create a New Project on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **Add New...** button in the top right and select **Project**.
3. Import your GitHub repository containing the Floffi project.

### Step 2: Configure Project Settings
In the **Configure Project** screen, adjust the following settings:

1. **Framework Preset**: Select **Vite** (if it's not automatically selected).
2. **Root Directory**:
   - Since the Vite project is nested inside the repo folder, click **Edit** next to Root Directory.
   - Select the nested folder `Floffi-final-main`.
   - Click **Continue**.
3. **Build & Development Settings**:
   - Keep the defaults (Build command: `npm run build`, Output directory: `dist`).

### Step 3: Add Environment Variables
Scroll down to the **Environment Variables** section and add the following keys:

1. **Supabase URL**:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: *(Your Supabase Project URL)*
2. **Supabase Anon Key**:
   - **Key**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: *(Your Supabase Anon/Public Key)*
3. **Standalone Admin Mode** (To deploy *only* the admin dashboard):
   - **Key**: `VITE_ADMIN_ONLY`
   - **Value**: `true`

> [!NOTE]
> If you ever want to run the customer store on this deployment instead, just change `VITE_ADMIN_ONLY` to `false` or delete it from the environment variables in Vercel settings and trigger a redeployment.

### Step 4: Deploy!
1. Click the **Deploy** button.
2. Vercel will build the project and deploy it. It usually takes less than a minute.
3. Once finished, click on the preview image to visit your live site!

---

## Technical Details

We have added a custom routing rewrite file [vercel.json](file:///c:/Users/CHENNAMMAL/Downloads/Floffi-final-main/Floffi-final-main/vercel.json) in your project root. This ensures that:
- Refreshing the browser on the admin panel or internal pages will not cause a **Vercel 404 error**. All routes will automatically rewrite to `index.html`, allowing the React application to handle the navigation properly.
