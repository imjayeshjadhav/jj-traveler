"use client"
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

// Type definitions
interface ImageClipBoxProps {
  src: string;
  clipClass: string;
}

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass }) => (
  <div className={clipClass}>
    <Image src={src} alt="" layout="fill" objectFit="cover" />
  </div>
);

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord className="text-white" /> },
  { href: "https://twitter.com", icon: <FaTwitter className="text-white" /> },
  { href: "https://youtube.com", icon: <FaYoutube className="text-white" /> },
  { href: "https://medium.com", icon: <FaMedium className="text-white" /> },
];


const Contact: React.FC = () => {
  const router  = useRouter()

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden flex flex-col items-center text-center">
        <Link href="/" className="font-general text-[10px] uppercase"> Traveler</Link>
        <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem] uppercase">
          Let &apos;s e<b>x</b>plore the <br /> new era of <br />s<b>e</b>asonal j<b>o</b>urneys together
        </p>
        <Button id="Contact us" title="Contact us" containerClass="mt-10 cursor-pointer" />

        <div className="w-full py-4 text-white mt-20 border-t border-gray-700 ">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 mt-20 px-4 md:flex-row">
            <p className="text-center text-md font-light md:text-left">
              &copy; Traveler 2025. All rights reserved
            </p>

            <div className="flex -ml-28 justify-center gap-4 md:justify-start">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-500 ease-in-out hover:text-gray-400"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <a
              href="#privacy-policy"
              className="text-center text-md font-light hover:underline md:text-right"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
