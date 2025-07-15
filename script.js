 // Custom Cursor
 const cursor = document.querySelector('.cursor');
 const cursorFollower = document.querySelector('.cursor-follower');

 document.addEventListener('mousemove', (e) => {
     cursor.style.left = e.clientX + 'px';
     cursor.style.top = e.clientY + 'px';
     
     setTimeout(() => {
         cursorFollower.style.left = e.clientX + 'px';
         cursorFollower.style.top = e.clientY + 'px';
     }, 100);
 });

 // Cursor hover effects
 document.querySelectorAll('a, button, .tech-card, .skill-card, .project-card').forEach(el => {
     el.addEventListener('mouseenter', () => {
         cursor.style.transform = 'scale(1.5)';
         cursorFollower.style.transform = 'scale(1.5)';
     });
     
     el.addEventListener('mouseleave', () => {
         cursor.style.transform = 'scale(1)';
         cursorFollower.style.transform = 'scale(1)';
     });
 });

 // Loading Screen
 window.addEventListener('load', () => {
     setTimeout(() => {
         document.getElementById('loadingScreen').classList.add('hidden');
     }, 3500);
 });

 // Mobile Menu
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
 const mobileMenu = document.getElementById('mobileMenu');

 mobileMenuBtn.addEventListener('click', () => {
     mobileMenu.classList.toggle('active');
 });

 // Close mobile menu when clicking on links
 document.querySelectorAll('.mobile-menu a').forEach(link => {
     link.addEventListener('click', () => {
         mobileMenu.classList.remove('active');
     });
 });

 // Navbar Scroll Effect
 window.addEventListener('scroll', () => {
     const navbar = document.getElementById('navbar');
     if (window.scrollY > 100) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 // Smooth Scrolling
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

 // Intersection Observer for animations
 const observerOptions = {
     threshold: 0.2,
     rootMargin: '0px 0px -100px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('animate');
         }
     });
 }, observerOptions);

 // Observe elements
 document.querySelectorAll('.section-title, .about-text, .about-visual, .skill-card, .project-card').forEach(el => {
     observer.observe(el);
 });

 // Staggered animations for cards
 document.querySelectorAll('.skill-card').forEach((card, index) => {
     card.style.transitionDelay = `${index * 0.2}s`;
 });

 document.querySelectorAll('.project-card').forEach((card, index) => {
     card.style.transitionDelay = `${index * 0.3}s`;
 });

 // Scroll Indicator
 const scrollDots = document.querySelectorAll('.scroll-dot');
 const sections = document.querySelectorAll('section');

 window.addEventListener('scroll', () => {
     let current = '';
     sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.clientHeight;
         if (window.pageYOffset >= sectionTop - 200) {
             current = section.getAttribute('id');
         }
     });

     scrollDots.forEach(dot => {
         dot.classList.remove('active');
         if (dot.getAttribute('data-section') === current) {
             dot.classList.add('active');
         }
     });
 });

 // Scroll dot click
 scrollDots.forEach(dot => {
     dot.addEventListener('click', () => {
         const section = document.getElementById(dot.getAttribute('data-section'));
         section.scrollIntoView({ behavior: 'smooth' });
     });
 });

 // Parallax effect for hero elements
 window.addEventListener('scroll', () => {
     const scrolled = window.pageYOffset;
     const parallaxElements = document.querySelectorAll('.floating-element');
     
     parallaxElements.forEach((element, index) => {
         const speed = 0.3 + (index * 0.1);
         element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
     });

     // Grid animation speed based on scroll
     const grid = document.querySelector('.hero-grid');
     if (grid) {
         grid.style.animationDuration = `${Math.max(5, 20 - (scrolled * 0.01))}s`;
     }
 });

 // Add click effects to interactive elements
 document.querySelectorAll('.tech-card, .skill-card, .project-card').forEach(card => {
     card.addEventListener('click', function() {
         this.style.transform = 'scale(0.95)';
         setTimeout(() => {
             this.style.transform = '';
         }, 150);
     });
 });

 // Stats counter animation
 const statsNumbers = document.querySelectorAll('.stat-number');
 const statsObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             const target = entry.target;
             const finalNumber = target.textContent;
             const isPercentage = finalNumber.includes('%');
             const number = parseInt(finalNumber);
             
             let current = 0;
             const increment = number / 50;
             const timer = setInterval(() => {
                 current += increment;
                 if (current >= number) {
                     current = number;
                     clearInterval(timer);
                 }
                 target.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
             }, 30);
         }
     });
 }, { threshold: 0.5 });

 statsNumbers.forEach(stat => {
     statsObserver.observe(stat);
 });

 // Hide cursor on mobile
 if (window.innerWidth <= 768) {
     document.body.style.cursor = 'auto';
     cursor.style.display = 'none';
     cursorFollower.style.display = 'none';
 }