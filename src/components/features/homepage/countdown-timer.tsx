'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

const TARGET_DATE = new Date('2026-05-30T00:00:00');

const padWithZero = (n: number) => n.toString().padStart(2, '0');

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

function getTimeLeft(target: Date): TimeLeft | null {
	const now = new Date();
	const diff = target.getTime() - now.getTime();

	if (diff <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	const totalSeconds = Math.floor(diff / 1000);
	const days = Math.floor(totalSeconds / (24 * 60 * 60));
	const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
	const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
	const seconds = totalSeconds % 60;

	return { days, hours, minutes, seconds };
}

function TimeUnit({ value, label }: { value: string; label: string }) {
	return (
		<div className='relative flex h-[5.375rem] w-[5.4375rem] flex-col overflow-hidden rounded-[0.55rem] lg:h-[12.25rem] lg:w-[9.8125rem] lg:rounded-2xl'>
			{/* Split halves per Figma design */}
			<div className='bg-primary -mb-px h-[2.6875rem] w-full shrink-0 rounded-[0.55rem] lg:h-[6.125rem] lg:rounded-2xl' />
			<div className='bg-primary h-[2.6875rem] w-full shrink-0 rounded-[0.55rem] lg:h-[6.125rem] lg:rounded-2xl' />
			{/* Number - Louize Display 100px */}
			<div className='text-primary-foreground font-louize-display absolute inset-x-0 top-2 flex justify-center text-5xl leading-[100%] tracking-[-0.02em] lg:top-[1.9375rem] lg:text-[6.25rem]'>
				{value}
			</div>
			{/* Label - Neue Montreal 16px */}
			<div className='text-primary-foreground absolute right-0 bottom-2 left-0 text-center text-[0.55rem] leading-[1.2] tracking-[-0.02em] lg:bottom-4 lg:text-base'>
				{label}
			</div>
		</div>
	);
}

export default function CountdownTimer() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	const parallaxY = useTransform(scrollYProgress, [0, 1], ['8%', '-18%']);

	useEffect(() => {
		const update = () => {
			setTimeLeft(getTimeLeft(TARGET_DATE));
		};

		update();

		const interval = setInterval(update, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	if (timeLeft === null) {
		return (
			<div ref={containerRef} className='relative lg:pt-5'>
				<div className='flex flex-col items-center lg:flex-row lg:gap-6'>
					<div className='bg-primary/60 h-[5.375rem] w-[5.4375rem] animate-pulse rounded-[0.55rem] lg:h-[12.25rem] lg:w-[9.8125rem] lg:rounded-2xl' />
					<span className='text-primary font-louize-display text-5xl leading-[65%] lg:text-[8rem]'>
						:
					</span>
					<div className='bg-primary/60 h-[5.375rem] w-[5.4375rem] animate-pulse rounded-[0.55rem] lg:h-[12.25rem] lg:w-[9.8125rem] lg:rounded-2xl' />
					<span className='text-primary font-louize-display text-5xl leading-[65%] lg:text-[8rem]'>
						:
					</span>
					<div className='bg-primary/60 h-[5.375rem] w-[5.4375rem] animate-pulse rounded-[0.55rem] lg:h-[12.25rem] lg:w-[9.8125rem] lg:rounded-2xl' />
					<span className='text-primary font-louize-display text-5xl leading-[65%] lg:text-[8rem]'>
						:
					</span>
					<div className='bg-primary/60 h-[5.375rem] w-[5.4375rem] animate-pulse rounded-[0.55rem] lg:h-[12.25rem] lg:w-[9.8125rem] lg:rounded-2xl' />
				</div>
			</div>
		);
	}

	return (
		<div ref={containerRef} className='relative lg:pt-5'>
			<div className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-lg:-mt-4'>
				<div className='flex flex-col items-center gap-y-[1.1875rem]'>
					<p className='font-louize-display text-primary -ml-5 text-[12.5rem] leading-none tracking-[-0.03em]'>
						{timeLeft.days + 1}
					</p>
					<p className='text-primary-foreground bg-primary w-full max-w-[10.0625rem] p-3 text-center text-lg tracking-[-0.02em]'>
						Days Left
					</p>
				</div>
			</div>
			<motion.div
				className='pointer-events-none flex flex-col items-center justify-center gap-2 opacity-15 will-change-transform lg:scale-125 lg:flex-row lg:gap-6'
				style={{ y: parallaxY }}
			>
				<TimeUnit label='Days' value={timeLeft.days.toString()} />
				<span
					aria-hidden
					className='text-primary font-louize-display text-5xl leading-[65%] max-lg:-translate-y-2 lg:text-[8rem]'
				>
					:
				</span>
				<TimeUnit label='Hours' value={padWithZero(timeLeft.hours)} />
				<span
					aria-hidden
					className='text-primary font-louize-display text-5xl leading-[65%] max-lg:-translate-y-2 lg:text-[8rem]'
				>
					:
				</span>
				<TimeUnit label='Minutes' value={padWithZero(timeLeft.minutes)} />
				<span
					aria-hidden
					className='text-primary font-louize-display text-5xl leading-[65%] max-lg:-translate-y-2 lg:text-[8rem]'
				>
					:
				</span>
				<TimeUnit label='Seconds' value={padWithZero(timeLeft.seconds)} />
			</motion.div>
		</div>
	);
}
