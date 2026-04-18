'use client';

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

import { useScrollLock } from '@/hooks/use-scroll-lock';

import PreloaderLetters from '@/components/features/animation/preloader-letters';
import TextReveal from '@/components/features/animation/text-reveal';

import * as motion from 'motion/react-client';
import Image from 'next/image';

const TOTAL_RIBBON_FRAMES = 192;

export const PreloaderContext = createContext(false);

export function usePreloaderReady() {
	return useContext(PreloaderContext);
}

const getRibbonFramePath = (index: number) => {
	const filename = `Scroll trigger sequence_${String(index).padStart(5, '0')}.png`;

	return `/images/ribbon/${encodeURIComponent(filename)}`;
};

async function loadGLBModel(): Promise<void> {
	const { GLTFLoader } = await import(
		'three/examples/jsm/loaders/GLTFLoader.js'
	);
	const loader = new GLTFLoader();

	await loader.loadAsync('/models/diamond_engagement_ring.glb');
}

function loadRibbonFrames(
	onProgress: (loaded: number, total: number) => void,
): Promise<void> {
	return new Promise((resolve) => {
		const state = { loaded: 0 };
		const total = TOTAL_RIBBON_FRAMES;

		const checkComplete = () => {
			state.loaded += 1;
			onProgress(state.loaded, total);

			if (state.loaded >= total) {
				resolve();
			}
		};

		for (let i = 0; i < total; i++) {
			const img = new window.Image();

			img.onload = checkComplete;
			img.onerror = checkComplete;
			img.src = getRibbonFramePath(i);
		}
	});
}

export interface PreloaderProps {
	children: React.ReactNode;
}

export default function Preloader({ children }: PreloaderProps) {
	const [isReady, setIsReady] = useState(false);
	const [progress, setProgress] = useState(0);

	const updateProgress = useCallback(
		(modelDone: boolean, ribbonLoaded: number, ribbonTotal: number) => {
			const modelWeight = 35;
			const ribbonWeight = 65;
			const ribbonProgress = ribbonTotal > 0 ? ribbonLoaded / ribbonTotal : 0;
			const total =
				(modelDone ? modelWeight : 0) + ribbonWeight * ribbonProgress;

			setProgress(Math.min(100, Math.round(total)));
		},
		[],
	);

	useEffect(() => {
		let ribbonLoaded = 0;
		let modelDone = false;

		const onRibbonProgress = (loaded: number, total: number) => {
			ribbonLoaded = loaded;
			updateProgress(modelDone, loaded, total);
		};

		Promise.all([
			loadGLBModel().then(() => {
				modelDone = true;
				updateProgress(true, ribbonLoaded, TOTAL_RIBBON_FRAMES);
			}),
			loadRibbonFrames(onRibbonProgress),
		])
			.then(() => {
				setProgress(100);
				// Brief moment to show 100% before transitioning
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setIsReady(true);
					});
				});
			})
			.catch(() => {
				setIsReady(true);
			});
	}, [updateProgress]);

	useScrollLock(!isReady);

	return (
		<>
			<motion.div
				animate={{
					opacity: isReady ? 0 : 1,
					pointerEvents: isReady ? 'none' : 'auto',
				}}
				className='fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 transition-opacity'
				initial={false}
				transition={{ duration: 0.6, ease: 'easeInOut' }}
			>
				<div className='relative p-4'>
					<Image
						priority
						alt='Preloader background'
						className='h-auto w-full max-w-[32.61625rem] object-contain'
						height={780}
						src='/images/preloader-seal.webp'
						width={521.86}
					/>
					<div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center sm:gap-y-6'>
						<div className='flex flex-col items-center gap-y-[0.6875rem] text-center sm:gap-y-[1.375rem]'>
							<span className='font-aphrodite-slim-contextual text-primary text-2xl leading-[63%] tracking-[-0.03em] md:text-[2.5rem]'>
								<TextReveal lines={["You're welcome"]} />
							</span>
							<span className='font-louize-display text-xl leading-[100%] tracking-[-0.03em] text-[#232323]'>
								<TextReveal maskLines delay={0.3} lines={['(#Morire26)']} />
							</span>
							<span className='font-louize-display text-xl leading-[100%] tracking-[-0.03em] text-[#232323]'>
								<TextReveal
									maskLines
									delay={0.5}
									lines={['(#TogetherInHalaalLove26)']}
								/>
							</span>
						</div>
						<div className='relative scale-50 max-[380px]:-my-5 sm:mt-12 sm:scale-100'>
							<Image
								priority
								alt='Wax Seal'
								className='object-contain'
								height={200}
								src='/images/wax-seal.webp'
								width={198}
							/>
							<div className='font-louize-display absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden px-1.5 text-[3.5rem] leading-[120%] text-white'>
								<PreloaderLetters />
							</div>
						</div>
						<div className='flex flex-col items-center gap-y-3'>
							<div className='text-base leading-[120%]'>
								<TextReveal
									delay={0.5}
									lines={['Loading experience, please wait']}
								/>
							</div>
							<span className='font-louize-display text-2xl leading-[100%]'>
								<TextReveal delay={0.7} lines={[`${String(progress)}%`]} />
							</span>
						</div>
					</div>
				</div>
			</motion.div>
			<PreloaderContext.Provider value={isReady}>
				<motion.div
					animate={{
						opacity: isReady ? 1 : 0,
						pointerEvents: isReady ? 'auto' : 'none',
					}}
					className={isReady ? '' : 'pointer-events-none'}
					initial={false}
					transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
				>
					{children}
				</motion.div>
			</PreloaderContext.Provider>
		</>
	);
}
