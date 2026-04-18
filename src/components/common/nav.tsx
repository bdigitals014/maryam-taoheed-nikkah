'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { useScrollLock } from '@/hooks/use-scroll-lock';

import LivestreamComingSoon from '@/components/features/animation/livestream-coming-soon';
import LivestreamPlayer from '@/components/features/animation/livestream-player';
import { Button } from '@/components/ui/button';

import * as motion from 'motion/react-client';
import Link from 'next/link';

const navItems = [
	{
		label: 'Event Details',
		href: '#event-details',
	},
	{
		label: 'RSVP',
		href: '#rsvp',
	},
	{
		label: 'Countdown',
		href: '#countdown',
	},
];

const PANEL_DURATION = 0.5;
const STAGGER_DELAY = 0.12;

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);

	useScrollLock(isOpen);

	return (
		<nav className='relative flex items-center justify-between p-5'>
			<time
				className={cn(
					'bg-primary text-primary-foreground z-50 rounded-[0.375rem] px-4 py-3.5 text-lg leading-[90%] transition-colors duration-300 max-md:hidden',
					isOpen && 'text-primary bg-primary-foreground',
				)}
				dateTime='2026-05-30'
			>
				Saturday, 30 May 2026
			</time>
			<span
				className={cn(
					'font-louize-display left-5 z-50 text-2xl font-medium tracking-[-0.02em] text-[#232323] transition-colors duration-300 md:absolute md:left-1/2 md:-translate-x-1/2',
					isOpen && 'text-primary-foreground',
				)}
			>
				M&T
			</span>
			<div>
				<div className='hidden items-center gap-x-2 lg:flex'>
					{navItems.map((item, index) => (
						<Link
							key={item.href}
							className='text-primary text-lg leading-[90%]'
							href={item.href}
						>
							{item.label}
							{index < navItems.length - 1 && ','}
						</Link>
					))}
				</div>
				<Button
					className={cn(
						'relative z-50 flex size-12 items-center justify-center rounded-full p-0 px-0 py-0 transition-colors duration-300 lg:hidden',
						isOpen && 'bg-primary-foreground text-primary',
					)}
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					<svg
						className={cn(
							'absolute top-1/2 left-1/2 size-5 shrink-0 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300',
							isOpen && 'opacity-100',
						)}
						fill='none'
						height='20'
						viewBox='0 0 20 20'
						width='20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M10.8887 10L17.627 16.748L16.748 17.627L10 10.8887L3.25195 17.627L2.37305 16.748L9.11133 10L2.37305 3.25195L3.25195 2.37305L10 9.11133L16.748 2.37305L17.627 3.25195L10.8887 10Z'
							fill='#00674E'
						/>
					</svg>
					<svg
						className={cn(
							'absolute top-1/2 left-1/2 size-[1.4375rem] h-[0.8125rem] shrink-0 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-300',
							isOpen && 'opacity-0',
						)}
						fill='none'
						height='13'
						viewBox='0 0 23 13'
						width='23'
						xmlns='http://www.w3.org/2000/svg'
					>
						<line stroke='currentColor' x2='23' y1='0.5' y2='0.5' />
						<line stroke='currentColor' x2='23' y1='6.5' y2='6.5' />
						<line stroke='currentColor' x2='23' y1='12.5' y2='12.5' />
					</svg>
				</Button>
			</div>
			<motion.div
				animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? '0%' : '-100%' }}
				className='bg-primary fixed top-0 left-0 z-10 flex size-full flex-col items-center justify-end p-5 pt-20'
				initial={{ opacity: 0, y: '-100%' }}
				transition={{
					duration: PANEL_DURATION,
					ease: [0.22, 1, 0.36, 1],
				}}
			>
				<div className='absolute top-[35%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-8'>
					{navItems.map((item, index) => (
						<Link
							key={item.href}
							className='text-primary-foreground relative overflow-hidden text-[2.5rem] leading-[90%]'
							href={item.href}
							onClick={() => {
								setIsOpen(false);
							}}
						>
							<motion.span className='whitespace-nowrap opacity-0'>
								{item.label}
							</motion.span>
							<motion.span
								animate={
									isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }
								}
								className='absolute top-0 left-0 whitespace-nowrap'
								initial={{ opacity: 0, y: '100%' }}
								transition={{
									opacity: {
										delay: isOpen ? PANEL_DURATION + index * STAGGER_DELAY : 0,
										duration: 1,
										ease: [0.22, 1, 0.36, 1],
									},
									y: {
										delay: isOpen ? PANEL_DURATION + index * STAGGER_DELAY : 0,
										duration: 1,
										ease: [0.22, 1, 0.36, 1],
									},
								}}
							>
								{item.label}
							</motion.span>
						</Link>
					))}
				</div>
				<div className='flex flex-col items-center gap-y-4'>
					<motion.div
						animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
						initial={{ opacity: 0, y: '100%' }}
						transition={{
							opacity: {
								delay: isOpen ? PANEL_DURATION + 3 * STAGGER_DELAY : 0,
								duration: 1,
								ease: [0.22, 1, 0.36, 1],
							},
							y: {
								delay: isOpen ? PANEL_DURATION + 3 * STAGGER_DELAY : 0,
								duration: 1,
								ease: [0.22, 1, 0.36, 1],
							},
						}}
					>
						<LivestreamPlayer />
					</motion.div>
					<motion.div
						animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
						initial={{ opacity: 0, y: '100%' }}
						transition={{
							opacity: {
								delay: isOpen ? PANEL_DURATION + 4 * STAGGER_DELAY : 0,
								duration: 1,
								ease: [0.22, 1, 0.36, 1],
							},
							y: {
								delay: isOpen ? PANEL_DURATION + 4 * STAGGER_DELAY : 0,
								duration: 1,
								ease: [0.22, 1, 0.36, 1],
							},
						}}
					>
						<LivestreamComingSoon className='text-primary-foreground' />
					</motion.div>
				</div>
			</motion.div>
		</nav>
	);
};

export default Nav;
