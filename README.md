This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

### OnlyOffice in GitHub Codespaces

The OnlyOffice editor loads its DocsAPI in the browser, so `localhost:80` refers
to the browser's machine, not the Docker container. Forward port `80` in the
Codespaces **Ports** tab and set the resulting HTTPS URL before building:

```bash
export NEXT_PUBLIC_ONLYOFFICE_URL="https://<codespace>-80.app.github.dev/"
export NEXT_PUBLIC_DOCUMENT_URL="https://<codespace>-3000.app.github.dev/Hello%20World.pdf"
docker compose up --build
```

Open the forwarded port `3000` URL for the web app. Set forwarded port `80` to
**Public** before opening the editor. A private Codespaces tunnel returns
`401` to the DocsAPI script because the OnlyOffice iframe cannot pass the
Codespaces authentication challenge.

The document URL must also be publicly reachable because OnlyOffice fetches it
from the document server. For local development, omit both variables.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
