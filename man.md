PDF To Markdown Converter
Debug View
Result View
Lunchsessie Next.js 13 1

# Lunchsessie Next.js 13

2 februari 2023

Next.js 13, plus:

TypeScript

Turborepo

Tailwind CSS, daisyUI

Strapi CMS

Vercel, Render, Cloudinary

1. Set up monorepo
2. Root layout in app directory
3. Configure Tailwind CSS, daisyUI
4. Server and client components
5. Data fetching in Next.js 13
6. Setup Strapi CMS
7. Data fetching with Strapi
8. Static Site Generation (SSG)
9. Deploy Strapi on Render
10. Deploy website on Vercel

1 1. Incremental Static Regeneration

12. Image hosting with Cloudinary
13. Cloudinary images with Next.js


1. Set up monorepo 1

##### 1. Set up monorepo

```
We want to develop and run a) a website, and b) a backend — i.e. Strapi CMS. A monorepo can handle both in one single
repository and help to keep them separate but still tightly integrated. There are many product alternatives, but we’ll be using
Turborepo, as it is supported by Next.js open source steward Vercel.
However, this is not a session about monorepos, so we just do the necessary steps to achieve our goal. For curious reader we
refer to the documentation.
```
**Documentation**

```
Getting Started with Turborepo - Turborepo
To create a new monorepo, use our create-turbo (opens in a new tab) npm package: You can also clone a
Turborepo starter repository to get a head start on your monorepo. To see Turborepo examples and starters,
see the Turborepo examples directory on GitHub (opens in a new tab).
https://turbo.build/repo/docs/getting-started/create-new
```
**Steps**

1. Make sure that you use node version 18

```
$ nvm use 18
> Now using node v 18. 12. 1 (npm v 8. 19. 2 )
```
2. Add Turborepo CLI

```
$ yarn global add turbo
...
$ turbo version
> Turbo CLI Version: 0. 39. 6
```
2. Create monorepo

```
$ npx create-turbo@latest
```

1. Set up monorepo 2

3. See if it runs:

```
$ turbo dev
```
4. We don’t need app/docs and packages/uit so just get rid of them.

Now web is the only app running on port 3000.

**Workaround for Next.js bug # 38939**

https://github.com/vercel/next.js/issues/

```
Error: Failed to load parser '@babel/eslint-parser' declared in '.eslintrc.js': Cannot find module '@babel/core/package.json'
Trying to install eslint into yarn create next-app, but get next error when running linter: Error: Failed to load parser '@babel/eslint-parser'
declared in '.eslintrc.js': Cannot find module '@babel/core/package.json' Detail: info - Loaded env from /project/.env Error: Failed to load
parser '@babel/eslint-parser' declared in '.eslintrc.js': Cannot find module '@babel/core/package.json' Require stack: -
https://stackoverflow.com/questions/70292796/error-failed-to-load-parser-babel-eslint-parser-declared-in-eslintrc-js
```

1. Set up monorepo 3

1. Add parser property:

```
module.exports = {
root: true,
extends: ["custom"],
parser: '@babel/eslint-parser'
};
```
2. Add dev dependencies:

```
$ yarn add - D eslint @babel/core @babel/eslint-parser
```
3. Test it:

```
$ npx turbo lint
```
```
Enable remote caching
1. Link project to Vercel Remote Cache:
```
```
$ turbo login
$ turbo link
```
2. See it in action:

```
$ turbo run build
```
See also:

```
Turborepo
Turborepo is a high-performance build system for JavaScript and TypeScript codebases with: Fast
incremental builds Content-aware hashing, meaning only the files you changed will be rebuilt Remote
Caching for sharing build caches with your team and CI/CD pipelines And much more! Read the " Why
https://vercel.com/docs/concepts/monorepos/turborepo#setup-remote-caching-for-turborepo-on-verce
l
```

2. Root layout in app directory 1

# 2. Root layout in app directory

Next.js 12 rendering with the ‘pages’ directory:

CSR: Client-side rendering

SSR: Server-side rendering

SSG: Static-site generation

ISR: Incremental Static Regeneration

Next.js 13 introduces the ‘app’ directory. It is intended to replace the ‘pages’

directory, but for now both directories are supported and can exist side by side. Note

that the ‘app’ directory is still an experimental feature.

One might think the ‘app’ directory and related improvements is driven by multiple

developments:

React 18: evolution of new features such as server components and suspense.

With support from both frameworks such as Next.js and React itself.

Emergence of new frameworks such as Remix, that support features such as

nested components. Such development promote simplicity and as such offer

better DX.

Vercel is leveraging open source Next.js to solidify their business model, in a

strategic response to other developments (acquisition of Remix by Shopify,

Gatsby by Netlify).

## Steps

1. Create app directory under Next.js root

```
cd apps/web/
mkdir app
rm pages/index.tsx
```
2. First add a layout:


2. Root layout in app directory 2

```
export default function RootLayout ({children}: { children: React.ReactNode }) {
return (
<html lang='nl'>
<body>
{children}
</body>
</html>
)
}
```
a head:

```
export default function Head () {
return (
<title>FFS Website Archetype</title>
)
}
```
a page:

```
export default function Home () {
return (
<div>Hello world!</div>
)
}
```
3. Add experimental { appDir: true } to next.config.js:

```
module.exports = {
reactStrictMode: true,
experimental: {
appDir: true
},
};
```

3. Configure Tailwind CSS, daisyUI 1

# 3. Configure Tailwind CSS,

# daisyUI

Youtuber Theo - t3.gg:

The Best Of CSS - Tailwind vs MUI vs Bootstrap vs Chakra vs...

```
UI libraries are important! I think about them a lot and I hope this video
helps you think about them too. Very very very overdue one.
```
https://www.youtube.com/watch?v=CQuTF-bkOgc

There are numerous UI libraries. However, not every UI library solves the same

problem. It can be ‘design’ or ‘esthetics’, i.e. definitions and guidelines that determine

the overall look, feel and tone of a website. It can be ‘styling’, i.e. the translation of this

design into styled HTML components, using CSS. Or it can be ‘behavior’, which refers

to the functional nature of components.


3. Configure Tailwind CSS, daisyUI 2

So you website needs all three. Now how do you do that?

1. The Monolithic approach (”do all in one”): you select a library that covers all

aspects

2. The UNIX approach (”do one thing well”): you select one library for each aspect

Examples Pros Cons

Monolithic Bootstrap MUI

```
Integrated, relatively easy
for general cases
```
```
Added complexity, steep
learning curve, you need to
be trained in the intricacies
of the product, not
standards, hard to
customize
```
“UNIX”

```
Styling: Tailwind
, Behavior:
Radix, Design:
your own design
system, or
daisyUI
```
```
Simplicity, standards-
based, limited
dependency
```
```
Not every conceivable
component might be
supported, not every
individual component is
easy to integrate
```
The Fullstack solution’s choice is the “UNIX” approach, with Tailwind CSS for styling,

and headless libraries such as Radix primitives for general cases or more specialized

libraries for individual cases. For each customer there should be a separate design

system. If there is no need for a proprietary design system, then daisyUI is a good

choice, as it integrates well with Tailwind CSS and Radix UI or headless components

in general. In addition, you can easily define a ‘theme’ with daisyUI. Cynics might call

it a poor man’s design system, but we don’t care about that.

Here we outline the steps to install Tailwind CSS and daisyUI.

1. Add Tailwind CSS and daisyUI using the following documentation:

Install Tailwind CSS with Next.js - Tailwind CSS

Setting up Tailwind CSS in a Next.js v10+ project.

https://tailwindcss.com/docs/guides/nextjs


3. Configure Tailwind CSS, daisyUI 3

```
cd apps/web
yarn add - D tailwindcss postcss autoprefixer @tailwindcss/typography
yarn add daisyui
npx tailwindcss init - p
```
2. Change Tailwind configuration:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./app/**/*.{js,ts,jsx,tsx}",
"./pages/**/*.{js,ts,jsx,tsx}",
"./components/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [
require('@tailwindcss/typography'),
require('daisyui'),
],
}
```
3. Add tailwind directives:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Modify layout:

import '../styles/globals.css'

```
export default function RootLayout ({children}: { children: React.ReactNode }) {
return (
<html lang='nl' data-theme='light'>
<body>
{children}
</body>
</html>
)
}
```

4. Server and client components 1

# 4. Server and client components

Rendering: Server and Client Components | Next.js

```
We recommend reading the Rendering Fundamentals page
before continuing. Server and Client Components allow
developers to build applications that span the server and client,
https://beta.nextjs.org/docs/rendering/server-and-client-comp
onents
```
**Server components**

All components inside the app directory are  **React Server Components**  by

default, including special files and colocated components. This allows you to

automatically adopt Server Components with no extra work, and achieve great

performance out of the box.

**Client Components**

Client Components enable you to add client-side interactivity to your application.

In Next.js, they are prerendered on the server and hydrated on the client. You

can think of Client Components as how Next.js 12 and previous versions worked

(i.e. the pages/ directory).

In Next.js 13, server and client components are interleaved. In the ‘app’ directory,

server components are the default. If you want to have component to act as a client

component, you should add the ‘use client’ directive. In this section we add a

component that conditionally renders depending on the current selection of a user,

thus implying the need for a client component.

## Steps

1. Add route posts by placing a page.tsx file in a folder named ‘posts’

```
export default function Page () {
return (
<div>Posts</div>
)
}
```

4. Server and client components 2

Navigate to [http://localhost:](http://localhost:) 3000 /posts to check out the route

2. Add a header tag to the root layout

```
import Link from 'next/link'
import '../styles/globals.css'
```
```
export default function RootLayout ({children}: { children: React.ReactNode }) {
return (
<html lang='nl'>
<body>
<header>
<nav>
<Link href='/'>Home</Link>
<Link href='/posts'>Posts</Link>
</nav>
</header>
{children}
</body>
</html>
)
}
```
Use the links to navigate the pages.

3. Enhance layout and select daisyUI theme:

```
import Link from 'next/link'
import '../styles/globals.css'
```
```
export default function RootLayout ({children}: { children: React.ReactNode }) {
return (
<html lang='nl' data-theme='dark'>
<body className='p- 4 '>
<header>
<nav className='tabs space-x- 4 '>
<Link className='tab tab-bordered' href='/'>Home</Link>
<Link className='tab tab-bordered' href='/posts'>Posts</Link>
</nav>
</header>
<div className='mt- 4 '>
{children}
</div>
</body>
</html>
)
}
```
4. Add client component to denote current route:


4. Server and client components 3

'use client'

```
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
```
```
interface NavLinkProps {
href: string
children: React.ReactNode
}
```
export const NavLink = ({href, children}: NavLinkProps) => {

```
let segment = useSelectedLayoutSegment()
let active = href === `/${segment || ''}`
```
```
return (
<Link
className={`tab tab-bordered ${active? 'tab-active' : ''}`}
href={href}
prefetch={false}
>
{children}
</Link>
)
}
```
and replace the current Links by our NavLinks:

```
import { NavLink } from './nav-link'
import '../styles/globals.css'
```
```
export default function RootLayout ({children}: { children: React.ReactNode }) {
return (
<html lang='nl' data-theme='dark'>
<body className='p- 4 '>
<header>
<nav className='tabs space-x- 4 '>
<NavLink href='/'>Home</NavLink>
<NavLink href='/posts'>Posts</NavLink>
</nav>
</header>
<div className='mt- 4 '>
{children}
</div>
</body>
</html>
)
}
```

5. Data fetching in Next.js 13 1

##### 5. Data fetching in Next.js 13

**Documentation**

```
Data Fetching: Fundamentals | Next.js
Next.js 13 introduced a new way to fetch data in your application. The API has been simplified to align with
React and the Web Platform. This page will go through the fundamental concepts and patterns to help you
manage your data's lifecycle.
https://beta.nextjs.org/docs/data-fetching/fundamentals
```
```
Previous Next.js data fetching methods such as getServerSideProps, getStaticProps, and getInitialProps are not supported in
the new app directory.
The new data fetching system is built on top of the native fetch() Web API and makes use of async/await in Server
Components.
```
Notable changes:

1. Fetch data on the server using Server Components and Next.js Cache

2. Fetch data in parallel to minimize waterfalls and reduce loading times.

3. For Layouts and Pages, fetch data where it's used. Next.js will automatically dedupe requests in a tree.


5. Data fetching in Next.js 13 2

```
4. Use Loading UI, Streaming and Suspense to progressively render a page and show a result to the user while the rest of
the content loads.
```
```
Steps
1. Add an API route:
```
```
import { NextApiRequest, NextApiResponse } from "next";
export default function handler (req: NextApiRequest, res: NextApiResponse) {
return res.status( 200 ).send(JSON.stringify(
[
{
"slug": "canem-trium-annorum",
"title": "Canem trium annorum",
"intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut placerat nunc, non posuere metus.
"body": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec euism
},
{
```

5. Data fetching in Next.js 13 3

```
"slug": "canis-latrat-fugit",
"title": "Canis latrat, fugit",
"intro": "Nunc convallis, nisl nec suscipit mollis, nulla nunc feugiat turpis, vel pulvinar metus ipsum a leo. Sus
"body": "Nam et sapien sit amet nunc tincidunt convallis eu ultricies lacus. Vestibulum at nisl quis tellus varius
}
]
))
}
```
2. Add data fetching routine with async server components:

```
async function getPosts () {
const resp = await fetch('http://localhost: 3000 /api/posts')
return resp.json()
}
export default async function Page () {
let posts = await getPosts()
return (
<>
<div>Posts</div>
<div>{JSON.stringify(posts)}</div>
</>
)
}
```
3. List posts:

```
export default async function Page () {
let posts = await getPosts()
return (
<>
<div>Posts</div>
<ul>
{posts.map((post: any) =>
<li key={`movie-${post.slug}`}
className='hover:underline cursor-pointer'
>
{post.title}
</li>
)}
</ul>
</>
)
}
```
4. Throttle response, then fallback with loading.txt:

```
import { NextApiRequest, NextApiResponse } from "next";
export default function handler (req: NextApiRequest, res: NextApiResponse) {
setTimeout(() => {
return res.status( 200 ).send(JSON.stringify(
[
{
"id": 1 ,
"title": "Canem trium annorum",
"intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut placerat nunc, non posuere me
"body": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec e
},
{
"id": 2 ,
"title": "Canis latrat, fugit",
"intro": "Nunc convallis, nisl nec suscipit mollis, nulla nunc feugiat turpis, vel pulvinar metus ipsum a leo.
"body": "Nam et sapien sit amet nunc tincidunt convallis eu ultricies lacus. Vestibulum at nisl quis tellus va
}
]
))
}, 2000 )
}
```
```
const Loading = (props: any) => {
return (
<div>Loading...</div>
```

5. Data fetching in Next.js 13 4

```
)
}
export default Loading
```
5. Refactor page.tsx to responsive layout.tsx:

```
import Link from "next/link"
async function getPosts () {
const resp = await fetch('http://localhost: 3000 /api/posts')
return resp.json()
}
interface LayoutProps {
children: React.ReactNode
}
export default async function Page ({children}: LayoutProps) {
let posts = await getPosts()
return (
<div className='w-full flex flex-col md:flex-row gap- 8 '>
<ul className='flex-none'>
{posts.map((post: any) =>
<li key={`movie-${post.slug}`}
className='hover:underline cursor-pointer'
>
<Link href={`/posts/${post.slug}`} prefetch={false}>{post.title}</Link>
</li>
)}
</ul>
<div>
{children}
</div>
</div>
)
}
```
```
export default function Page () {
return (
<div>Post details</div>
)
}
```
6. Add a route for actual page details:

```
export default function Page () {
return (
<>Actual post details</>
)
}
```
7. Add fetch logic:

```
async function getPost (slug: string) {
const resp = await fetch('http://localhost: 3000 /api/posts')
const json = await resp.json() as any[]
const found = json.filter(d => d.slug === slug)
if ( found.length > 0 ) return found[ 0 ]
return null
}
interface PageProps {
params: {
slug: string
}
}
export default async function Page ({params}: PageProps) {
const post = await getPost(parseInt(params.slug))
return (
<div className='prose'>
<h 2 >{post.title}</h 2 >
```

5. Data fetching in Next.js 13 5

```
<p className='font-bold'>{post.intro}</p>
<p className='mt- 4 '>{post.body}</p>
</div>
)
}
```
```
8. In equivalence for getStaticPaths, you should the following, although this won’t work with same origin API endpoint for
posts...
```
```
export async function generateStaticParams () {
const resp = await fetch('http://localhost: 3000 /api/posts')
const json = await resp.json() as any[]
return json.map(post => ({post.slug}))
}
```
9. Try it

```
$ yarn build
$ yarn start
```

6. Setup Strapi CMS 1

# 6. Setup Strapi CMS

Headless CMS is an essential part of a Jamstack based website, in that is enables

decoupling. Nowadays every CMS is expected to support a decoupled architecture.

Even Wordpress and Drupal have been retrofitted to be able to run headless. But yet

there’s another class of CMS that have been designed to run headless from the

ground up.

To have an idea you can check out a comprehensive list of Headless CMS reviews,

published by Polish agency Bejamas:

Headless CMS Explained

```
We can't say that headless CMSs, and Jamstack for that matter,
are all the rage now in web development but they are pretty
close to becoming mainstream tech. A serious contender to
https://bejamas.io/discovery/headless-cms/
```
As you can see there are many options. Only focusing on Strapi for now, these are

the pros and cons for Strapi according to Bejamas:


6. Setup Strapi CMS 2

So Strapi is pretty lightweight, but it has a smart plugin architecture that enables

support for features such as multitenancy and internationalization, it therefore should

scale well, also to bigger projects. Also, while most of these are free and open

source software, you still need to purchase a commercial license if you need

_enterprise_ features like SSO. Compared to its competitors Strapi, offers the best

value for money.

Quick Start Guide - Strapi Developer Docs

```
PREREQUISITES Before installing Strapi, the following
requirements must be installed on your computer: Node.js
(opens new window) : Only Maintenance and LTS versions are
https://docs.strapi.io/developer-docs/latest/getting-started/qu
ick-start.html
```
1. Create a Strapi project


6. Setup Strapi CMS 3

```
cd apps
npx create-strapi-app@latest cms - -quickstart - -typescript - -no-run
```
2. Rename script develop to dev

```
...
"scripts": {
"dev": "strapi develop",
"start": "strapi start",
"build": "strapi build",
"strapi": "strapi"
},
...
```
3. (Re-)start apps

yarn dev

4. Enter admin credentials


6. Setup Strapi CMS 4

5. Click at “Create your first Content Type”


6. Setup Strapi CMS 5

6. Follow the ‘tour’ by creating a new collection type with display name “Post” and

fields:

a. Text, Name: “slug”, Type: “Short text”, Settings: “Unique field”

b. Text, Name: “title”, Type: “Short text”

c. Text, Name: “intro”, Type: “Long text”

d. Text, Name: “body”, Type: “Richt text”

7. Create a new Post entry

8. Generate an API token

a. Name: “lunch”, Token duration: “Unlimited”, Token type: “Read only”

b. Click Save to add the token


7. Data fetching with Strapi 1

### 7. Data fetching with Strapi

**Steps**

1. In /apps/web, add a .env.local file and add the Strapi info:

```
STRAPI_API_URL=http:// 127. 0. 0. 1 : 1337
STRAPI_API_TOKEN=d 6304710 ac 1 ba 585 ffb 04275445 f 8 ...
```
and in next.config.js:

```
module.exports = {
reactStrictMode: true,
experimental: {
appDir: true
},
env: {
STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
STRAPI_API_URL: process.env.STRAPI_API_URL
}
};
```
and in turbo.json:

```
{
"$schema": "https://turbo.build/schema.json",
"globalEnv": [
"STRAPI_API_URL",
"STRAPI_API_TOKEN"
],
"pipeline": {
...
}
}
```
Note: you should restart the dev server after this

2. Add API code:

```
import qs from "qs";
```
```
/**
* Get full Strapi URL from path
* @param {string} path Path of the URL
* @returns {string} Full Strapi URL
*/
export function getStrapiURL(path = "") {
return `${
process.env.STRAPI_API_URL || "http://localhost: 1337 "
}${path}`;
}
```
```
/**
* Helper to make GET requests to Strapi API endpoints
* @param {string} path Path of the API route
* @param {Object} urlParamsObject URL params object, will be stringified
```

7. Data fetching with Strapi 2

```
* @param {Object} options Options passed to fetch
* @returns Parsed API call response
*/
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
// Merge default and user options
const mergedOptions = {
headers: {
"Content-Type": "application/json",
"Authorization": `bearer ${process.env.STRAPI_API_TOKEN}`
},
...options,
};
```
```
// Build request URL
const queryString = qs.stringify(urlParamsObject);
const requestUrl = `${getStrapiURL(
`/api${path}${queryString? `?${queryString}` : ""}`
)}`;
```
```
// Trigger API call
const response = await fetch(requestUrl, mergedOptions);
```
```
// Handle response
if (!response.ok) {
console.error(response.statusText);
throw new Error(`An error occured please try again`);
}
const data = await response.json();
return data;
}
```
3. Change the code for listing posts:

```
import Link from "next/link"
import { fetchAPI } from '../../lib/strapi/api'
```
```
// async function getPosts () {
// const resp = await fetch('http://localhost: 3000 /api/posts')
// return resp.json()
// }
```
```
interface LayoutProps {
children: React.ReactNode
}
```
```
export default async function Page ({children}: LayoutProps) {
// let posts = await getPosts()
let posts = await fetchAPI('/posts')
```
```
return (
<div className='flex gap- 8 '>
<ul className='flex-none'>
{posts.data.map(({id, attributes}: {id: number, attributes: any}) =>
<li key={`movie-${attributes.slug}`}
className='hover:underline cursor-pointer'
>
<Link href={`/posts/${attributes.slug}`} prefetch={false}>{attributes.title}</Link>
</li>
)}
</ul>
<div>
{children}
</div>
</div>
)
}
```
4. Change the code for showing posts:


7. Data fetching with Strapi 3

```
import { fetchAPI } from "../../../lib/strapi/api"
```
```
interface PageProps {
params: {
slug: string
}
}
```
```
export default async function Page ({params}: PageProps) {
```
```
const result = await fetchAPI('/posts', {
filters: { slug: params.slug },
})
```
```
if ( result.data?.length > 0 && result.data[ 0 ] ) {
const { id, attributes: post } = result.data[ 0 ]
```
```
const image = post.image.data.attributes
```
```
return (
<div className='prose'>
<h 2 >{post.title}</h 2 >
<p className='font-bold'>{post.intro}</p>
<p className='mt- 4 '>{post.body}</p>
</div>
)
}
```
```
return <>Nothing found</>
}
```
```
export async function generateStaticParams () {
let result = await fetchAPI('/posts')
return result.data.map(({id, attributes}: {id: number, attributes: any}) => (
{slug: attributes.slug}
))
}
```
5. Test the posts route

```
a. If there is no post, then first publish the post(s) in Strapi Admin and add one or more additional
posts
```
6. You can now remove the API route (pages/api/posts)


8. Static Site Generation (SSG) 1

# 8. Static Site Generation (SSG)

Next.js rendering:

CSR: Client-side rendering

SSR: Server-side rendering

SSG: Static-site generation

ISR: Incremental Static Regeneration

1. Add a console.log in the Strapi client code for tracing Strapi calls:

```
// Build request URL
const queryString = qs.stringify(urlParamsObject);
const requestUrl = `${getStrapiURL(
`/api${path}${queryString? `?${queryString}` : ""}`
)}`;
```
console.log('request:', requestUrl)

Notice the log statements in dev mode.

2. Now perform a build, using two CLI tabs or windows:

a. CLI for cms:

$ npx turbo dev - -filter cms

b. CLI for web:

$ npx turbo build - -filter web

Try building multiple times and notice the cache hit:

web:build: cache hit, replaying output d 0868 aa 915 fd 7 f 75


8. Static Site Generation (SSG) 2

3. To perform start, first add it to the pipeline in turbo.json:

```
{
"$schema": "https://turbo.build/schema.json",
"pipeline": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**", ".next/**"]
},
"lint": {
"outputs": []
},
"dev": {
"cache": false
},
"start": {
}
}
}
```
4. Perform start

$ npx turbo start - -filter web

Notice there are no more log statements done by the Strapi client


9. Deploy Strapi on Render 1

# 9. Deploy Strapi on Render

As was mentioned before, you need basic DevOps knowledge to run Strapi on

production. A cloud offering is planned but for now your only option is self-hosting.

Strapi documentation provides guides for deployment on:

Amazon AWS

Azure

DigitalOcean

Google Cloud Platform

Heroku

In addition there is also documented support for deployment on:

Platform.sh

Render

Criteria:

Cost and suspension

European region

Bitbucket support

We chose to deploy Strapi CMS on Render, because:

a. It’s relatively cheap: cost are low and you can ‘suspend’ your services

b. It supports a European region (Frankfurt)

c. Unfortunately it has no Bitbucket support, so we have to use Github (or Gitlab)


9. Deploy Strapi on Render 2

###### Documentation

https://render.com/docs/deploy-strapi

###### Steps for the Hybrid Option (Postgres and disk)

1. Create a new Github repository:

2. Push repository from the command line:

```
$ git remote add origin git@github.com:finalist/ffs-website-archetype.git
$ git branch - M main
$ git push - u origin main
```
3. Add PostgresQL dependency:

```
$ cd apps/cms
$ yarn add pg
```

9. Deploy Strapi on Render 3

4. Add render.yaml to repository root (not apps/cms):

services:

- type: web
  name: strapi
  env: node
  rootDir: apps/cms
  region: frankfurt
  plan: starter
  buildCommand: yarn install && yarn build
  startCommand: rsync - a public/ /data/public/ && yarn start
  healthCheckPath: /_health
  autoDeploy: false
  disk:
  name: strapi-data
  mountPath: /data
  sizeGB: 1
  envVars:
- key: DATABASE_FILENAME
  value: /data/strapi.db
- key: JWT_SECRET
  generateValue: true
- key: ADMIN_JWT_SECRET
  generateValue: true
- key: APP_KEYS
  generateValue: true
- key: API_TOKEN_SALT
  generateValue: true
- key: CLOUDINARY_NAME
  sync: false
- key: CLOUDINARY_KEY
  sync: false
- key: CLOUDINARY_SECRET
  sync: false

Note:

added region spec (frankfurt)

removed NODE_VERSION key

added API_TOKEN_SALT key

5. Copy config/env/production and its contents from the strapi-postgres repo

6. Commit and push the changes to Github

7. In Render dashboard, click “Blueprints” and “New Blueprint instance”, and

connect the ffs-website-archetype repo:

8. Enter blueprint details


9. Deploy Strapi on Render 4

9. After this site and database should be deployed. The first step is to add an

admin account.

###### Connect web to CMS

1. In Strapi Dashboard, under Settings > API Tokens, create a new API token

2. In apps/web, update the environment variables settings:

```
STRAPI_API_URL=https://strapi-????.onrender.com
STRAPI_API_TOKEN=<your_new_token>
```

10. Deploy website on Vercel 1

# 10. Deploy website on Vercel

1. Go to Vercel dot com and choose “Add New...” and then “Project”:

2. Choose Github as Git Provider and import the “ffs-website-archetype” repo:


10. Deploy website on Vercel 2

3. Vercel automatically recognised the repo as a monorepo, with apps/web as Root

Directory. Now add some Environment Variables:


10. Deploy website on Vercel 3

4. Click Deploy and watch it build

5.


1 1. Incremental Static Regeneration 1

# 11. Incremental Static

# Regeneration

1. Create revalidate API route:

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

```
if ( req.query.token !== process.env.REVALIDATE_TOKEN ) {
return res.status( 401 ).json({ message: 'invalid token'} )
}
```
```
try {
console.log('revalidate - body:', req.body)
await res.revalidate(`/posts/${req.body?.entry?.slug}`)
await res.revalidate('/posts')
return res.json( {revalidated: true} )
} catch (err ) {
return res.status( 500 ).send(`Error revalidating: ${(err as Error).message}`)
}
}
```
2. Add REVALIDATE_TOKEN to:

a. apps/web/.env.local

b. apps/web/next.config.js

c. environment variables in Vercel dashboard

2. In our Strapi dashboard, under Settings > Webhooks, create a webhook, using

the serverless function URL https://ffs-website-archetype-

web.vercel.app/api/revalidate?token= 2 KP 6 JraBUejzBkj 3 dsYpJmbI 9 SrkPD 3 Z 0 SOPubV 1 N 44 and

the REVALIDATE_TOKEN, for publish and unpublish events:


1 1. Incremental Static Regeneration 2

then click ‘Save’

4. Test it by publishing and unpublishing posts.


12. Image hosting with Cloudinary 1

## 12. Image hosting with Cloudinary

1. Add Cloudinary provider dependency for Strapi uploads:

```
Cloudinary | Strapi Market
Cloudinary provider for Strapi uploads # using yarn yarn add
@strapi/provider-upload-cloudinary # using npm npm install
@strapi/provider-upload-cloudinary --save provider defines the name
https://market.strapi.io/providers/@strapi-provider-upload-cloudinary
```
```
$ cd apps/cms
$ yarn add @strapi/provider-upload-cloudinary
```
**Local config**

2. Add Cloudinary provider (local) config:

```
module.exports = ({ env }) => ({
upload: {
config: {
provider: 'cloudinary',
providerOptions: {
cloud_name: env('CLOUDINARY_NAME'),
api_key: env('CLOUDINARY_KEY'),
api_secret: env('CLOUDINARY_SECRET'),
},
actionOptions: {
upload: {},
uploadStream: {},
delete: {},
},
},
},
});
```
```
3. Add Cloudinary (local) environment variables using credentials from Cloudinary
Dashboard:
```
```
HOST= 0. 0. 0. 0
PORT= 1337
APP_KEYS=<app_keys>
API_TOKEN_SALT=<api_token_salt>
ADMIN_JWT_SECRET=<admin_jwt_secret>
JWT_SECRET=<jwt_secret>
CLOUDINARY_NAME=<cloudinary_name>
```

12. Image hosting with Cloudinary 2

```
CLOUDINARY_KEY=<cloudinary_key>
CLOUDINARY_SECRET=<cloudinary_secret>
```
4. Modify contentSecurityPolicy to properly see thumbnail previews in the Media Library:

```
export default [
'strapi::errors',
{
name: 'strapi::security',
config: {
contentSecurityPolicy: {
useDefaults: true,
directives: {
'connect-src': ["'self'", 'https:'],
'img-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com', 'res.cloudinary.com'],
'media-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com', 'res.cloudinary.com'],
upgradeInsecureRequests: null,
},
},
},
},
'strapi::cors',
'strapi::poweredBy',
'strapi::logger',
'strapi::query',
'strapi::body',
'strapi::session',
'strapi::favicon',
'strapi::public',
];
```
5. Restart Strapi

**Upload and include images**

```
6. Go to Strapi Dashboard, select Media Library from the menu and choose “+ Add new
assets”:
```

12. Image hosting with Cloudinary 3

7. Select Content-Type Builder from the menu and choose “+ Add another field” for Post,

select Media field type:

Click at “Finish” and “Save”

8. Select Content Manager from the menu and add an image to each of the Posts


13. Cloudinary images with Next.js 1

#### 13. Cloudinary images with Next.js

**Optimized images**

Three options:

Next.js 13 introduces a new next/image component:

```
Optimizing: Images | Next.js
The Next.js Image component extends the HTML element with: Size Optimization:
Automatically serve correctly sized images for each device, using modern image formats like
WebP and AVIF. Visual Stability: Prevent layout shift automatically when images are loading.
https://beta.nextjs.org/docs/optimizing/images
```
```
However, this option is not a good fit for images hosted on Cloudinary, we would pay twice for image
optimization
```
Cloudinary offers an adaptation of next/image, using Cloudinary optimization”

```
Next Cloudinary
High-performance image delivery and uploading at scale in Next.js powered by Cloudinary.
```
```
https://next-cloudinary.spacejelly.dev/
```
```
However, this library consists of client components, and it doesn’t seem to work well with Next.js 13 and the app
directory.
```
The third option is to use plain old HTMLImageElement.srcset, to leverage Cloudinary’s image optimizations

```
HTMLImageElement.srcset - Web APIs | MDN
A string containing a comma-separated list of one or more image candidate strings to be used
when determining which image resource to present inside the element represented by the
HTMLImageElement. Each image candidate string must begin with a valid URL referencing a
https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset
```
```
1. First we need to fetch posts with the new image field. The Strapi REST API, however, by default does not
populate any media fields (or relations). So you have to use the populate parameter to also fetch such specific
fields.
```
Change the API call to fetch posts as follows:

```
...
export default async function Page ({params}: PageProps) {
```
```
const result = await fetchAPI('/posts', {
filters: { slug: params.slug },
populate: ['image']
```

13. Cloudinary images with Next.js 2

```
})
...
```
10. Have a look at what is being returned:

```
...
if ( result.data?.length > 0 && result.data[ 0 ] ) {
const { id, attributes: post } = result.data[ 0 ]
```
```
const image = post.image.data.attributes
console.log('image:', image)
...
```
```
web:dev: image: {
web:dev: name: 'doggo 2 .jpg',
web:dev: alternativeText: 'doggo',
web:dev: caption: null,
web:dev: width: 1024 ,
web:dev: height: 768 ,
web:dev: formats: {
web:dev: thumbnail: {
web:dev: name: 'thumbnail_doggo 2 .jpg',
web:dev: hash: 'thumbnail_doggo 2 _ 1 c 8 ddeb 3 ac',
web:dev: ext: '.jpg',
web:dev: mime: 'image/jpeg',
web:dev: path: null,
web:dev: width: 208 ,
web:dev: height: 156 ,
web:dev: size: 11. 99 ,
web:dev: url: 'https://res.cloudinary.com/dv 5 ip 47 p 2 /image/upload/v 1675241280 /thumbnail_doggo 2 _ 1 c 8 ddeb 3 ac.jpg',
web:dev: provider_metadata: [Object]
web:dev: },
web:dev: small: {
web:dev: name: 'small_doggo 2 .jpg',
web:dev: hash: 'small_doggo 2 _ 1 c 8 ddeb 3 ac',
web:dev: ext: '.jpg',
web:dev: mime: 'image/jpeg',
web:dev: path: null,
web:dev: width: 500 ,
web:dev: height: 375 ,
web:dev: size: 55. 32 ,
web:dev: url: 'https://res.cloudinary.com/dv 5 ip 47 p 2 /image/upload/v 1675241280 /small_doggo 2 _ 1 c 8 ddeb 3 ac.jpg',
web:dev: provider_metadata: [Object]
web:dev: },
web:dev: medium: {
web:dev: name: 'medium_doggo 2 .jpg',
web:dev: hash: 'medium_doggo 2 _ 1 c 8 ddeb 3 ac',
web:dev: ext: '.jpg',
web:dev: mime: 'image/jpeg',
web:dev: path: null,
web:dev: width: 750 ,
web:dev: height: 563 ,
web:dev: size: 108. 87 ,
web:dev: url: 'https://res.cloudinary.com/dv 5 ip 47 p 2 /image/upload/v 1675241280 /medium_doggo 2 _ 1 c 8 ddeb 3 ac.jpg',
web:dev: provider_metadata: [Object]
web:dev: },
web:dev: large: {
web:dev: name: 'large_doggo 2 .jpg',
web:dev: hash: 'large_doggo 2 _ 1 c 8 ddeb 3 ac',
web:dev: ext: '.jpg',
web:dev: mime: 'image/jpeg',
web:dev: path: null,
web:dev: width: 1000 ,
web:dev: height: 750 ,
web:dev: size: 170. 63 ,
web:dev: url: 'https://res.cloudinary.com/dv 5 ip 47 p 2 /image/upload/v 1675241280 /large_doggo 2 _ 1 c 8 ddeb 3 ac.jpg',
web:dev: provider_metadata: [Object]
web:dev: }
web:dev: },
web:dev: hash: 'doggo 2 _ 1 c 8 ddeb 3 ac',
web:dev: ext: '.jpg',
web:dev: mime: 'image/jpeg',
```

13. Cloudinary images with Next.js 3

```
web:dev: size: 152. 38 ,
web:dev: url: 'https://res.cloudinary.com/dv 5 ip 47 p 2 /image/upload/v 1675241280 /doggo 2 _ 1 c 8 ddeb 3 ac.jpg',
web:dev: previewUrl: null,
web:dev: provider: 'cloudinary',
web:dev: provider_metadata: { public_id: 'doggo 2 _ 1 c 8 ddeb 3 ac', resource_type: 'image' },
web:dev: createdAt: ' 2023 - 02 - 01 T 08 : 47 : 56. 966 Z',
web:dev: updatedAt: ' 2023 - 02 - 01 T 09 : 13 : 00. 928 Z'
web:dev: }
```
3. Based on that we can create an alternative Image component:

```
type Image = {
url: string
width: number
height: number
}
```
```
interface Props extends Image {
alternativeText: string
formats: {
thumbnail: Image
small: Image
large: Image
medium: Image
}
}
```
```
const Image = (props: Props) => {
return (
<img
srcSet={`${props.formats.small.url} ${props.formats.small.width}w,
${props.formats.medium.url} ${props.formats.medium.width}w,
${props.formats.large.url} ${props.formats.large.width}w`}
sizes='(max-with: 30 em) 30 em, 100 vw'
src={props.url}
alt={props.alternativeText}
/>
)
}
```
```
export default Image
```
and plug that into a Post:

```
...
return (
<div className='prose'>
<h 2 >{post.title}</h 2 >
<p className='font-bold'>{post.intro}</p>
<Image {...image} />
<p className='mt- 4 '>{post.body}</p>
</div>
)...
```
**Transformations**

```
Cloudinary dynamic URL transformations enable you to adjust the original images to fit the design of your
website.
```

13. Cloudinary images with Next.js 4

```
Image Transformations for Developers | Cloudinary
Whether your web or mobile application delivers your organization's own carefully selected
images, images uploaded by your end users (UGC), or both, you probably need to adjust the
originals to fit the graphic design of your website or mobile application.
https://cloudinary.com/documentation/image_transformations
```
There are multiple SDKs, including a React frontend framework library:

```
React SDK
This page provides an in-depth introduction to the React frontend framework library.
Cloudinary's React frontend framework library provides image rendering capabilities and
plugins that you can implement using code that integrates seamlessly with your existing React
https://cloudinary.com/documentation/react_integration
```
But here we’ll just play with vanilla URL transformations.

Here’s an example transformation:

https://res.cloudinary.com/dv5ip47p2/image/upload/q_70,w_512,ar_1.5,c_crop/doggo3_fea88956bc.webp

```
1. The URL part ‘dv5ip47p2’ is our Cloudinary cloud name, and to use it we need to add this as an environment
variable:
```
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dv 5 ip 47 p 2
```
```
2. The other parts will be injected dynamically, the transformation: ’w_512,ar_1.5,c_crop’, the public id:
‘doggo3_fea88956bc’ and the extension: ‘webp’
```
```
interface Props {
public_id: string
transformations: string
ext: string
}
```
```
const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```

13. Cloudinary images with Next.js 5

```
const TransformImage = (props: Props) => {
```
```
const {public_id, transformations='w_ 512 ', ext='jpg'} = props
```
```
if ( public_id ) {
return (
<img src={`https://res.cloudinary.com/${name}/image/upload/${transformations}/${public_id}.${ext}`} />
)
}
```
```
return <></>
}
```
```
export default TransformImage
```
3. Plug it into the page:

4.

```
...
return (
<div className='prose'>
<h 2 >{post.title}</h 2 >
<p className='font-bold'>{post.intro}</p>
<TransformImage
public_id={image.provider_metadata.public_id}
transformations='q_ 70 ,w_ 768 ,ar_ 1. 5 ,c_crop'
ext='webp'
/>
<p className='mt- 4 '>{post.body}</p>
</div>
)
...
```


This is a offline tool, your data stays locally and is not send to any server!
Feedback & Bug Reports