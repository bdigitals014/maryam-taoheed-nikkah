'use client';

import React, { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

const ParallaxBg = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

	return (
		<motion.section ref={ref} className='relative h-screen overflow-hidden'>
			<motion.div
				className='absolute inset-0 min-h-[150%] w-full bg-[url(/images/hall2.webp)] bg-cover bg-[50%_50%] bg-no-repeat'
				style={{ y }}
			/>
		</motion.section>
	);
};

export default ParallaxBg;
