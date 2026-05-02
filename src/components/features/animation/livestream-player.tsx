'use client';

import React from 'react';
import * as motion from 'motion/react-client';

const LivestreamPlayer = () => {
	return (
		<motion.div
			initial={{ y: '120%', opacity: 0 }}
			animate={{ y: '0%', opacity: 1 }}
			transition={{
				duration: 1,
				delay: 0.5,
				ease: [0.22, 1, 0.36, 1],
			}}
			/* 1. Changed 'relative' to 'fixed' to keep it in one spot.
			   2. Reduced mobile width from 19.6rem to 8rem (~128px).
			   3. Positioned it at the bottom right with 'bottom-4 right-4'.
			*/
			className='fixed bottom-6 right-4 z-50 w-[8rem] sm:w-[13.5625rem]'
		>
			<div className='relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl backdrop-blur-sm'>
				{/* Added a subtle overlay to make the video feel more integrated */}
				<div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
				
				<video
					autoPlay
					loop
					muted
					playsInline
					className='h-full w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500'
				>
					<source src='/videos/video.mp4' type='video/mp4' />
				</video>
			</div>

			{/* Optional: Close button or 'Live' indicator could go here */}
		</motion.div>
	);
};

export default LivestreamPlayer;