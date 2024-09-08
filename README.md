<div align="center">  <img src="https://icons.iconarchive.com/icons/graphicloads/seo-services/256/creative-icon.png" width="40" alt="Logo" align="left" style="margin-right: 10px;"><h1 align="left">Brainstormr</h1>  </div>
 
[![Vercel status](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://brainstormr.vercel.app/ "Vercel status")

A collaborative, real-time whiteboard application that allows users to draw, write, and share ideas effortlessly with others, promoting better teamwork and creativity. The app includes user-friendly tools and real-time synchronization, providing a seamless and interactive collaborative experience.  

Tech Stack:
- **TypeScript**
- **React**
- **Next.js**
- **Convex**
- **Clerk**
- **Liveblocks**

## Preview
![image](https://github.com/user-attachments/assets/07fffe48-56c7-4a6f-a85f-7f604953b525)

![image](https://github.com/user-attachments/assets/76155632-ba0c-4e90-823a-d5a7ba30cf21)

![image](https://github.com/user-attachments/assets/29ba20d6-ea29-4a1a-9862-4d7463f2aa49)

## Getting Started

1. Clone this repository to your local computer.
2. Create `.env.local` file in **root** directory.
3. Contents of `.env.local`:

```env

CONVEX_DEPLOYMENT=dev:convex-app-name # team: <your-team-name>, project: <your-project-name>
NEXT_PUBLIC_CONVEX_URL=https://convex-app-name.convex.cloud

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_dev_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY=sk_dev_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

```

4. Install all project dependencies using `npm install`.
5. Build and start your server using `npx convex dev`.
6. Now you can run the application locally using `npm run dev`.
