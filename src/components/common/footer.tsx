import React from 'react';

import Image from 'next/image';

function ContactBlock({
	label,
	number,
	subLabel,
}: {
	label: string;
	number: string;
	subLabel?: string;
}) {
	return (
		<div className='flex flex-col items-center gap-2'>
			<span className='text-center text-sm leading-[1.2] text-[#232323] md:text-base'>
				{label}
			</span>
			<a
				className='font-louize-display text-center text-2xl leading-[1.2] tracking-[-0.02em] text-[#232323] hover:underline'
				href={`tel:${number.replace(/\s/g, '')}`}
			>
				{number}
			</a>
			{subLabel && (
				<span className='tex-sm text-center leading-[1.2] text-[#232323] md:text-base'>
					{subLabel}
				</span>
			)}
		</div>
	);
}

function ColorCode({
	colorlabel,
	display1,
	colorvalue1,
	display2,
	colorvalue2,
}: {
	colorlabel: string;
	display1: string;
	colorvalue1: string;
	display2?: string;
	colorvalue2?: string;
}) {
	return (
		<div className='flex flex-col items-center gap-2'>
			<span className='text-sm text-[#232323] md:text-base'>{colorlabel}</span>

			<div className='flex overflow-hidden rounded-md border border-[#ddd]'>
				<div
					className='flex h-14 w-28 items-center justify-center'
					style={{
						backgroundColor: colorvalue1,
						color: colorvalue2 ?? '#000',
					}}
				>
					<span className='text-xs font-medium uppercase'>{display1}</span>
				</div>

				{colorvalue2 && display2 && (
					<div
						className='flex h-14 w-28 items-center justify-center'
						style={{
							backgroundColor: colorvalue2,
							color: colorvalue1, // 👈 swapped
						}}
					>
						<span className='text-xs font-medium uppercase'>{display2}</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default function Footer() {
	return (
		<footer className='bg-primary relative min-h-[200vh] w-full'>
			{/* Background image */}
			<div className='sticky top-0 h-screen w-full'>
				<Image
					aria-hidden
					fill
					alt=''
					className='object-cover'
					priority={false}
					src='/images/footer-bg.webp'
				/>
			</div>

			<div className='flex min-h-screen w-full items-center justify-center'>
				{/* Cream content card */}
				<div className='relative mx-4 my-4 flex w-full max-w-[32rem] flex-col items-center gap-y-[3.75rem] overflow-visible bg-[#F5F1E6] px-6 py-10 min-[380px]:pt-[3.5rem] min-[380px]:pb-[3.875rem]'>
					<div className='flex flex-col items-center gap-[5.5625rem]'>
						{/* RSVP */}
						<div className='flex flex-col items-center gap-8' id='rsvp'>
							<h3 className='text-primary font-louize-display text-center text-[2.5rem] leading-[0.73em] tracking-[-0.03em] md:text-[3.125rem]'>
								RSVP
							</h3>
							<div className='flex flex-row flex-wrap justify-center gap-10'>
								<ContactBlock
									label="Bride's Family"
									number='08142570256'
									subLabel='Abdul Rosheed'
								/>
								<ContactBlock
									label="Groom's Family"
									number='08167443464'
									subLabel='Hadj'
								/>
							</div>
							<div className='flex flex-row flex-wrap justify-center gap-10'>
								<ContactBlock label='' number='08056604078' subLabel='Zaynab' />
								<ContactBlock
									label=''
									number='08065463837'
									subLabel='Rokibah'
								/>
							</div>
						</div>
						<div className='flex flex-col items-center gap-8' id='rsvp'>
							<h3 className='text-primary font-louize-display text-center text-[2.5rem] leading-[0.73em] tracking-[-0.03em] md:text-[3.125rem]'>
								Colour Code
							</h3>
							<div className='flex flex-row flex-wrap justify-center gap-10'>
								<ColorCode
									colorlabel='Bride'
									colorvalue1='#C8A2C8'
									colorvalue2='#FFFFFF'
									display1='Lilac'
									display2='White'
								/>
								<ColorCode
									colorlabel='Groom'
									colorvalue1='#FFFFFF'
									colorvalue2='#800080'
									display1='White'
									display2='Purple'
								/>
							</div>
						</div>
					</div>
					<Image
						alt='RSVP'
						className='object-cover'
						height={295}
						src='/images/rsvp-img.webp'
						width={228}
					/>
					{/* Closing message */}
					<div className='flex flex-col items-center gap-y-[2.4375rem]'>
						<p className='max-w-[19rem] text-center text-sm leading-[1.1] text-[#232323] md:text-base'>
							Your presence will not only honor us but also add warmth and
							beauty to our celebration.
						</p>
						<p className='text-primary font-aphrodite-slim-contextual text-center text-[1.75rem] leading-[0.73em] tracking-[-0.02em] md:text-[2.5rem]'>
							Jazakumullah Khairan
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
