'use client';

import { useEffect, useState } from 'react';

import { db } from '@/lib/firebase';

import { addDoc, collection, getDocs } from 'firebase/firestore';

type Wish = {
	id?: string;
	name: string;
	message: string;
};

function MarqueeRow({
	wishes,
	reverse = false,
}: {
	wishes: Wish[];
	reverse?: boolean;
}) {
	// Need at least a few cards to look good — pad if too few
	const items = wishes.length < 3 ? [...wishes, ...wishes, ...wishes] : wishes;

	return (
		<div className='w-full overflow-hidden'>
			<div
				className={`flex w-max gap-4 ${
					reverse ? 'animate-marquee-reverse' : 'animate-marquee'
				}`}
			>
				{/* Triple duplicate for seamless loop with no gaps */}
				{[...items, ...items, ...items].map((wish, index) => (
					<Card key={index} wish={wish} />
				))}
			</div>
		</div>
	);
}

export default function Wishes() {
	const [wishes, setWishes] = useState<Wish[]>([]);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');

	const fetchWishes = async () => {
		const snapshot = await getDocs(collection(db, 'wishes'));
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<Wish, 'id'>),
		}));

		setWishes(data.reverse());
	};

	useEffect(() => {
		void fetchWishes();
	}, []);

	const handleSubmit = async () => {
		if (!name || !message) return;
		await addDoc(collection(db, 'wishes'), {
			name,
			message,
			createdAt: new Date(),
		});
		setName('');
		setMessage('');
		setOpen(false);
		void fetchWishes();
	};

	const row1 = wishes.filter((_, i) => i % 2 === 0);
	const row2 = wishes.filter((_, i) => i % 2 !== 0);

	return (
		<section className='py-12 text-center text-white'>
			<h2 className='mb-10 text-3xl font-semibold'>Well Wishes & Duas</h2>

			{/* MOBILE: Two rows moving in opposite directions */}
			<div className='block space-y-6 lg:hidden'>
				<MarqueeRow wishes={row1} />
				<MarqueeRow reverse wishes={row2} />
			</div>

			{/* DESKTOP: Grid */}
			<div className='mb-10 hidden grid-cols-3 gap-6 lg:grid'>
				{wishes.map((wish) => (
					<Card key={wish.id} wish={wish} />
				))}
			</div>

			<button
				className='mt-10 cursor-pointer rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200'
				onClick={() => {
					setOpen(true);
				}}
			>
				Say Wishes / Duas
			</button>

			{open && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4'>
					<div className='w-full max-w-md rounded-xl bg-white p-6 text-left'>
						<h3 className='mb-4 text-xl font-semibold text-black'>
							Send your wishes
						</h3>
						<input
							className='mb-3 w-full rounded border p-2 text-black'
							placeholder='Your Name'
							type='text'
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<textarea
							className='mb-3 w-full rounded border p-2 text-black'
							placeholder='Your Wishes / Dua'
							value={message}
							onChange={(e) => {
								setMessage(e.target.value);
							}}
						/>
						<div className='mt-4 flex justify-between'>
							<button
								className='cursor-pointer text-gray-500'
								onClick={() => {
									setOpen(false);
								}}
							>
								Cancel
							</button>
							<button
								className='cursor-pointer rounded bg-black px-4 py-2 text-white'
								onClick={() => {
									void handleSubmit();
								}}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

function Card({ wish }: { wish: Wish }) {
	return (
		<div className='group relative flex h-[300px] w-[300px] flex-shrink-0 flex-col items-center justify-center overflow-hidden p-8 text-center'>
			<div className='absolute inset-4 z-0 rounded-lg border border-white/20 bg-white/10 shadow-xl backdrop-blur-md' />
			<div
				className='pointer-events-none absolute inset-0 z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-100'
				style={{
					backgroundImage: "url('/images/wish-card.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<div className='relative z-20 px-4'>
				<p className='mb-3 text-sm font-bold tracking-widest text-white uppercase'>
					{wish.name}
				</p>
				<div className='mx-auto mb-4 h-[1px] w-8 bg-white/40' />
				<p className='text-sm leading-relaxed font-light text-white/90 italic md:text-base'>
					"{wish.message}"
				</p>
			</div>
		</div>
	);
}
