// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>src/app/page.tsx</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Calendar from "@/components/Calendar";
import AppointmentList from "@/components/AppointmentList";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentSection, setCurrentSection] = useState("agenda");

  return (
    <main>
      <div className="border-y border-zinc-800 mb-12">
        <Header
        />
      </div>
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-7xl">
          
          <div className="flex items-start gap-2">
            <div className="flex-none">
              <Sidebar onChangeSection={setCurrentSection} />
            </div>

            {/* Área principal (título + conteúdo) */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>

              {currentSection === "agenda" && (
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-none w-full md:w-[780px]">
                    <Calendar onSelectDate={setSelectedDate} />
                  </div>

                  <div className="flex-none w-full md:w-[360px]">
                    <AppointmentList date={selectedDate} />
                  </div>
                </div>
              )}

              {currentSection === "empresa" && (
                <div className="p-4 bg-neutral-900 rounded-xl text-center">
                  <h2 className="text-xl font-semibold mb-4">Dados da Empresa</h2>
                  <p className="text-gray-400">
                    Aqui ficará a futura seção de dados da empresa…
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
