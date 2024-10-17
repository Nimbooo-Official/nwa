import { ThemeColorToggle } from "@/components/theme-color-toggle";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300
            bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl
            dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static
            lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30
            text-primary"
        >
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div
          className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t
            from-white via-white dark:from-black dark:via-black lg:static lg:size-auto
            lg:bg-none gap-x-1"
        >
          <ThemeColorToggle />
          <ThemeModeToggle />
        </div>
      </div>

      <div
        className="relative z-[-1] flex place-items-center before:absolute before:h-[300px]
          before:w-full before:-translate-x-1/2 before:rounded-full
          before:bg-gradient-radial before:from-white before:to-transparent
          before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px]
          after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200
          after:via-blue-200 after:blur-2xl after:content-['']
          before:dark:bg-gradient-to-br before:dark:from-transparent
          before:dark:to-primary before:dark:opacity-10 after:dark:from-sky-900
          after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px]
          sm:after:w-[240px] before:lg:h-[360px]"
      >
        {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
      </div>

      <div
        className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4
          lg:text-left gap-x-2"
      >
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border bg-card px-5 py-4 transition-colors
            hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700
            hover:dark:bg-neutral-800/30 dark:border-white dark:border-opacity-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold text-primary">
            Docs{" "}
            <span
              className="inline-block transition-transform group-hover:translate-x-1
                motion-reduce:transform-none"
            >
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border bg-card px-5 py-4 transition-colors
            hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700
            hover:dark:bg-neutral-800/30 dark:border-white dark:border-opacity-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold text-primary">
            Learn{" "}
            <span
              className="inline-block transition-transform group-hover:translate-x-1
                motion-reduce:transform-none"
            >
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border bg-card px-5 py-4 transition-colors
            hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700
            hover:dark:bg-neutral-800/30 dark:border-white dark:border-opacity-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold text-primary">
            Templates{" "}
            <span
              className="inline-block transition-transform group-hover:translate-x-1
                motion-reduce:transform-none"
            >
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border bg-card px-5 py-4 transition-colors
            hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700
            hover:dark:bg-neutral-800/30 dark:border-white dark:border-opacity-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold text-primary">
            Deploy{" "}
            <span
              className="inline-block transition-transform group-hover:translate-x-1
                motion-reduce:transform-none"
            >
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}

// <div
// className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen
//   p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
// >
// <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//   <Image
//     className="dark:invert"
//     src="https://nextjs.org/icons/next.svg"
//     alt="Next.js logo"
//     width={180}
//     height={38}
//     priority
//   />
//   <ol
//     className="list-inside list-decimal text-sm text-center sm:text-left
//       font-[family-name:var(--font-geist-mono)]"
//   >
//     <li className="mb-2">
//       Get started by editing{" "}
//       <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//         src/app/page.tsx
//       </code>
//       .
//     </li>
//     <li>Save and see your changes instantly.</li>
//   </ol>

//   <div className="flex gap-4 items-center flex-col sm:flex-row">
//     <a
//       className="rounded-full border border-solid border-transparent transition-colors flex
//         items-center justify-center bg-foreground text-background gap-2
//         hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4
//         sm:px-5"
//       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Image
//         className="dark:invert"
//         src="https://nextjs.org/icons/vercel.svg"
//         alt="Vercel logomark"
//         width={20}
//         height={20}
//       />
//       Deploy now
//     </a>
//     <a
//       className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145]
//         transition-colors flex items-center justify-center hover:bg-[#f2f2f2]
//         dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10
//         sm:h-12 px-4 sm:px-5 sm:min-w-44"
//       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Read our docs
//     </a>
//   </div>
// </main>
// <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//   <a
//     className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <Image
//       aria-hidden
//       src="https://nextjs.org/icons/file.svg"
//       alt="File icon"
//       width={16}
//       height={16}
//     />
//     Learn
//   </a>
//   <a
//     className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <Image
//       aria-hidden
//       src="https://nextjs.org/icons/window.svg"
//       alt="Window icon"
//       width={16}
//       height={16}
//     />
//     Examples
//   </a>
//   <a
//     className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <Image
//       aria-hidden
//       src="https://nextjs.org/icons/globe.svg"
//       alt="Globe icon"
//       width={16}
//       height={16}
//     />
//     Go to nextjs.org →
//   </a>
// </footer>
// </div>
