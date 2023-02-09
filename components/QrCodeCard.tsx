import Image from 'next/image';
import { Outfit } from '@next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function QrCodeCard() {
  return (
    <div
      className={`w-60 rounded-xl bg-white p-3 pb-8  drop-shadow-lg ${outfit.className}`}
    >
      <div className="mb-4">
        <Image
          src="/image-qr-code.png"
          alt="QR Code"
          width={232}
          height={232}
          className="w-full rounded-md"
        />
      </div>
      <div className="px-3">
        <h1 className="mb-4 text-center font-bold text-[#0b1b35]">
          Improve your front-end skills by building projects
        </h1>
        <p className="text-center text-xs text-[#9c9fa6]">
          Scan the QR code to visit Frontend Mentor and take your coding skills
          to the next level
        </p>
      </div>
    </div>
  );
}
