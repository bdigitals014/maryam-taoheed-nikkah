import '@/styles/globals.css';
import Providers from '@/app/providers';
import { cn } from '@/lib/utils';

import Preloader from '@/components/common/preloader';
import TailwindBreakpointIndicator from '@/components/common/tailwind-breakpoint-indicator';
import { Toaster } from '@/components/ui/sonner';

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

// PP Neue Montreal
const fontSans = localFont({
	src: [
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-Thin.woff2',
			weight: '200',
			style: 'normal',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-Book.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-Regular.woff2',
			weight: '450',
			style: 'normal',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-Medium.woff2',
			weight: '530',
			style: 'normal',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-SemiBold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-Bold.woff2',
			weight: '800',
			style: 'normal',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-ThinItalic.woff2',
			weight: '200',
			style: 'italic',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-LightItalic.woff2',
			weight: '300',
			style: 'italic',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-BookItalic.woff2',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-Italic.woff2',
			weight: '450',
			style: 'italic',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-MediumItalic.woff2',
			weight: '530',
			style: 'italic',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-SemiBoldItalic.woff2',
			weight: '700',
			style: 'italic',
		},
		{
			path: '../../public/fonts/pp-neue-montreal/PPNeueMontreal-BoldItalic.woff2',
			weight: '800',
			style: 'italic',
		},
	],
	variable: '--font-sans',
});

// Aphrodite Slim Contextual
const fontAphroditeSlimContextual = localFont({
	src: [
		{
			path: '../../public/fonts/aphrodite-slim-contextual/Aphrodite Slim Contextual.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-aphrodite-slim-contextual',
});

// Arabic Typesetting
const fontArabicTypesetting = localFont({
	src: [
		{
			path: '../../public/fonts/arabic-typesetting/Arabic Typesetting Regular.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-arabic-typesetting',
});

// Louize Display
const fontLouizeDisplay = localFont({
	src: [
		{
			path: '../../public/fonts/louize-display/Louize Display.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-louize-display',
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#C8A2C8' },
		{ media: '(prefers-color-scheme: dark)', color: '#C8A2C8' },
	],
};

const appUrl =
	process.env.NEXT_PUBLIC_APP_URL ??
	'https://maryam-taoheed.sitesbybraitdigitals.name.ng';

export const metadata: Metadata = {
	metadataBase: new URL(appUrl),
	title: {
		default: 'Maryam & Taoheed Aqh & Waleematun Nikkah Invitation',
		template: '%s | Maryam & Taoheed Aqh & Waleematun Nikkah Invitation',
	},
	description:
		'Join us in celebrating the Aqh & Waleematun Nikkah of Maryam and Taoheed. Saturday, 30 May 2026.',
	keywords: ['nikkah', 'Maryam', 'Taoheed', 'M&T', 'invitation'],
	authors: [{ name: 'Maryam & Taoheed' }],
	creator: 'Maryam & Taoheed',
	openGraph: {
		type: 'website',
		locale: 'en',
		url: '/',
		siteName: 'Maryam & Taoheed',
		title: 'Maryam & Taoheed',
		description:
			'Join us in celebrating the Aqh & Waleematun Nikkah of Maryam and Taoheed. Saturday, 30 May 2026.',
		images: [
			{
				url: '/images/Maryam-and-Taoheed.png',
				width: 1200,
				height: 630,
				alt: 'Maryam and Taoheed',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Maryam & Taoheed',
		description:
			'Join us in celebrating theAqh & Waleematun Nikkah of Maryam and Taoheed. Saturday, 30 May 2026.',
		images: ['/images/Maryam-and-Taoheed.png'],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang='en'>
			<body
				suppressHydrationWarning
				className={cn(
					'bg-primary-foreground min-h-screen overflow-x-hidden font-sans antialiased',
					fontSans.variable,
					fontAphroditeSlimContextual.variable,
					fontArabicTypesetting.variable,
					fontLouizeDisplay.variable,
				)}
			>
				<div className='bg-page-pattern bg-primary-foreground fixed inset-0 -z-10 size-full bg-cover bg-fixed bg-top bg-no-repeat opacity-90' />
				<TailwindBreakpointIndicator />
				<Providers>
					<Preloader>{children}</Preloader>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
