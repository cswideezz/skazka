// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Фильтрация направлений
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');

    if (filterButtons.length > 0 && destinationCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                destinationCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.6s ease-in';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});

// Форма обратной связи
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Валидация
            if (validateForm(formData)) {
                // Здесь обычно отправка данных на сервер
                showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                contactForm.reset();
            }
        });
    }
});

// Валидация формы
function validateForm(formData) {
    if (formData.name.trim() === '') {
        showNotification('Пожалуйста, введите ваше имя', 'error');
        return false;
    }
    
    if (formData.email.trim() === '') {
        showNotification('Пожалуйста, введите ваш email', 'error');
        return false;
    }
    
    if (!isValidEmail(formData.email)) {
        showNotification('Пожалуйста, введите корректный email', 'error');
        return false;
    }
    
    if (formData.subject.trim() === '') {
        showNotification('Пожалуйста, введите тему сообщения', 'error');
        return false;
    }
    
    if (formData.message.trim() === '') {
        showNotification('Пожалуйста, введите ваше сообщение', 'error');
        return false;
    }
    
    return true;
}

// Проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Уведомления
function showNotification(message, type) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'success') {
        notification.style.background = '#2ecc71';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Анимации для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Форма подписки на рассылку
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                showNotification('Пожалуйста, введите ваш email', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Здесь обычно отправка на сервер
            showNotification('Спасибо за подписку!', 'success');
            emailInput.value = '';
        });
    }
});

// Плавная прокрутка для якорных ссылок
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Учитываем высоту навигации
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .destination-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Запуск анимации при загрузке и скролле
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Обработка кнопок "Подробнее" на карточках направлений
document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.btn-small');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.destination-card');
            const destinationName = card.querySelector('h3').textContent;
            
            // Здесь можно реализовать модальное окно или переход на страницу с деталями
            showNotification(`Подробная информация о ${destinationName} скоро будет доступна!`, 'success');
        });
    });
});

// Изменение стиля навигации при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('TravelWorld website loaded successfully!');
    
    // Добавляем класс для плавного появления контента
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
// ... (предыдущий код)

// Логика для FAQ (Аккордеон)
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Закрываем другие открытые элементы (опционально)
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) otherItem.classList.remove('active');
                // });

                item.classList.toggle('active');
                
                const toggle = item.querySelector('.faq-toggle');
                if (item.classList.contains('active')) {
                    toggle.textContent = '-';
                } else {
                    toggle.textContent = '+';
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Открытие/Закрытие меню
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Блокируем прокрутку сайта, когда открыто меню
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Закрываем меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (hamburger && navMenu) {
        // Клик по бургеру
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие событий, иногда помогает
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Блокируем скролл страницы
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'visible';
            }
        });

        // Закрытие при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'visible';
            });
        });

        // Закрытие при клике ВНЕ меню (мелочь, но приятно)
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'visible';
            }
        });
    } else {
        console.error("Ошибка: Элементы меню не найдены. Проверьте классы .hamburger и .nav-menu в HTML");
    }
});