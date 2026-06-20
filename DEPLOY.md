# Deploy to GitHub + Vercel

## 1. Push to GitHub

Create a new repository on GitHub (do NOT initialize with README).

```bash
# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/zakarasma-umrah-taxi.git

# Rename branch to main
git branch -M main

# Push
git push -u origin main
```

## 2. Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL` = `https://qdlmzbbbbpphdcqthsrx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkbG16YmJiYnBwaGRjcXRoc3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzIyOTIsImV4cCI6MjA5NzIwODI5Mn0.1K5HbZTR_wz__6Zc-XCHJaAzTdGwWUs-2cjaUL6SOKE`
6. Click **Deploy**

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Link to existing project? **N**
- Which scope? (your username)
- Project name: `zakarasma-umrah-taxi`
- Directory: `./`
- Override build settings? **N** (uses `vercel.json`)

## 3. Environment Variables on Vercel

After first deploy, go to Project Settings > Environment Variables and add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://qdlmzbbbbpphdcqthsrx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkbG16YmJiYnBwaGRjcXRoc3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzIyOTIsImV4cCI6MjA5NzIwODI5Mn0.1K5HbZTR_wz__6Zc-XCHJaAzTdGwWUs-2cjaUL6SOKE` |

Then redeploy.

## 4. Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project > Settings > Domains
2. Add your domain (e.g., `zakarasma.com`)
3. Follow DNS instructions

## 5. Future Updates

After making changes locally:

```bash
git add -A
git commit -m "Your changes"
git push origin main
```

Vercel auto-deploys on every push to `main`.
