const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const icon = btn.querySelector('i');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        const mobileLinks = menu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                btn.setAttribute('aria-expanded', 'false');
            });
        });

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            
            const serviceDropdown = document.getElementById('serviceInterest');
            let service = "Not specified";
            if (serviceDropdown && serviceDropdown.selectedIndex > 0) {
                service = serviceDropdown.options[serviceDropdown.selectedIndex].text;
            }
            
            const message = document.getElementById('userMessage').value;
            
            const text = `Hello Falconix Digital,\n\nName: ${name}\nPhone: ${phone}\nService Interested In: ${service}\nMessage: ${message}`;
            const encodedText = encodeURIComponent(text);
            const targetPhone = "918637028337";
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            btn.classList.add('opacity-75', 'cursor-not-allowed');
            
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            if (isMobile) {
                const now = Date.now();
                setTimeout(() => {
                    if (Date.now() - now < 600) {
                        window.location.href = `sms:+${targetPhone}?body=${encodedText}`;
                    }
                }, 500);
                window.location.href = `whatsapp://send?phone=${targetPhone}&text=${encodedText}`;
            } else {
                window.open(`https://wa.me/${targetPhone}?text=${encodedText}`, '_blank');
            }
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Redirected!';
                btn.classList.remove('bg-gradient-brand', 'hover:bg-gradient-brand-hover');
                btn.classList.add('bg-green-600', 'hover:bg-green-700');
                this.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green-600', 'hover:bg-green-700', 'opacity-75', 'cursor-not-allowed');
                    btn.classList.add('bg-gradient-brand', 'hover:bg-gradient-brand-hover');
                }, 3000);
            }, 2000);
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const generalObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach((elem) => {
            generalObserver.observe(elem);
        });

        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 20) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });

        const viewAllDesktop = document.getElementById('viewAllDesktop');
        const viewAllMobile = document.getElementById('viewAllMobile');
        const hiddenPosts = document.querySelectorAll('.hidden-post');
        let postsExpanded = false;

        function togglePosts() {
            postsExpanded = !postsExpanded;
            hiddenPosts.forEach(post => {
                if (postsExpanded) {
                    post.classList.remove('hidden');
                } else {
                    post.classList.add('hidden');
                    post.classList.remove('visible');
                }
            });
            
            const btnText = postsExpanded 
                ? 'Show Less <i class="fas fa-arrow-up ml-1"></i>' 
                : 'View All Posts <i class="fas fa-arrow-down ml-1"></i>';
            
            if (viewAllDesktop) viewAllDesktop.innerHTML = btnText;
            if (viewAllMobile) viewAllMobile.innerHTML = btnText;
        }

        if (viewAllDesktop) viewAllDesktop.addEventListener('click', togglePosts);
        if (viewAllMobile) viewAllMobile.addEventListener('click', togglePosts);

        const readMoreBtns = document.querySelectorAll('.read-more-btn');
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const textContainer = this.parentElement.querySelector('.blog-text');
                
                if (textContainer.classList.contains('line-clamp-2')) {
                    textContainer.classList.remove('line-clamp-2');
                    this.innerHTML = 'Read Less <i class="fas fa-chevron-up ml-1 text-[10px]"></i>';
                } else {
                    textContainer.classList.add('line-clamp-2');
                    this.innerHTML = 'Read More <i class="fas fa-chevron-down ml-1 text-[10px]"></i>';
                }
            });
        });

        function initTechnicalBg() {
            const canvases = document.querySelectorAll('.particle-canvas');
            
            const techColors = ['#39FF14', '#D500F9', '#FF1744']; 
            
            let mouse = { x: null, y: null, radius: 150 };
            window.addEventListener('mousemove', (event) => {
                mouse.x = event.clientX;
                mouse.y = event.clientY;
            });
            window.addEventListener('mouseout', () => {
                mouse.x = null;
                mouse.y = null;
            });

            canvases.forEach(canvas => {
                const ctx = canvas.getContext('2d');
                let width, height, particles = [], binaries = [], animationFrameId;
                let isVisible = false;

                function resize() {
                    width = canvas.width = canvas.offsetWidth;
                    height = canvas.height = canvas.offsetHeight;
                    initParticlesArray();
                }

                function initParticlesArray() {
                    particles = [];
                    binaries = [];
                    
                    const isMobile = width < 768;
                    
                    const numParticles = Math.max(isMobile ? 40 : 50, Math.floor((width * height) / (isMobile ? 7000 : 12000))); 
                    const numBinaries = Math.max(isMobile ? 60 : 80, Math.floor((width * height) / (isMobile ? 4000 : 8000)));

                    for (let i = 0; i < numParticles; i++) {
                        particles.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            vx: (Math.random() - 0.5) * 1.0,
                            vy: (Math.random() - 0.5) * 1.0,
                            size: Math.random() * (isMobile ? 2.5 : 2) + 1,
                            color: techColors[Math.floor(Math.random() * techColors.length)]
                        });
                    }

                    for (let i = 0; i < numBinaries; i++) {
                        binaries.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            speed: Math.random() * 1.5 + 0.5,
                            value: Math.random() > 0.5 ? '1' : '0',
                            color: techColors[Math.floor(Math.random() * techColors.length)],
                            opacity: Math.random() * 0.5 + (isMobile ? 0.45 : 0.25),
                            fontSize: Math.floor(Math.random() * 10 + (isMobile ? 14 : 10))
                        });
                    }
                }

                function animate() {
                    if (!isVisible) return;
                    ctx.clearRect(0, 0, width, height);
                    
                    const rect = canvas.getBoundingClientRect();
                    const localMouseX = mouse.x !== null ? mouse.x - rect.left : null;
                    const localMouseY = mouse.y !== null ? mouse.y - rect.top : null;

                    ctx.font = "14px monospace";
                    ctx.textAlign = "center";
                    for (let i = 0; i < binaries.length; i++) {
                        let b = binaries[i];
                        
                        ctx.fillStyle = b.color;
                        ctx.globalAlpha = b.opacity;
                        ctx.font = `${b.fontSize}px monospace`;
                        ctx.fillText(b.value, b.x, b.y);
                        
                        b.y += b.speed;
                        
                        if (Math.random() < 0.02) {
                            b.value = b.value === '1' ? '0' : '1';
                        }
                        
                        if (b.y > height + 20) {
                            b.y = -20;
                            b.x = Math.random() * width;
                        }
                    }
                    ctx.globalAlpha = 1.0;

                    for(let i = 0; i < particles.length; i++) {
                        let p = particles[i];
                        p.x += p.vx;
                        p.y += p.vy;
                        
                        if (p.x < 0 || p.x > width) p.vx *= -1;
                        if (p.y < 0 || p.y > height) p.vy *= -1;
                        
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.fill();

                        if (localMouseX !== null && localMouseY !== null) {
                            let dxMouse = p.x - localMouseX;
                            let dyMouse = p.y - localMouseY;
                            let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                            
                            if (distMouse < mouse.radius) {
                                ctx.beginPath();
                                const opacity = 0.5 - (distMouse / mouse.radius) * 0.5;
                                ctx.strokeStyle = p.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
                                ctx.strokeStyle = `${p.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                                
                                ctx.lineWidth = 1;
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(localMouseX, localMouseY);
                                ctx.stroke();
                                
                                const forceDirectionX = dxMouse / distMouse;
                                const forceDirectionY = dyMouse / distMouse;
                                const force = (mouse.radius - distMouse) / mouse.radius;
                                
                                if (distMouse < 100) {
                                    p.x += forceDirectionX * force * 0.8;
                                    p.y += forceDirectionY * force * 0.8;
                                }
                            }
                        }

                        const isMobile = width < 768;
                        const connectionDistance = isMobile ? 150 : 120;

                        for(let j = i + 1; j < particles.length; j++) {
                            let p2 = particles[j];
                            let dx = p.x - p2.x;
                            let dy = p.y - p2.y;
                            let dist = Math.sqrt(dx*dx + dy*dy);
                            
                            if(dist < connectionDistance) {
                                ctx.beginPath();
                                const baseOpacity = isMobile ? 0.45 : 0.35;
                                const opacity = baseOpacity - (dist / (connectionDistance * 4));
                                ctx.strokeStyle = `${p.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                                ctx.lineWidth = isMobile ? 0.8 : 0.6;
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(p2.x, p2.y);
                                ctx.stroke();
                            }
                        }
                    }
                    animationFrameId = requestAnimationFrame(animate);
                }

                window.addEventListener('resize', resize);
                resize();
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            isVisible = true;
                            animate();
                        } else {
                            isVisible = false;
                            cancelAnimationFrame(animationFrameId);
                        }
                    });
                }, { threshold: 0 });
                
                observer.observe(canvas.parentElement);
            });
        }
        
        window.addEventListener('DOMContentLoaded', initTechnicalBg);
