import React from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

// May 2026: 1st is Friday → offset 4 (Mon=0, Tue=1, Wed=2, Thu=3, Fri=4)
const MAY_2026_START_OFFSET = 4;
const MAY_DAYS = 31;
const HIGHLIGHTED_DATE = 30; // you can change this if needed

function buildCalendarGrid(): (number | null)[] {
	const grid: (number | null)[] = [];

	// Empty cells before 1st
	for (let i = 0; i < MAY_2026_START_OFFSET; i++) {
		grid.push(null);
	}

	// Dates 1–31
	for (let d = 1; d <= MAY_DAYS; d++) {
		grid.push(d);
	}

	return grid;
}

export default function Calendar() {
	const grid = buildCalendarGrid();

	return (
		<div className='flex w-full max-w-[43.6875rem] flex-col gap-4 rounded-lg px-6 py-5'>
			{/* Day headers */}
			<div className='grid grid-cols-7 gap-7 md:gap-[3.5rem]'>
				{DAYS.map((day) => (
					<div
						key={day}
						className='text-primary text-center text-lg leading-[4.5625rem] font-medium md:text-[2rem]'
					>
						{day}
					</div>
				))}
			</div>

			{/* Separator line */}
			<div className='bg-primary h-px w-full' />

			{/* Dates grid */}
			<div className='grid grid-cols-7 gap-x-7 gap-y-5 md:gap-x-[3.5rem] md:gap-y-[2.5rem]'>
				{grid.map((date, i) => {
					if (date === null) {
						return <div key={`empty-${String(i)}`} />;
					}

					if (date === HIGHLIGHTED_DATE) {
						return (
							<div
								key={date}
								className='relative flex aspect-square items-center justify-center'
							>
								<svg
									className='text-primary absolute top-1/2 left-1/2 size-12 shrink-0 -translate-x-1/2 -translate-y-1/2 md:size-[6.25rem]'
									preserveAspectRatio='xMidYMid meet'
									viewBox='0 0 100 100'
								>
									<path
										d='M50 87.5C48.7455 87.4984 47.5205 87.1193 46.4843 86.4121C31.1347 75.9922 24.4883 68.8477 20.8222 64.3809C13.0097 54.8594 9.2695 45.084 9.37497 34.498C9.49802 22.3672 19.2304 12.5 31.0703 12.5C39.6797 12.5 45.6426 17.3496 49.1152 21.3887C49.2252 21.5153 49.3611 21.6169 49.5138 21.6865C49.6664 21.7561 49.8322 21.7921 50 21.7921C50.1677 21.7921 50.3335 21.7561 50.4862 21.6865C50.6388 21.6169 50.7747 21.5153 50.8847 21.3887C54.3574 17.3457 60.3203 12.5 68.9297 12.5C80.7695 12.5 90.5019 22.3672 90.625 34.5C90.7304 45.0879 86.9863 54.8633 79.1777 64.3828C75.5117 68.8496 68.8652 75.9941 53.5156 86.4141C52.4792 87.1206 51.2543 87.499 50 87.5Z'
										fill='currentColor'
									/>
								</svg>
								<span className='text-primary-foreground absolute inset-0 flex items-center justify-center text-sm leading-[73%] md:text-[1.875rem]'>
									{date}
								</span>
							</div>
						);
					}

					return (
						<div
							key={date}
							className='text-foreground flex aspect-square items-center justify-center text-sm leading-[73%] md:text-[1.875rem]'
						>
							{date}
						</div>
					);
				})}
			</div>
		</div>
	);
}
