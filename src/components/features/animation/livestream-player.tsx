'use client';

import React from 'react';

import * as motion from 'motion/react-client';

const LivestreamPlayer = () => {
	return (
		<motion.div
			animate={{ y: '0%', opacity: 1 }}
			className='relative w-[19.625rem] sm:w-[13.5625rem]'
			initial={{ y: '120%', opacity: 0 }}
			transition={{
				duration: 1,
				delay: 0.5,
				ease: [0.22, 1, 0.36, 1],
				opacity: {
					duration: 1,
					delay: 0.5,
					ease: [0.22, 1, 0.36, 1],
				},
			}}
		>
			<div className='relative aspect-[9/16] w-full overflow-hidden rounded-[0.375rem]'>
				<video
					autoPlay
					loop
					muted
					playsInline
					className='h-full w-full object-cover'
				>
					<source src='/videos/video.mp4' type='video/mp4' />
				</video>
			</div>
		</motion.div>
	);
};

export default LivestreamPlayer;
