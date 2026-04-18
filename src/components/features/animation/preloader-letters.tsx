'use client';

import React, { useCallback, useEffect } from 'react';

import { cn } from '@/lib/utils';

import { useAnimation } from 'motion/react';
import * as motion from 'motion/react-client';

const LETTERS = ['M', 'T'] as const;
const REST_DURATION = 0.5;
const SLIDE_DURATION = 0.8;

const PreloaderLetters = () => {
	const controls = useAnimation();

	const runCycle = useCallback(async () => {
		controls.set({ x: '0%' });
		await new Promise((r) => setTimeout(r, REST_DURATION * 1000));

		await controls.start({
			x: '-100%',
			transition: { duration: SLIDE_DURATION, ease: 'easeInOut' },
		});

		await new Promise((r) => setTimeout(r, REST_DURATION * 1000));

		await controls.start({
			x: '-200%',
			transition: { duration: SLIDE_DURATION, ease: 'easeInOut' },
		});

		controls.set({ x: '0%' });
		void runCycle();
	}, [controls]);

	useEffect(() => {
		void runCycle();
	}, [runCycle]);

	return (
		<div className='relative size-[2.3em] overflow-hidden rounded-full'>
			<motion.div
				animate={controls}
				className='flex flex-row'
				initial={{ x: '0%' }}
			>
				{/* [Q, N, Q] – duplicate for seamless loop */}
				{[...LETTERS, LETTERS[0]].map((letter, i) => (
					<span
						key={`${letter}-${String(i)}`}
						className={cn(
							'flex size-[2.3em] shrink-0 items-center justify-center',
							letter === 'T' && '-translate-x-2',
						)}
					>
						{letter}
					</span>
				))}
			</motion.div>
		</div>
	);
};

export default PreloaderLetters;
