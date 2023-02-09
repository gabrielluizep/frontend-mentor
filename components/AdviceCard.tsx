import Image from 'next/image';
import { Manrope } from '@next/font/google';
import { useEffect, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

const manrope = Manrope({ subsets: ['latin'] });

interface Advice {
  advice: string;
  id: string;
}

const getAdvice = async () => {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const { slip } = await response.json();
    return { id: slip.id.toString(), advice: slip.advice };
  } catch (error) {
    console.log(error);
    return { id: -1, advice: 'Error' };
  }
};

const loadingAdvice: Advice = { id: '', advice: 'Loading' };

export default function AdviceCard() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [advice, setAdvice] = useState<Advice>(loadingAdvice);

  const handleUpdateAdvice = () => {
    setAdvice(loadingAdvice);

    getAdvice().then((data) => {
      setAdvice(data);
    });
  };

  useEffect(() => {
    handleUpdateAdvice();
  }, []);

  return (
    <div
      className={`${manrope.className} relative flex max-w-sm flex-col items-center rounded-xl bg-[#313a49] px-12 pt-9 pb-14 text-center sm:max-w-md`}
    >
      <p className="tracking mb-10 text-sm font-bold tracking-[0.3em] text-[#55ffab]">
        ADVICE #{advice.id}
      </p>
      <p className="mb-10 text-2xl font-bold text-[#cee3e8]">{`"${advice.advice}"`}</p>
      <Image
        src={
          isMobile
            ? '/pattern-divider-mobile.svg'
            : '/pattern-divider-desktop.svg'
        }
        alt="Pattern"
        height={16}
        width={isMobile ? 295 : 444}
      />

      <button
        onClick={handleUpdateAdvice}
        className="after:content absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full bg-[#55ffab] p-4 outline-none after:absolute after:z-0 after:h-full after:w-full after:-translate-y-1/2 after:-translate-x-1/2 after:rounded-full after:bg-transparent after:blur-2xl after:transition-all hover:after:bg-[#55ffab]"
      >
        <Image src="/icon-dice.svg" alt="Dice" width={24} height={24} />
      </button>
    </div>
  );
}
