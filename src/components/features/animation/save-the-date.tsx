'use client';

import React, { useMemo, useRef } from 'react';

import useTailwindBreakpoints from '@/hooks/use-tailwind-breakpoints';

import TextReveal from '@/components/features/animation/text-reveal';
import Calendar from '@/components/features/homepage/calendar';
import Polaroid from '@/components/features/homepage/polaroid';

import { useScroll, useTransform } from 'motion/react';
import * as motion from 'motion/react-client';

const SaveTheDate = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start 50%', 'end 50%'],
	});

	const { width } = useTailwindBreakpoints();

	const y1Positions = useMemo(() => {
		if (width < 768) {
			return ['0%', '-400%'];
		}

		return ['0%', '-200%'];
	}, [width]);

	const y2Positions = useMemo(() => {
		if (width < 768) {
			return ['200%', '-200%'];
		}

		return ['100%', '-85%'];
	}, [width]);

	const y3Positions = useMemo(() => {
		if (width < 768) {
			return ['50%', '-40%'];
		}

		return ['0%', '-40%'];
	}, [width]);

	const y1 = useTransform(scrollYProgress, [0, 1], y1Positions);
	const y2 = useTransform(scrollYProgress, [0, 1], y2Positions);
	const y3 = useTransform(scrollYProgress, [0, 1], y3Positions);

	return (
		<section
			ref={containerRef}
			className='flex flex-col items-center gap-y-[8.4375rem] py-[9.125rem] lg:overflow-hidden'
		>
			<h3 className='text-primary font-aphrodite-slim-contextual -mb-2 text-[4.5rem] leading-[100%] tracking-[-0.03em] md:text-[6.25rem]'>
				<TextReveal lines={['May']} />
			</h3>
			<div className='relative'>
				<motion.div
					className='absolute top-[32%] left-1/2 -translate-x-1/2 max-md:-z-10 max-md:scale-50 md:left-0 md:-translate-x-[110%]'
					style={{ y: y1 }}
				>
					<Polaroid
						classNames={{
							base: 'rotate-[-18.53deg] relative',
						}}
						image='/images/mosque.webp'
					/>
				</motion.div>
				<motion.div
					className='absolute bottom-[-70%] left-[5%] max-md:scale-50 md:top-[23%] md:right-0 md:bottom-[unset] md:left-[unset] md:translate-x-[110%]'
					style={{ y: y2 }}
				>
					<Polaroid
						classNames={{
							base: 'rotate-[-18.32deg] md:rotate-[18.32deg] relative',
						}}
						image='/images/bouquet.png'
					/>
				</motion.div>
				<motion.div
					className='absolute right-[10%] bottom-[-65%] z-10 max-md:scale-50 max-md:rotate-[17.32deg] md:top-[110%] md:right-[unset] md:bottom-[unset] md:left-[57%]'
					style={{ y: y3 }}
				>
					<Polaroid
						classNames={{
							base: 'rotate-[3.45deg] relative',
							image: 'w-[10.8875rem] h-[8.115rem]',
						}}
						image='/images/quran.webp'
					/>
				</motion.div>
				<Calendar />
			</div>
		</section>
	);
};

export default SaveTheDate;
