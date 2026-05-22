# 🚀 API Corner Production Deployment Guide

This guide walks you through deploying your **API Corner** application online as a real website, accessible to anyone on the internet for free.

We will use:
- **GitHub** to host your code repository.
- **MongoDB Atlas** for a free, persistent cloud database.
- **Render** for free web hosting.

---

## Step 1: Create a Free MongoDB Atlas Database

1. Sign up or log in at **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**.
2. Create a new project, click **Create a Deployment**, and choose the **M0 Free tier** cluster.
3. Select your cloud provider and region (leave defaults), then click **Create**.
4. In the Security Quickstart:
   - Create a database user (note down the **Username** and **Password**).
   - In **IP Access List**, select **Allow Access from Anywhere** (or `0.0.0.0/0`) so Render can connect to your database.
5. Go to your **Database** dashboard, click **Connect** -> **Drivers**, and copy the connection string. It will look like this:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/api_corner?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your created database user details. Keep this string ready.

---

## Step 2: Push Your Code to GitHub

1. Open your terminal in VS Code and log in to GitHub (if not already):
   ```bash
   git add .
   git commit -m "feat: Add authentication, database integration, and deployment config"
   ```
2. Go to [GitHub](https://github.com) and create a new **Private** or **Public** repository named `api-corner`.
3. Link your local project to your new GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/api-corner.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 3: Deploy to Render

Render will read the [render.yaml](file:///c:/Users/karth/OneDrive/Dokumen/API%20marketplace/render.yaml) file we created and set up the hosting service automatically.

1. Sign up or log in at **[Render.com](https://render.com/)**.
2. Click the **New +** button on your dashboard and select **Blueprint**.
3. Connect your GitHub account and select your `api-corner` repository.
4. Render will read the configuration. It will ask you for:
   - **Service Name** (e.g. `api-corner`)
   - **MONGODB_URI**: Paste the connection string you copied in Step 1.
5. Click **Apply**.

Render will now build your React frontend, start your Node server, generate a secure `JWT_SECRET` automatically, and deploy the application. 

Once the deploy finishes, Render will provide your public URL (e.g., `https://api-corner.onrender.com`).
