'use client';

import React, { useMemo, useRef } from 'react';

import useTailwindBreakpoints from '@/hooks/use-tailwind-breakpoints';

import { EngagementRing } from '@/components/features/models/engagement-ring';

import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MotionValue, useScroll, useTransform } from 'framer-motion';
import * as motion from 'motion/react-client';
import Image from 'next/image';

function CameraController({
	cameraPositionY,
	cameraPositionZ,
}: {
	cameraPositionY: MotionValue<number>;
	cameraPositionZ: MotionValue<number>;
}) {
	const { camera } = useThree();

	useFrame(() => {
		camera.position.y = cameraPositionY.get();
		camera.position.z = cameraPositionZ.get();
	});

	return null;
}

export default function Ring() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start 50%', 'end 50%'],
	});

	const { width } = useTailwindBreakpoints();

	const cameraPositions = useMemo(() => {
		if (width < 768) {
			return {
				y: [-6, -1.8, -1.8],
				z: [15, 10, -5],
			};
		}

		if (width < 1024) {
			return {
				y: [-2, -1.8, -1.8],
				z: [15, 10, -5],
			};
		}

		return {
			y: [-2.5, -1.8, -1.8],
			z: [7, 7, -3],
		};
	}, [width]);

	const rotationYValues = useMemo(() => {
		if (width < 768) {
			return [0, Math.PI];
		}

		if (width < 1024) {
			return [0, Math.PI];
		}

		return [0, Math.PI];
	}, [width]);

	const cameraPositionY = useTransform(
		scrollYProgress,
		[0, 0.2, 1],
		cameraPositions.y,
	);

	const cameraPositionZ = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		cameraPositions.z,
	);

	const rotationY = useTransform(scrollYProgress, [0, 0.5], rotationYValues);

	const verseTranslateY = useTransform(
		scrollYProgress,
		[0, 0.35, 0.9],
		['20%', '20%', '0%'],
	);
	const verseScale = useTransform(scrollYProgress, [0, 0.66, 0.8], [0, 0.8, 1]);

	return (
		<div
			ref={ref}
			className='pointer-events-none relative isolate -mt-[110vh] h-[300vh] w-full touch-none sm:-mt-[70vh] md:-mt-[50vh] lg:-mt-[30vh]'
		>
			<div className='pointer-events-none sticky top-0 left-0 z-10 h-screen w-full touch-none'>
				<Canvas
					resize={{ scroll: false }}
					style={{ pointerEvents: 'none', touchAction: 'none' }}
				>
					<Environment files='/models/studio_small_03_1k.hdr' />
					<PerspectiveCamera makeDefault position={[0, 0, 0]} />
					<CameraController
						cameraPositionY={cameraPositionY}
						cameraPositionZ={cameraPositionZ}
					/>
					<Float
						floatIntensity={2} // Up/down float intensity (default: 1)
						floatingRange={[-0.1, 0.1]} // Range of Y-axis movement (default: [-0.1, 0.1])
						rotationIntensity={1} // XYZ rotation intensity (default: 1)
						speed={5} // Animation speed (default: 1)
					>
						<EngagementRing rotationY={rotationY} />
					</Float>
				</Canvas>
			</div>
			<div className='sticky top-0 left-0 flex h-screen w-full items-center justify-center'>
				<motion.div
					className='relative'
					style={{
						translateY: verseTranslateY,
						scale: verseScale,
					}}
				>
					<Image
						alt='Green heart'
						height={590.23}
						sizes='100vw'
						src='/images/lilac-heart.webp'
						width={590.23}
					/>
					<p className='text-primary-foreground absolute top-1/2 left-1/2 w-full max-w-[21.375rem] -translate-x-1/2 -translate-y-1/2 text-center text-sm leading-[120%] tracking-[-0.02em] max-md:max-w-[12.5rem] md:text-2xl'>
						"Marriage is part of my sunnah, and whoever does not follow my
						sunnah has nothing to do with me" <br /> -[HADITH SAHIH]
					</p>
				</motion.div>
			</div>
		</div>
	);
}
