import Footer from '@/components/common/footer';
import Nav from '@/components/common/nav';
import SmoothScroll from '@/components/common/smooth-scroll';
import HeroText from '@/components/features/animation/hero-text';
import LivestreamPlayer from '@/components/features/animation/livestream-player';
import ParallaxBg from '@/components/features/animation/parallax-bg';
import Wishes from '@/components/features/animation/wishes';
import Ring from '@/components/features/animation/ring';
import SaveTheDate from '@/components/features/animation/save-the-date';
import ScrollToExplore from '@/components/features/animation/scroll-to-explore';
import TextReveal from '@/components/features/animation/text-reveal';
import TyingRibbon from '@/components/features/animation/tying-ribbon';
import CountdownTimer from '@/components/features/homepage/countdown-timer';
import Polaroid from '@/components/features/homepage/polaroid';
import { Button } from '@/components/ui/button';

import Image from 'next/image';

export default function Home() {
	return (
		<SmoothScroll>
			<header>
				<Nav />
			</header>

			<main>
				<section className='relative flex flex-col gap-y-[6.26875rem]'>
					<div className='flex min-h-[calc(100dvh-5.5rem)] flex-col items-center justify-between pt-[3.8125rem] max-sm:pb-5'>
						<HeroText />
						<div className='flex w-full flex-row items-end justify-between p-5 max-sm:justify-center max-sm:py-0'>
							<ScrollToExplore />
							<div className='max-sm:hidden'>
								<LivestreamPlayer />
							</div>
						</div>
					</div>
					<div className='flex flex-col items-center gap-y-4 min-sm:hidden'>
						<div className='z-5'>
							<LivestreamPlayer />
						</div>
					</div>
					<Ring />
				</section>

				<section className='flex h-[30vh] flex-col items-center justify-center gap-y-8 text-center sm:h-screen sm:gap-y-16'>
					<h2 className='text-primary font-louize-display -mb-2 text-5xl leading-[100%] tracking-[-0.03em] sm:text-[6.25rem]'>
						<TextReveal maskLines lines={['Invitation']} />
					</h2>
					<div className='flex max-w-[53.1875rem] flex-col gap-y-10 sm:gap-y-12'>
						<div className='text-lg leading-[120%] tracking-[-0.02em] sm:text-[2.5rem]'>
							<TextReveal
								maskLines
								staggerCustomDelay
								className='hidden items-center lg:flex'
								delay={0.3}
								lines={[
									'With the blessing of Allah, you are cordially invited to the',
									'Aqd & Walimatu Nikkahh of',
									'Maryam (Adeyinka) & Taoheed (Adewale).',
								]}
								staggerLines={0.12}
							/>
							<TextReveal
								maskLines
								staggerCustomDelay
								className='items-center lg:hidden'
								delay={0.3}
								lines={[
									'With the blessing of Allah, you are',
									'cordially invited to the Aqd & Walimatu',
									'Maryam (Adeyinka) & Taoheed',
									'(Adewale).',
								]}
								staggerLines={0.12}
							/>
						</div>
						<span className='text-primary font-louize-display -mt-4 text-2xl leading-[130%] tracking-[-0.03em] md:text-[3rem]'>
							<TextReveal
								maskLines
								staggerCustomDelay
								className='items-center'
								delay={0.8}
								lines={['(#Morire26 #TogetherInHalaalLove26)']}
							/>
						</span>
					</div>
				</section>

				<TyingRibbon />

				<ParallaxBg>
					<Wishes />
				</ParallaxBg>

				<section
					className='flex flex-col items-center gap-y-[4.5625rem] py-[9.125rem] max-lg:pb-0'
					id='countdown'
				>
					<div className='flex flex-col gap-y-6 text-center'>
						<h3 className='text-primary font-louize-display -mb-2 text-5xl leading-[100%] tracking-[-0.03em] sm:text-[6.25rem]'>
							<TextReveal
								maskLines
								className='hidden lg:flex'
								lines={['Countdown To Forever']}
							/>
							<TextReveal
								maskLines
								className='flex items-center lg:hidden'
								lines={['Countdown', 'To Forever']}
							/>
						</h3>
						<div className='text-lg leading-[120%] tracking-[-0.02em]'>
							<TextReveal
								maskLines
								className='items-center'
								delay={0.3}
								lines={['The celebration begins in:']}
							/>
						</div>
					</div>
					<CountdownTimer />
				</section>

				<SaveTheDate />

				<section
					className='flex flex-col items-center gap-y-20 py-[9.875rem] max-lg:pb-0 lg:gap-y-[7.5rem]'
					id='event-details'
				>
					<h3 className='text-primary font-louize-display -mb-2 text-5xl leading-[100%] tracking-[-0.03em] md:text-[6.25rem]'>
						<TextReveal
							maskLines
							classNames={{ line: 'pr-1' }}
							lines={['Event Details']}
						/>
					</h3>
					<div className='relative'>
						<svg
							className='block lg:hidden'
							fill='none'
							height='730'
							viewBox='0 0 295 730'
							width='295'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M295 169.003C286.102 169.134 278.93 176.387 278.93 185.316C278.93 194.245 286.102 201.497 295 201.629L295 540.004C286.102 540.135 278.93 547.388 278.93 556.316C278.93 565.245 286.102 572.498 295 572.63L295 718.421C293.471 717.196 291.531 716.461 289.419 716.461C284.484 716.461 280.483 720.462 280.483 725.396C280.483 727.081 280.951 728.655 281.761 730L10.3789 730C11.1887 728.656 11.6542 727.08 11.6543 725.396C11.6543 720.462 7.65424 716.461 2.7197 716.461C1.77133 716.461 0.857543 716.61 -3.1336e-05 716.884L-2.50306e-05 572.633C9.01111 572.633 16.3163 565.328 16.3164 556.316C16.3164 547.305 9.01118 540 -2.36041e-05 540L-8.81365e-06 201.633C9.0111 201.633 16.3163 194.328 16.3164 185.316C16.3164 176.305 9.01116 169 -7.38722e-06 169L-5.92836e-07 13.5625C0.857574 13.8362 1.77136 13.9853 2.71973 13.9853C7.65427 13.9851 11.6543 9.98438 11.6543 5.04979C11.6542 3.17568 11.0769 1.43658 10.0908 -1.24538e-05L282.049 -5.66115e-07C281.062 1.43672 280.483 3.1754 280.483 5.0498C280.483 9.98451 284.484 13.9854 289.419 13.9854C291.531 13.9853 293.471 13.2507 295 12.0254L295 169.003Z'
								fill='#C8A2C8'
							/>
							<line
								stroke='#F5F1E6'
								strokeDasharray='6.22 6.22'
								strokeWidth='1.55393'
								x1='278.93'
								x2='16.3162'
								y1='557.093'
								y2='557.093'
							/>
							<line
								stroke='#F5F1E6'
								strokeDasharray='6.22 6.22'
								strokeWidth='1.55393'
								x1='278.93'
								x2='16.3162'
								y1='185.777'
								y2='185.777'
							/>
						</svg>
						<svg
							className='hidden lg:block'
							fill='none'
							height='380'
							viewBox='0 0 955 380'
							width='955'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M128 0C128 11.598 137.402 21 149 21C160.598 21 170 11.598 170 0H785C785 11.598 794.402 21 806 21C817.598 21 827 11.598 827 0H937.786C936.051 2.01384 935 4.6334 935 7.5C935 13.8513 940.149 19 946.5 19C949.868 19 952.897 17.552 955 15.2451V368.754C952.897 366.447 949.867 365 946.5 365C940.149 365 935 370.149 935 376.5C935 377.721 935.192 378.896 935.544 380H827C827 368.402 817.598 359 806 359C794.402 359 785 368.402 785 380H170C170 368.402 160.598 359 149 359C137.402 359 128 368.402 128 380H17.4561C17.8084 378.896 18 377.721 18 376.5C18 370.149 12.8513 365 6.5 365C4.08744 365 1.84924 365.744 0 367.014V16.9854C1.84933 18.2551 4.08724 19 6.5 19C12.8513 19 18 13.8513 18 7.5C18 4.6334 16.9487 2.01384 15.2139 0H128Z'
								fill='#C8A2C8'
							/>
							<line
								stroke='#F5F1E6'
								strokeDasharray='8 8'
								strokeWidth='2'
								x1='807'
								x2='807'
								y1='21'
								y2='359'
							/>
							<line
								stroke='#F5F1E6'
								strokeDasharray='8 8'
								strokeWidth='2'
								x1='150'
								x2='150'
								y1='21'
								y2='359'
							/>
						</svg>
						<div className='text-primary-foreground absolute top-1/2 left-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center lg:flex-row'>
							<div className='flex max-h-[11.5rem] max-w-[9.4rem] flex-1 flex-col items-center justify-center gap-y-5'>
								<span className='text-lg leading-[100%] font-medium lg:text-2xl'>
									Date
								</span>
								<span className='font-louize-display text-[4.5rem] leading-[73%] tracking-[-0.03em] lg:text-[6.25rem]'>
									30
								</span>
								<span className='text-lg leading-[100%] font-medium lg:text-2xl'>
									Sat, May
								</span>
							</div>
							<div className='flex flex-1 flex-col items-center gap-y-[0.875rem] max-lg:justify-center'>
								<span className='text-lg leading-[100%] tracking-[-0.02em] lg:text-2xl'>
									Venue
								</span>
								<span className='max-w-[14.8125rem] text-center text-2xl leading-[110%] tracking-[-0.02em] lg:max-w-[33.25rem] lg:text-[2.75rem]'>
									Most High College, Lagos - Abeokuta Express Road behind First
									Bank via Abule Taylor.
								</span>
							</div>
							<div className='flex max-h-[11.5rem] max-w-[9.4rem] flex-1 flex-col items-center justify-center gap-y-5'>
								<span className='text-lg leading-[100%] font-medium lg:text-2xl'>
									Time
								</span>
								<span className='font-louize-display text-[4.5rem] leading-[73%] tracking-[-0.03em] lg:text-[6.25rem]'>
									11
								</span>
							</div>
						</div>
					</div>
				</section>

				<section className='flex flex-col items-center gap-y-12 py-[9.875rem] lg:gap-y-[7.5rem]'>
					<h3 className='text-primary font-louize-display -mb-2 text-5xl leading-[100%] tracking-[-0.03em] md:text-[6.25rem]'>
						<TextReveal
							maskLines
							classNames={{ line: 'pr-1' }}
							lines={['Get Directions']}
						/>
					</h3>
					<div className='relative h-[34.25rem] w-full max-w-[57.625rem] max-md:px-4'>
						<div className='relative size-full overflow-hidden rounded-2xl'>
							<Image
								fill
								alt='Map'
								className='object-cover'
								src='/images/map.png'
							/>
						</div>
						<div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-6'>
							<Polaroid
								caption='Venue'
								classNames={{
									base: ' p-[0.286875rem] pb-[2.329375rem] relative',
									image: 'w-[9.125rem] h-[6.80125rem]',
								}}
								image='/images/venue.png'
							/>
							<Button asChild>
								<a
									href='https://maps.app.goo.gl/juGuZPwcREDgcant6'
									target='_blank'
								>
									Click here to get directions
								</a>
							</Button>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</SmoothScroll>
	);
}
