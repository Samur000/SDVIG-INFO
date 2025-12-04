// =============================================
// СДВиГ Landing Page - JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
	initInstallTabs();
	initContactForm();
	initScrollAnimations();
	initMobileMenu();
	initHeaderScroll();
});

// =============================================
// Mobile Menu
// =============================================

function initMobileMenu() {
	const menuBtn = document.querySelector('.mobile-menu-btn');
	const mobileMenu = document.querySelector('.mobile-menu');
	const body = document.body;

	if (!menuBtn || !mobileMenu) return;

	// Create overlay
	const overlay = document.createElement('div');
	overlay.className = 'mobile-menu-overlay';
	document.body.appendChild(overlay);

	function openMenu() {
		menuBtn.classList.add('active');
		mobileMenu.classList.add('open');
		overlay.classList.add('visible');
		body.classList.add('menu-open');
	}

	function closeMenu() {
		menuBtn.classList.remove('active');
		mobileMenu.classList.remove('open');
		overlay.classList.remove('visible');
		body.classList.remove('menu-open');
	}

	// Toggle menu on button click
	menuBtn.addEventListener('click', () => {
		if (mobileMenu.classList.contains('open')) {
			closeMenu();
		} else {
			openMenu();
		}
	});

	// Close menu on link click
	mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
		link.addEventListener('click', closeMenu);
	});

	// Close menu on CTA click
	const cta = mobileMenu.querySelector('.mobile-menu-cta');
	if (cta) {
		cta.addEventListener('click', closeMenu);
	}

	// Close menu on overlay click
	overlay.addEventListener('click', closeMenu);

	// Close menu on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
			closeMenu();
		}
	});
}

// =============================================
// Header Scroll Effect
// =============================================

function initHeaderScroll() {
	const header = document.querySelector('.header');
	if (!header) return;

	let lastScroll = 0;
	const scrollThreshold = 10;

	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset;

		// Добавляем тень при скролле
		if (currentScroll > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}

		// Скрываем/показываем header при скролле
		if (currentScroll > lastScroll && currentScroll > 100) {
			// Скролл вниз - скрываем header
			header.classList.add('hidden');
		} else if (currentScroll < lastScroll - scrollThreshold) {
			// Скролл вверх - показываем header
			header.classList.remove('hidden');
		}

		lastScroll = currentScroll;
	});
}

// =============================================
// Install Tabs
// =============================================

function initInstallTabs() {
	const tabs = document.querySelectorAll('.install-tab');
	const panels = document.querySelectorAll('.install-panel');

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const targetId = tab.dataset.tab;

			// Update tabs
			tabs.forEach(t => t.classList.remove('active'));
			tab.classList.add('active');

			// Update panels
			panels.forEach(panel => {
				if (panel.id === targetId) {
					panel.classList.add('active');
				} else {
					panel.classList.remove('active');
				}
			});
		});
	});
}

// =============================================
// Contact Form
// =============================================

function initContactForm() {
	const form = document.getElementById('feedbackForm');

	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message')
		};

		// Simulate form submission
		const submitBtn = form.querySelector('button[type="submit"]');
		const originalText = submitBtn.innerHTML;

		submitBtn.innerHTML = 'Отправка...';
		submitBtn.disabled = true;

		// Simulate API call
		setTimeout(() => {
			submitBtn.innerHTML = '✓ Отправлено!';
			submitBtn.style.background = '#10B981';
			submitBtn.style.color = '#fff';

			// Reset form
			form.reset();

			// Reset button after delay
			setTimeout(() => {
				submitBtn.innerHTML = originalText;
				submitBtn.disabled = false;
				submitBtn.style.background = '';
				submitBtn.style.color = '';
			}, 3000);
		}, 1000);

		console.log('Form submitted:', data);
	});
}

// =============================================
// Scroll Animations
// =============================================

function initScrollAnimations() {
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-in');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Elements to animate
	const animateElements = document.querySelectorAll(
		'.feature-card, .section-block, .benefit-card, .install-step'
	);

	animateElements.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(20px)';
		el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
		observer.observe(el);
	});
}

// Add CSS for animated elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// =============================================
// Smooth Scroll for Navigation
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

