// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'visible';
            }
        });

        // Закрытие меню при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'visible';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'visible';
            }
        });
    }

    // Фильтрация направлений
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

    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все элементы
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    if (otherToggle) otherToggle.textContent = '+';
                });

                // Если элемент не был активен, открываем его
                if (!isActive) {
                    item.classList.add('active');
                    const toggle = item.querySelector('.faq-toggle');
                    if (toggle) toggle.textContent = '-';
                }
            });
        });
    }

    // Форма обратной связи
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            if (validateForm(formData)) {
                showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                contactForm.reset();
            }
        });
    }

    // Форма подписки на рассылку
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
            
            showNotification('Спасибо за подписку!', 'success');
            emailInput.value = '';
        });
    }

    // Кнопки бронирования
    const bookButtons = document.querySelectorAll('.destination-card .btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.destination-card');
            const destinationName = card.querySelector('h3').textContent;
            showNotification(`Экскурсия "${destinationName}" добавлена в корзину!`, 'success');
        });
    });

    // Плавная прокрутка для якорных ссылок
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .destination-card, .stat-item, .review-card');
        
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

    // Изменение стиля навигации при скролле
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Плавное появление контента при загрузке
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
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
    // Удаляем существующие уведомления
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

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
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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

// Добавляем стили для анимаций уведомлений
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


// Система корзины
class CartSystem {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('skazka_cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
        this.loadCartPage();
        this.loadCheckoutPage();
    }

    // Добавление тура в корзину
    addToCart(tour) {
        const existingItem = this.cart.find(item => item.id === tour.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...tour,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`"${tour.name}" добавлен в корзину!`, 'success');
    }

    // Удаление тура из корзины
    removeFromCart(tourId) {
        this.cart = this.cart.filter(item => item.id !== tourId);
        this.saveCart();
        this.updateCartCount();
        this.loadCartPage();
    }

    // Изменение количества
    updateQuantity(tourId, change) {
        const item = this.cart.find(item => item.id === tourId);
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                this.removeFromCart(tourId);
            } else {
                this.saveCart();
                this.loadCartPage();
            }
        }
    }

    // Очистка корзины
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.loadCartPage();
    }

    // Сохранение в localStorage
    saveCart() {
        localStorage.setItem('skazka_cart', JSON.stringify(this.cart));
    }

    // Обновление счетчика в навигации
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    // Загрузка страницы корзины
    loadCartPage() {
        const cartContainer = document.getElementById('cart-items-container');
        const emptyCart = document.getElementById('cart-empty');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.classList.add('hidden');
            emptyCart.classList.remove('hidden');
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        cartContainer.classList.remove('hidden');
        emptyCart.classList.add('hidden');
        if (checkoutBtn) checkoutBtn.disabled = false;

        // Отрисовка элементов корзины
        cartContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">${item.price * item.quantity} ฿</div>
                    </div>
                    <div class="cart-item-meta">
                        <span class="destination-duration">${item.duration}</span>
                        <span class="destination-category">${item.category}</span>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="cartSystem.updateQuantity('${item.id}', -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="cartSystem.updateQuantity('${item.id}', 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="cartSystem.removeFromCart('${item.id}')">
                            🗑️ Удалить
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Обновление итогов
        this.updateCartSummary();
    }

    // Загрузка страницы оформления заказа
    loadCheckoutPage() {
        const orderItems = document.getElementById('order-items');
        if (!orderItems) return;

        if (this.cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        orderItems.innerHTML = this.cart.map(item => `
            <div class="order-item">
                <div>
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-quantity">${item.quantity} × ${item.price} ฿</div>
                </div>
                <div class="order-item-price">${item.price * item.quantity} ฿</div>
            </div>
        `).join('');

        this.updateOrderSummary();
    }

    // Обновление итогов в корзине
    updateCartSummary() {
        const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = subtotal * 0.05;
        const final = subtotal - discount;

        document.getElementById('summary-count').textContent = totalCount;
        document.getElementById('summary-total').textContent = `${subtotal} ฿`;
        document.getElementById('summary-discount').textContent = `-${discount} ฿`;
        document.getElementById('summary-final').textContent = `${final} ฿`;

        // Обработчик изменения способа оплаты
        const paymentMethods = document.querySelectorAll('input[name="payment"]');
        paymentMethods.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateCartSummary();
            });
        });
    }

    // Обновление итогов в оформлении заказа
    updateOrderSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
        const discount = paymentMethod === 'online' ? subtotal * 0.05 : 0;
        const total = subtotal - discount;

        document.getElementById('order-subtotal').textContent = `${subtotal} ฿`;
        document.getElementById('order-discount').textContent = `-${discount} ฿`;
        document.getElementById('order-total').textContent = `${total} ฿`;

        // Обновление при изменении способа оплаты
        const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
        paymentMethods.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateOrderSummary();
            });
        });
    }

    // Оформление заказа
    processCheckout(formData) {
        const order = {
            id: Date.now().toString(),
            items: [...this.cart],
            customer: formData,
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };

        // Сохранение заказа
        const orders = JSON.parse(localStorage.getItem('skazka_orders')) || [];
        orders.push(order);
        localStorage.setItem('skazka_orders', JSON.stringify(orders));

        // Очистка корзины
        this.clearCart();

        // Показ модального окна
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }

        return order;
    }
}

// Инициализация системы корзины
const cartSystem = new CartSystem();

// Обработчики для кнопок "Забронировать" на странице экскурсий
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики для кнопок бронирования
    const bookButtons = document.querySelectorAll('.destination-card .btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.destination-card');
            const tour = {
                id: card.getAttribute('data-id') || Date.now().toString(),
                name: card.querySelector('h3').textContent,
                price: parseInt(card.querySelector('.destination-price').textContent.replace(/[^\d]/g, '')),
                duration: card.querySelector('.destination-duration')?.textContent || 'Весь день',
                category: card.getAttribute('data-category') || 'sea',
                image: card.querySelector('.destination-image').style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1')
            };
            
            cartSystem.addToCart(tour);
        });
    });

    // Обработчик для кнопки перехода к оплате
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }

    // Обработчик формы оформления заказа
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                hotel: document.getElementById('hotel').value,
                notes: document.getElementById('notes').value,
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
            };

            // Валидация формы
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.hotel) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }

            if (!document.getElementById('agreement').checked) {
                showNotification('Необходимо согласие с условиями бронирования', 'error');
                return;
            }

            // Обработка заказа
            cartSystem.processCheckout(formData);
        });
    }

    // Обработчик модального окна
    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            document.getElementById('success-modal').classList.add('hidden');
            window.location.href = 'index.html';
        });
    }
});

// Вспомогательная функция для уведомлений
function showNotification(message, type) {
    // Используем существующую функцию из основного скрипта
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Фолбэк уведомление
        alert(message);
    }
}