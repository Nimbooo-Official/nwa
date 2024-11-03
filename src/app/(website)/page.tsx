import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Features } from "./Features";
// import { How } from "./How";
import { Faq } from "./Faq";
import { Testimonials } from "./Testimonials";
import { Footer } from "./Footer";
import { Stats } from "./Stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      {/* <How /> */}
      <Faq />
      <Testimonials />
      <Footer />
    </>
  );
}

// {/* <main className="flex min-h-screen flex-col items-center justify-between p-4">
// <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//   <ThemeColorToggle />
//   <ThemeModeToggle />
// </div>
// <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
// <p className="text-primary">
//   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id magnam
//   porro, voluptatem quidem aperiam aspernatur, laudantium fuga excepturi
//   atque dolor labore reprehenderit harum ipsam esse. Quaerat, विमानों को
//   बम से उड़ाने की धमकी से जुड़े मामले थम नहीं रहे हैं. अब 85 विमानों को
//   उड़ाने की धमकी मिली है. इनमें एअर इंडिया के 20 विमान शामिल हैं. इससे
//   nihil suscipit at inventore velit libero similique dolorem, perspiciatis
//   beatae ab porro. A et sequi cumque architecto ex, dolor exercitationem
//   praesentium, fugit inventore unde, ad veritatis. Delectus deleniti
//   aliquid enim provident odio, sint amet ಬಿಗ್‌ ಬಾಸ್‌ ಮನೆಯಲ್ಲೀಗ ಮನೆಯ
//   ಸದಸ್ಯರನ್ನು ಎರಡು ರಾಜಕೀಯ ಪಕ್ಷಗಳನ್ನಾಗಿ ವಿಂಗಡಿಸಿ ರಾಜಕೀಯದ ಟಾಸ್ಕ್ ನೀಡಿದ್ದಾರೆ .
//   ಹನುಮಂತ ಮಾತ್ರವಲ್ಲದೇ ಅತ್ತ ಮಾನಸ ಅವರ ಮೇಲೆಯೂ ಮಂಜು ಅವರು ಬಲ ಪ್ರಯೋಗ ಮಾಡಿದಂತಿದೆ.
//   ಆಡುವ ಭರದಲ್ಲಿ ಮಾನಸ ಅವರನ್ನು ದೂಡಿದ್ದಾರೆ. ಮಾನ ಕೂಡ ನೋವು ತಾಳಲಾರದೇ
//   ಕಣ್ಣೀರಿಟ್ಟಿದ್ದಾರೆ. tempore vel itaque aut reprehenderit quae nulla
//   debitis esse obcaecati temporibus beatae doloremque, quasi maxime,
//   consequatur error! Commodi laudantium iusto magni laboriosam praesentium
//   molestias omnis nam, obcaecati at illo iure quos saepe fugit excepturi,
//   voluptas veritatis neque asperiores officia culpa earum eum minus.
//   Incidunt cupiditate molestias laboriosam, minima aliquid, magnam sequi
//   repudiandae ipsam nam facilis sapiente rem sit libero laudantium amet
//   impedit praesentium in iure? Unde, ನವದೆಹಲಿ, ಅಕ್ಟೋಬರ್ 24: ದೀಪಾವಳಿ ಹಬ್ಬದ
//   ಸಮಯದಲ್ಲಿ ಭಾರತದ ಆಹಾರ ವಿತರಣಾ ಸಂಸ್ಥೆಗಳಾದ ಝೊಮ್ಯಾಟೊ ಮತ್ತು ಸ್ವಿಗ್ಗಿ ಗ್ರಾಹಕರಿಗೆ
//   ಶುಲ್ಕದ ಬರೆ ಹಾಕಿದೆ. ಪ್ಲಾಟ್‌ ಫಾರ್ಮ್‌ ಶುಲ್ಕವನ್ನು ಏರಿಕೆ ಮಾಡಲಾಗಿದೆ. 2023ರಲ್ಲಿ
//   ಎರಡೂ ಸಂಸ್ಥೆಗಳು ಈ ಮಾದರಿ ಶುಲ್ಕವನ್ನು ಜಾರಿಗೆ ತಂದಿದ್ದವು. ಆದರೆ ಈಗ ಹಬ್ಬ ಎದುರಾದ
//   ಸಂದರ್ಭದಲ್ಲಿಯೇ ಶುಲ್ಕವನ್ನು ಏರಿಕೆ ಮಾಡಲಾಗಿದೆ.culpa qui quas inventore
//   perspiciatis, a molestias ipsam dolor nobis iure delectus similique
//   accusantium libero provident. Repellat quia facere impedit, cum, debitis
//   cumque sapiente velit in reiciendis fugiat cupiditate ab nam voluptatum
//   ad natus rerum dolorem incidunt temporibus fuga soluta qui neque.
//   Aperiam eum velit asperiores nihil non odio, facere consectetur
//   doloremque. Officiis, doloremque quod! Voluptatum, molestias magni.
//   Asperiores voluptate exercitationem fugiat laborum sit incidunt,
//   voluptatum sapiente, excepturi tempore, ex dolore? Assumenda illum cum
//   eos aliquam praesentium, sed et quasi, tenetur autem architecto esse
//   maxime tempore, inventore laborum blanditiis nostrum mollitia. Rem nobis
//   possimus dolor dolores veritatis quam nam molestias repellat corporis
//   sapiente eligendi quidem distinctio labore tempora vero numquam
//   consequatur enim dolore obcaecati, iste unde provident eius. Unde totam
//   quaerat impedit voluptate quae nulla molestias repudiandae, aspernatur
//   odio ipsa culpa? Ab quisquam perferendis esse error, reiciendis
//   accusamus nam blanditiis officiis consequuntur, enim alias quis dicta
//   vel possimus ullam iusto vero omnis nihil earum atque assumenda et.
//   Impedit provident saepe libero ducimus voluptate labore beatae assumenda
//   soluta temporibus nemo a illo exercitationem rerum neque accusamus cum,
//   unde explicabo praesentium minus quidem iure sed culpa excepturi et.
//   Sunt, autem dolore ab, reprehenderit alias quas accusantium, quaerat
//   perspiciatis cupiditate in placeat. Id quas aperiam est nam vero, vel
//   aspernatur facilis distinctio velit nihil? Deserunt, laudantium animi?
//   Illo libero beatae sint porro deleniti similique eum deserunt delectus
//   recusandae alias mollitia, at doloribus ut perferendis, eius praesentium
//   rerum debitis asperiores dolore amet minus quasi necessitatibus velit!
//   Animi ex quisquam, in sit odio soluta molestias minus commodi eligendi
//   fuga placeat enim similique sapiente aut expedita ipsa nesciunt numquam
//   pariatur optio laborum? Corporis accusantium, natus, eos voluptas modi
//   odio quam nihil ratione molestiae officiis commodi reiciendis, porro
//   blanditiis tempora! Ullam maxime at ipsum quaerat dicta numquam
//   reprehenderit nam est voluptates voluptas laboriosam id, suscipit eaque
//   quod voluptatibus laudantium aliquam unde fugiat molestiae? Harum
//   reiciendis error soluta, facilis at iure dolor cum ipsum amet
//   dignissimos a quidem totam exercitationem eligendi et voluptate, nemo
//   veniam sunt consectetur eius? Deleniti doloremque dolores eum
//   consectetur aspernatur quo assumenda incidunt distinctio, optio id
//   tenetur nisi minima asperiores! Dicta molestiae velit ullam non, iusto
//   nobis quod adipisci hic nostrum maiores enim, minus illum consectetur
//   placeat, voluptas sit sint temporibus earum fugiat! Nam recusandae quasi
//   voluptatum aut corporis provident dicta alias quisquam dolor nobis, qui
//   rem vero repellat veniam. Magnam blanditiis recusandae esse delectus,
//   totam perferendis ullam eveniet quidem, necessitatibus ut ipsum quae hic
//   minima harum inventore? Magni earum corporis, obcaecati nemo aut
//   consectetur unde eius impedit, tempore illo perferendis deleniti ullam
//   qui quod harum natus et cupiditate reprehenderit exercitationem!
//   Perferendis mollitia, necessitatibus eos, temporibus fugiat amet placeat
//   provident impedit, rerum tempora eligendi molestias. Dolor, qui officiis
//   quis perspiciatis inventore, rem cupiditate ex sequi quasi repudiandae
//   non quae magni consequuntur recusandae eius fuga consequatur quam nemo
//   dignissimos. Numquam consectetur illum tenetur eius nam porro
//   reprehenderit debitis? Nihil at quis porro ex eveniet ipsum in
//   praesentium dolore. Iste quidem exercitationem dolores reprehenderit est
//   commodi consequatur voluptatum quis expedita veniam ratione non officia
//   sint cum dolor et esse hic fugit, accusamus fuga labore fugiat sunt
//   soluta incidunt. Voluptates sint doloribus iusto vitae veritatis, labore
//   dicta quis amet tenetur tempore quisquam velit, commodi alias et. A
//   excepturi error commodi maiores id optio illum pariatur, necessitatibus
//   fuga, non quis autem hic. Autem tenetur optio quaerat a vitae
//   consequatur est. Officia aliquam illum libero accusamus exercitationem
//   voluptas tempora optio ducimus suscipit magnam, perferendis impedit
//   error autem porro dolorem a quasi cupiditate quibusdam expedita totam
//   vitae assumenda tempore. Delectus quasi incidunt libero magnam. Dolore
//   non quis voluptatibus maiores perspiciatis, cumque optio. Veritatis quia
//   quisquam autem? Sapiente, delectus molestias? Animi officiis, iusto sed
//   non iure quis eius tenetur nisi nemo necessitatibus, consequatur eaque
//   ut dolor corporis mollitia atque, velit eligendi esse deleniti cumque?
//   Laudantium culpa, voluptatem in temporibus dolore dignissimos ullam?
//   Porro dignissimos sapiente mollitia suscipit fugiat officia id animi
//   perferendis sunt quae soluta debitis corporis voluptatibus, nulla, autem
//   dolore in corrupti cumque est sed. Tempora, molestiae non? Deserunt iure
//   quibusdam sequi repellat aspernatur accusantium quam hic inventore
//   incidunt cumque, magni modi dignissimos, corporis saepe vitae iste
//   commodi debitis reiciendis quidem nesciunt, velit facere voluptate ea
//   doloribus? Et voluptas laudantium omnis eos error nesciunt quaerat sint
//   voluptatibus qui, molestias non nobis quasi illo ipsam earum voluptatum
//   tempore eveniet. Obcaecati molestiae dicta esse natus, perferendis,
//   voluptas quidem cupiditate provident tempora ullam quasi voluptatibus
//   temporibus ea corporis dolor veniam. Beatae incidunt aliquam natus
//   quaerat tenetur, necessitatibus dolorum iusto ipsam maxime tempore rerum
//   officiis pariatur, quam qui a quia sint excepturi cum est dolor earum
//   assumenda. Quae cum, illum aliquid minus tempora atque neque totam quod
//   architecto molestiae voluptas vitae in dolorum velit placeat facilis
//   ratione quis laborum reprehenderit laboriosam at, maiores repellendus.
//   Neque vero enim sint porro illo. Est tempora, illum nesciunt expedita
//   veritatis atque culpa cupiditate quam fugit! Veritatis similique
//   doloribus nulla perspiciatis itaque repellat, et fugiat suscipit libero
//   illum blanditiis, aliquam repudiandae reprehenderit rem! Facilis vel
//   quos doloribus nobis amet, inventore officia ullam vitae animi molestiae
//   neque! Praesentium delectus consectetur nulla obcaecati, consequuntur
//   architecto neque quia exercitationem quo, rem repudiandae placeat magni
//   voluptas assumenda sit quod dignissimos temporibus optio beatae sequi?
//   Reiciendis eveniet voluptatum libero expedita necessitatibus temporibus
//   quia officia numquam iure cumque, itaque fuga dignissimos, provident
//   tempore ab unde, laborum nemo rem architecto.
// </p>
// </main> */}

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
