import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="w-full max-w-4xl h-[80vh] md:max-h-[700px] flex justify-center m-10 mx-auto items-center p-5">
          <Card className="w-full min-w-[400px] m-auto p-10 flex flex-col-reverse md:flex-row md:h-full items-center">
            <div className="w-full md:w-1/2 ">{children}</div>
            <Separator
              orientation="vertical"
              className="mx-2 h-full hidden md:block"
            />
            <div className="w-3/4  md:w-1/2 md:h-full md:flex ">
              <Image
                width={900}
                height={300}
                className="w-full object-contain"
                src="/assets/logo/astraph.png"
                alt="Astraph.AI"
              />
            </div>
          </Card>
        </div>
      </body>
    </html>
  );
}
