# 📸 Cloudinary SaaS Media Transformation Platform

A full-stack SaaS web application that enables users to upload and transform media (images & videos) optimized for various social media platforms like Facebook, Instagram, and Twitter.

> 🧑‍💻 Built by [Akshay Raj Kushwaha](https://github.com/gitsofakshay)

🔗 **Live Demo**: [cloudinary-saas-delta.vercel.app](https://cloudinary-saas-delta.vercel.app/home)

---

## 🚀 Overview

This project is a cloud-based media transformation platform built with **Next.js (TypeScript)** and **Cloudinary**, offering seamless **image and video optimization** for different social media formats. Users can upload media, apply transformations, and download platform-specific outputs.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (TypeScript), Tailwind CSS, DaisyUI
- **Backend**: Node.js, Prisma ORM
- **Database**: PostgreSQL
- **Media Services**: Cloudinary (Image & Video APIs)
- **Authentication**: Clerk Auth
- **Deployment**: Vercel

---

## 🎯 Key Features

### 🔐 User Authentication
- Secure and seamless login/signup using **Clerk Auth**.

### 🖼️ Image Upload & Transformation
- Upload images and transform them for:
  - Facebook Posts
  - Instagram Square Posts
  - Twitter Banners
- Powered by **Cloudinary Image Transformation APIs**.

### 🎥 Video Upload & Compression
- Upload large videos.
- Download compressed versions using **Cloudinary Video tools**.

### ☁️ Public Media Library
- All uploaded media is publicly accessible.
- Allows easy **sharing and collaboration**.

### 📊 PostgreSQL + Prisma ORM
- Robust data management for media metadata and user accounts.

### 💅 Modern UI
- Responsive and accessible UI built using **Tailwind CSS** and **DaisyUI**.

---

## 🔧 In Progress

- ✅ Custom Social Media Cards:
  - LinkedIn OG cards
  - Twitter cards
- 🔜 Scheduled media posts and metadata tagging

---

## 📸 Screenshots

### 🏠 Home Page
![Home](./public/screenshorts/user-home.PNG)

### 🏠 Sign-in Page
![Signin](./public/screenshorts/signin.PNG)

### 📤 Upload Interface
![Upload](./public/screenshorts/video-upload.PNG)

### 🎨 Transformation Result
![Transformation](./public/screenshorts/social-share.PNG)

### 📁 Public Media Library
![Library](./public/screenshorts/public-home.PNG)


---

## 📦 Installation (Optional for Developers)

```bash
# Clone the repo
git clone https://github.com/your-github/cloudinary-saas.git

# Install dependencies
cd cloudinary-saas
npm install

# Create .env file and add your credentials
cp .env.example .env.local

# Run the development server
npm run dev
