import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'ru',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('ru').create({
        header: 'Привет',
        msg: 'Главная',
        navbar: [
            { title: 'Главная', route: '/' },
            { title: 'Заказы', route: '/orders' },
            { title: 'Товары', route: '/all' },
            { title: 'Оплата', route: '/payment' },
            { title: 'Контакты', route: '/about' },
        ],
        menu_price: 'Цена',
        menu_btn: 'Найти',
        allBtn: 'Все',
        special: 'Особый заказ',
        specialh4: 'Не нашли товар в каталоге?',
        specialp: 'Закажите услугу "Особый заказ" и с вами свяжется наш оператор, с которым вы сможете договориться о заказе товаров отсутствующих в каталоге.',
        specialBtn: 'Скоро в приложении',
        registr: 'Заказать',
        your_phone: 'Ваш номер',
        submit: 'Отправить',
        orders: 'Заказы',
        order: 'Заказ',
        history_order: 'История заказов',
        not_auth: 'Вы не авторизованы',
        tenge: 'тенге',
        products: 'Товары',
        articleProduct: 'Продукты',
        household: 'Бытовая химия',
        chosen: 'Избранные',
        cart: 'Корзина',
        total_price: 'Итоговая сумма',
        price: 'Стоимость',
        count: 'штук',
        reg: 'Оформить заказ',
        regisrt: 'Оформление заказа',
        date_delivery: 'Дата и время доставки',
        address_delivery: 'Адрес доставки',
        payment_method: 'Способ оплаты',
        bonus: 'Бонусы',
        total: 'Итого',
        in_cash: 'Наличными',
        card: 'Картой',
        card_courier: 'Картой курьеру (POS - терминал)',
        bank_transfer: 'Банковский перевод',
        spend_bonus: 'Потратить бонусы',
        spend: 'Накоплено',
        upps: 'Попробуйте сново',
        thanks_for_sale: 'Благодарим за покупку',
        street: 'Ул.',
        home: 'дом',
        apartment: 'кВ',
        other_address: 'Указать другой адрес',
        search_input: 'Найдите все для повседневной жизни',
        shopping: 'К покупкам',
        cart_empty: 'Ваша корзина пуста',
        add_cart: 'Вы добавили товар в корзину',
        del_fav: 'Вы убрали товар из избранных!',
        add_fav: 'Вы добавили товар в избранные!',
        write_message: 'Служба поддержки: info@zakaz-online.kz',
        delivery_phone: 'Телефон доставки в г.Нур-султан',
        another_address: 'У вас еще нет адресов',
        empty_card: 'У вас еще не добавлена карта',
        is_night: 'В данном промежутке времени итоговая сумма может измениться',
        min_price: 'Минимальная сумма заказа должна превышать 7 000 тг',
        profile: 'Профиль',
        name: 'Имя',
        phone: 'Номер',
        tied_cards: 'Привязанные карты',
        new_address: 'Добавить новый адрес',
        added_new_address: 'Добавление нового адреса',
        change: 'Изменить',
        delete: 'Удалить',
        cancel: 'Отмена',
        on_map: 'Указать на карте',
        your_map_address: 'Вы можете указать ваш адрес на карте.',
        your_marker: 'Поставьте маркер на ваше местоположение.',
        add: 'Добавить',
        to_change: 'Изменить',
        new_card: 'Добавить новую карту',
        adding_new_card: 'Добавление новой карты',
        card_name: 'Введите номер карты:',
        enter_fullname: 'Введите полное имя',
        card_year: 'ММ/ГГ',
        cvv: 'CCV/CVV код',
        exit: 'Выход',
        come_in: 'Войти',
        orders_count: 'заказов',
        total: 'Всего',
        delivery_date: 'Дата доставки',
        status: 'Статус',
        address: 'Адрес',
        paid: 'Оплачено',
        amount: 'Количество',
        from: 'от',
        change_categories: 'Выберите категорию вашего запроса, установите параметры фильтра',
        payment: 'Оплата',
        contact: 'Контакты',
        description: 'Описание',
        buy_with: 'С этим покупают',
        result_search: 'Результат поиска',
        btn_add_cart: 'Купить',
        date: 'Дата',
        hour: 'Время',
        your_address: 'Указать один из своих адресов',
        orders_empty: 'Ваш список заказов пуст',
        orders_show_auth: 'Что бы увидеть список заказов вам нужно авторизоватся',
        log_in: 'Вы вошли. Добро пожаловать!',
        log_out: 'Вы вышли',
    }),

    new MLanguage('en').create({
        header: 'Hi',
        msg: 'Home',
        navbar: [
            { title: 'Home', route: '/' }, 
            { title: 'Orders', route: '/orders' },
            { title: 'Products', route: '/all' },
            { title: 'Payment', route: '/payment' },
            { title: 'Contacts', route: '/about' }
        ],
        menu_price: 'Price',
        menu_btn: 'Search',
        allBtn: 'All',
        special: 'Special order',
        specialh4: 'Did not find the product in the catalog?',
        specialp: 'Order the service "Special order" and our operator will contact you, with whom you can agree on the order of goods',
        specialBtn: 'Coming soon in the app',
        your_phone: 'Your phone',
        submit: 'Submit',
        orders: 'Orders',
        order: 'Order',
        history_order: 'Order history',
        not_auth: 'You are not authorization',
        tenge: 'tenge',
        products: 'Products',
        articleProduct: 'Products',
        household: 'Household chemicals',
        chosen: 'Featured',
        registr: 'To order',
        cart: 'Basket',
        total_price: 'Total price',
        price: 'Price',
        count: 'count',
        reg: 'Checkout',
        regisrt: 'Checkout',
        date_delivery: 'Delivery date and time',
        address_delivery: 'Delivery address',
        payment_method: 'Payment method',
        bonus: 'bonuses',
        total: 'Total',
        in_cash: 'In cash',
        card: 'Card',
        card_courier: 'Card to the courier',
        bank_transfer: 'Bank Transfer',
        spend_bonus: 'Spend bonuses',
        spend: 'Spend',
        upps: 'Try again',
        thanks_for_sale: 'Thank you for your purchase',
        street: '',
        home: 'home',
        apartment: 'apartment',
        other_address: 'Specify a different address',
        search_input: 'Find everything for everyday life',
        shopping: 'To shopping',
        cart_empty: 'You have not added items to the cart',
        add_cart: 'You have added an item to your cart',
        del_fav: 'You removed the product from the favorites!',
        add_fav: 'You have added the product to your favorites!',
        write_message: 'Service support: info@zakaz-online.kz',
        delivery_phone: 'Phone delivery in Almaty',
        another_address: 'You don\'t have addresses yet',
        empty_card: 'You haven\'t added a map yet',
        is_night: 'In this time period, the total amount may change',
        min_price: 'Minimum order stats from 7 000 tenge',
        profile: 'Profile',
        name: 'Name',
        phone: 'Phone',
        tied_cards: 'Tied cards',
        new_address: 'Add new address',
        added_new_address: 'Adding a new address',
        street: 'Street',
        change: 'Change',
        delete: 'Delete',
        cancel: 'Cancel',
        on_map: 'Indicate on the map',
        your_map_address: 'You can specify your address on the map.',
        your_marker: 'Put a marker on your location.',
        add: 'Add',
        to_change: 'To change',
        new_card: 'Add new card',
        adding_new_card: 'The addition of a new card',
        card_name: 'Enter card number',
        enter_fullname: 'Name and Surname as on the card',
        card_year: 'MM/YY',
        cvv: 'CCV/CVV code',
        exit: 'Exit',
        come_in: 'To come in',
        orders_count: 'orders',
        total: 'Total',
        delivery_date: 'Delivery date',
        status: 'Status',
        address: 'Address',
        paid: 'Paid',
        amount: 'Amount',
        from: 'from',
        change_categories: 'Select the category of your query, set the filter parameters',
        payment: 'Payment',
        contact: 'Contacts',
        description: 'Description',
        buy_with: 'With this buy',
        result_search: 'Result of search',
        btn_add_cart: 'Buy',
        date: 'Date',
        hour: 'Hour',
        your_address: 'Specify one of your addresses',
        orders_empty: 'Your order list is empty',
        orders_show_auth: 'To see the list of orders you need to log in',
        log_in: 'You came in. Welcome!',
        log_out: 'You are logout'
    })
  ]
})