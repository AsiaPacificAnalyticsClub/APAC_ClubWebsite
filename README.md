# APAC_ClubWebsite

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## To Add Events

1. Go to `constants/Events.ts`.

2. Add your event to the `events` array.

Format of the event object:

```typescript
{
  id: number;
  title: string;
  date: string;
  displayDate: string;
  description: string;
  image: string;
  link: string;
}
```

3. Save the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Git Flow

### Branch

> [!IMPORTANT]
> Always create a new branch from the develop branch.

- main
- develop
- feature/xxxx
- bugfix/xxxx

### Adding a new feature

> [!NOTE]
> The name of the new branch should be in the format of "feature/xxxx".

1. Create a new branch from the develop branch.

   ```bash
   git checkout -b feature/xxxx develop
   ```

2. Commit your changes to the new branch.

   ```bash
   git commit -m "xxxx"
   ```

3. Push the new branch to the remote repository.

   ```bash
   git push origin feature/xxxx
   ```

4. Create a new pull request from the new branch to the develop branch.

### Fixing a bug

> [!NOTE]
> The name of the new branch should be in the format of "bugfix/xxxx".

1. Create a new branch from the develop branch.

   ```bash
   git checkout -b bugfix/xxxx develop
   ```

2. Commit your changes to the new branch.

   ```bash
   git commit -m "xxxx"
   ```

3. Push the new branch to the remote repository.

   ```bash
   git push origin bugfix/xxxx
   ```

4. Create a new pull request from the new branch to the develop branch.
