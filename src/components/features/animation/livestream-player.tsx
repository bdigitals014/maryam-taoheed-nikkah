'use client';

import React from 'react';

import * as motion from 'motion/react-client';

const LivestreamPlayer = () => {
	return (
		<motion.div
			animate={{ y: '0%', opacity: 1 }}
			className='absolute top-[40%] right-4 z-50 w-[8rem] sm:fixed sm:right-4 sm:bottom-6 sm:w-[13.5625rem]'
			transition={{
				duration: 1,
				delay: 0.5,
				ease: [0.22, 1, 0.36, 1],
			}}
			/* MOBILE: 'absolute' so it scrolls away and doesn't block screenshots.
			   DESKTOP: 'fixed' so it stays pinned as a PiP (Picture-in-Picture) player.
			*/
			initial={{ y: '120%', opacity: 0 }}
		>
			<div className='relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl backdrop-blur-sm'>
				<div className='pointer-events-none absolute inset-0 z-10 bg-black/10' />

				<video
					autoPlay
					loop
					muted
					playsInline
					className='h-full w-full object-cover grayscale-[20%] transition-all duration-500 hover:grayscale-0'
				>
					<source src='/videos/video.mp4' type='video/mp4' />
				</video>
			</div>
		</motion.div>
	);
};

export default LivestreamPlayer;
