'use client';
import { useEffect, useRef } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion, animate, stagger } from 'motion/react';
import { splitText } from 'motion-plus';
import { FrameIcon } from 'lucide-react';

const essentialLinks = [
	{ title: 'Features', href: '/features' },
	{ title: 'Dashboard', href: '/dashboard' },
	{ title: 'Get Started', href: '/signin' },
];

// Remove social links for now since they don't go anywhere
const socialLinks: any[] = [];

function SplitTextBrand() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.fonts.ready.then(() => {
			if (!containerRef.current) return;

			containerRef.current.style.visibility = "visible";

			const h3Element = containerRef.current.querySelector("h3");
			if (!h3Element) return;

			const { words } = splitText(h3Element);

			animate(
				words,
				{ opacity: [0, 1], y: [10, 0] },
				{
					type: "spring",
					duration: 2,
					bounce: 0,
					delay: stagger(0.05),
				}
			);
		});
	}, []);

	return (
		<>
			<div ref={containerRef} style={{ visibility: 'hidden' }}>
				<h3 className="text-2xl font-semibold tracking-tighter text-black dark:text-white">
					Flash<span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">cast</span>
				</h3>
			</div>
			<style>{`
				.split-word {
					will-change: transform, opacity;
				}
			`}</style>
		</>
	);
}

export function Footer() {
	return (
		<footer className="relative w-full flex flex-col items-center justify-center bg-gradient-to-t from-muted/30 to-background border-t border-border px-6 py-12 lg:py-16">
			<div className="bg-gradient-to-r from-green-400 to-yellow-400 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full" />

			<div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-16">
				<AnimatedContainer className="space-y-4 text-left">
					<div className="flex items-center gap-3">
						<FrameIcon className="size-8 text-black dark:text-white" />
						<SplitTextBrand />
					</div>
					<p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
						Revolutionizing learning with voice-controlled flashcards. Make studying interactive, efficient, and fun.
					</p>
					<p className="text-muted-foreground text-sm">
						© {new Date().getFullYear()} Flashcast. All rights reserved.
					</p>
				</AnimatedContainer>

				<AnimatedContainer delay={0.2} className="flex items-start justify-center lg:justify-start">
					<div className="flex flex-wrap gap-x-8 gap-y-4">
						{essentialLinks.map((link) => (
							<a
								key={link.title}
								href={link.href}
								className="text-muted-foreground hover:text-black dark:hover:text-white transition-all duration-300 text-sm hover:translate-x-1"
							>
								{link.title}
							</a>
						))}
					</div>
				</AnimatedContainer>
			</div>

			<div className="w-full max-w-6xl mt-8 pt-6 border-t border-border/50">
				<AnimatedContainer delay={0.3}>
					<div className="flex flex-col items-center gap-4">
						<div className="flex gap-4">
							{socialLinks.map((social) => (
								<a
									key={social.title}
									href={social.href}
									className="text-muted-foreground hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
									aria-label={social.title}
								>
									<social.icon className="size-5" />
								</a>
							))}
						</div>
						<p className="text-muted-foreground text-sm">
							Made with ❤️ for better learning experiences
						</p>
					</div>
				</AnimatedContainer>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', y: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
} 