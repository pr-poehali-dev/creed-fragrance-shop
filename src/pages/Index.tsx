import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  volume: string;
  fullDescription: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    comment: '',
    deliveryMethod: 'courier'
  });

  const products: Product[] = [
    {
      id: 1,
      name: 'Aventus',
      price: 35000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/4827fc83-00ee-4683-b72d-22959118f3d9.jpg',
      description: 'Легендарный аромат силы и успеха',
      volume: '100 мл',
      fullDescription: 'Aventus — это воплощение силы, успеха и стремления к совершенству. Созданный в 2010 году, этот культовый аромат быстро завоевал статус легенды в мире парфюмерии. Aventus сочетает в себе дерзость и утонченность, создавая неповторимый образ современного успешного человека.',
      notes: {
        top: ['Ананас', 'Бергамот', 'Черная смородина', 'Яблоко'],
        heart: ['Роза', 'Береза', 'Жасмин', 'Пачули'],
        base: ['Мускус', 'Дубовый мох', 'Амбра', 'Ваниль']
      }
    },
    {
      id: 2,
      name: 'Silver Mountain Water',
      price: 32000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/78b5e02e-db2a-4960-b361-0d5314d7ffe6.jpg',
      description: 'Свежесть горных вершин',
      volume: '100 мл',
      fullDescription: 'Silver Mountain Water воплощает чистоту и свежесть горных ручьёв. Этот аромат создан для тех, кто ценит природную красоту и стремится к гармонии. Свежие цитрусовые ноты в сочетании с чайными аккордами создают ощущение прохлады альпийских вершин.',
      notes: {
        top: ['Бергамот', 'Мандарин', 'Нероли'],
        heart: ['Зелёный чай', 'Чёрная смородина', 'Сандал'],
        base: ['Мускус', 'Древесные ноты', 'Петигрейн']
      }
    },
    {
      id: 3,
      name: 'Green Irish Tweed',
      price: 33000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/b8a372b2-9fa4-43af-9d71-daff420f7920.jpg',
      description: 'Классическая элегантность',
      volume: '100 мл',
      fullDescription: 'Green Irish Tweed — классический аромат, созданный в 1985 году для актёра Кэри Гранта. Этот парфюм олицетворяет элегантность и аристократизм. Свежие зелёные ноты в сочетании с древесными аккордами создают образ настоящего джентльмена.',
      notes: {
        top: ['Лимон', 'Вербена', 'Мята'],
        heart: ['Фиалка', 'Ирис', 'Сандал'],
        base: ['Амбра', 'Древесные ноты', 'Мускус']
      }
    },
    {
      id: 4,
      name: 'Millésime Impérial',
      price: 34000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/4827fc83-00ee-4683-b72d-22959118f3d9.jpg',
      description: 'Морская свежесть и роскошь',
      volume: '100 мл',
      fullDescription: 'Millésime Impérial воплощает дух роскоши и свободы. Созданный для тех, кто ценит морскую свежесть и элегантность, этот аромат переносит вас на борт роскошной яхты. Солёные морские ноты в сочетании с цитрусовыми создают ощущение бесконечной свободы.',
      notes: {
        top: ['Морская соль', 'Бергамот', 'Мандарин', 'Лимон'],
        heart: ['Ирис', 'Фрукты', 'Море'],
        base: ['Мускус', 'Древесные ноты', 'Амбра']
      }
    },
  ];

  const blogPosts = [
    { title: 'История бренда CREED', date: '15 октября 2024', excerpt: 'Более 260 лет традиций парфюмерного искусства' },
    { title: 'Как выбрать свой аромат', date: '10 октября 2024', excerpt: 'Руководство по подбору идеального парфюма' },
    { title: 'Aventus: легенда мира ароматов', date: '5 октября 2024', excerpt: 'История создания культового аромата' },
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Sparkles' },
    { id: 'about', label: 'О бренде', icon: 'Award' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'blog', label: 'Блог', icon: 'BookOpen' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-3xl font-serif font-bold tracking-wider">CREED</h1>
            <nav className="hidden lg:flex gap-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm tracking-wide hover:opacity-60 transition-opacity ${
                    activeSection === item.id ? 'font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg bg-white">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col h-full">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                      Корзина пуста
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4">
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 border-b pb-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                            <div className="flex-1">
                              <h3 className="font-serif font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.volume}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="mt-2"
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-semibold mb-4">
                          <span>Итого:</span>
                          <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button 
                          className="w-full bg-black text-white hover:bg-black/90"
                          onClick={() => setIsCheckoutOpen(true)}
                        >
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Меню</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 text-lg py-2 hover:opacity-60 transition-opacity ${
                        activeSection === item.id ? 'font-semibold' : ''
                      }`}
                    >
                      <Icon name={item.icon as any} size={20} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            <section className="relative h-[80vh] flex items-center justify-center bg-black text-white">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
              <div className="relative z-20 text-center px-4">
                <h2 className="text-6xl md:text-8xl font-serif font-bold mb-6 tracking-wider">CREED</h2>
                <p className="text-xl md:text-2xl mb-8 tracking-wide">Premium Fragrance Collection</p>
                <Button
                  onClick={() => setActiveSection('catalog')}
                  className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg"
                >
                  Открыть каталог
                </Button>
              </div>
            </section>

            <section className="container mx-auto px-4 py-20">
              <h3 className="text-4xl font-serif font-bold text-center mb-12">Избранные ароматы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map(product => (
                  <Card key={product.id} className="group cursor-pointer hover:shadow-xl transition-shadow border-black">
                    <CardContent className="p-0">
                      <div 
                        className="aspect-square overflow-hidden"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h4 
                          className="font-serif text-xl font-semibold mb-2 cursor-pointer hover:opacity-60"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">{product.price.toLocaleString()} ₽</span>
                          <Button
                            onClick={() => addToCart(product)}
                            className="bg-black text-white hover:bg-black/90"
                          >
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="animate-fade-in container mx-auto px-4 py-20">
            <h2 className="text-5xl font-serif font-bold mb-12 text-center">Каталог</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-xl transition-shadow border-black">
                  <CardContent className="p-0">
                    <div 
                      className="aspect-square overflow-hidden"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h4 
                        className="font-serif text-xl font-semibold mb-2 cursor-pointer hover:opacity-60"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-1">{product.description}</p>
                      <p className="text-xs text-muted-foreground mb-4">{product.volume}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">{product.price.toLocaleString()} ₽</span>
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-black text-white hover:bg-black/90"
                        >
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="animate-fade-in">
            <section className="bg-black text-white py-20">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-5xl font-serif font-bold mb-8 text-center">О бренде CREED</h2>
                <p className="text-lg leading-relaxed mb-6">
                  CREED — это легендарный парфюмерный дом с более чем 260-летней историей. Основанный в 1760 году, бренд создавал ароматы для королевских семей и знаменитостей по всему миру.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Каждый аромат CREED создается вручную с использованием эксклюзивных натуральных ингредиентов. Традиции мастерства передаются из поколения в поколение, что делает каждый флакон произведением парфюмерного искусства.
                </p>
                <p className="text-lg leading-relaxed">
                  Сегодня CREED — это символ роскоши, изысканности и непревзойденного качества в мире премиальной парфюмерии.
                </p>
              </div>
            </section>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="animate-fade-in container mx-auto px-4 py-20 max-w-4xl">
            <h2 className="text-5xl font-serif font-bold mb-12 text-center">Доставка</h2>
            <div className="space-y-8">
              <Card className="border-black">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Icon name="Truck" size={32} className="mt-1" />
                    <div>
                      <h3 className="text-xl font-serif font-semibold mb-2">Курьерская доставка</h3>
                      <p className="text-muted-foreground mb-2">По Москве в пределах МКАД — бесплатно при заказе от 20 000 ₽</p>
                      <p className="text-muted-foreground">Доставка в день заказа или на следующий день</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-black">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Icon name="Package" size={32} className="mt-1" />
                    <div>
                      <h3 className="text-xl font-serif font-semibold mb-2">Доставка по России</h3>
                      <p className="text-muted-foreground mb-2">Транспортными компаниями CDEK и Boxberry</p>
                      <p className="text-muted-foreground">Срок доставки 2-7 дней в зависимости от региона</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-black">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={32} className="mt-1" />
                    <div>
                      <h3 className="text-xl font-serif font-semibold mb-2">Самовывоз</h3>
                      <p className="text-muted-foreground mb-2">Из нашего шоу-рума в Москве</p>
                      <p className="text-muted-foreground">Бесплатно, готов к выдаче в течение 2 часов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'blog' && (
          <div className="animate-fade-in container mx-auto px-4 py-20">
            <h2 className="text-5xl font-serif font-bold mb-12 text-center">Блог</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <Card key={index} className="border-black hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
                    <h3 className="text-xl font-serif font-semibold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="ghost" className="px-0 hover:bg-transparent">
                      Читать далее →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="animate-fade-in container mx-auto px-4 py-20 max-w-4xl">
            <h2 className="text-5xl font-serif font-bold mb-12 text-center">Частые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-black px-6">
                <AccordionTrigger className="text-lg font-serif hover:no-underline">
                  Как отличить оригинальный CREED от подделки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Все наши ароматы поставляются напрямую от официального дистрибьютора. Каждый флакон имеет уникальный серийный номер и сертификат подлинности. Мы гарантируем 100% оригинальность продукции.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-black px-6">
                <AccordionTrigger className="text-lg font-serif hover:no-underline">
                  Какой срок годности у парфюма?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  При правильном хранении ароматы CREED сохраняют свои качества в течение 3-5 лет. Храните флаконы в прохладном месте, защищенном от прямых солнечных лучей.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-black px-6">
                <AccordionTrigger className="text-lg font-serif hover:no-underline">
                  Можно ли вернуть товар?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, вы можете вернуть неиспользованный товар в оригинальной упаковке в течение 14 дней с момента покупки. Стоимость доставки в обе стороны оплачивается покупателем.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-black px-6">
                <AccordionTrigger className="text-lg font-serif hover:no-underline">
                  Как выбрать аромат?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы рекомендуем посетить наш шоу-рум для личного знакомства с ароматами. Также вы можете заказать пробники перед покупкой полноразмерного флакона.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="animate-fade-in container mx-auto px-4 py-20 max-w-4xl">
            <h2 className="text-5xl font-serif font-bold mb-12 text-center">Контакты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-black">
                <CardContent className="p-8">
                  <Icon name="MapPin" size={32} className="mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">Адрес</h3>
                  <p className="text-muted-foreground">
                    Москва, ул. Тверская, д. 10<br />
                    ТЦ "Галерея"<br />
                    2 этаж, бутик №234
                  </p>
                </CardContent>
              </Card>

              <Card className="border-black">
                <CardContent className="p-8">
                  <Icon name="Phone" size={32} className="mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">Телефон</h3>
                  <p className="text-muted-foreground mb-2">
                    +7 (495) 123-45-67
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ежедневно с 10:00 до 21:00
                  </p>
                </CardContent>
              </Card>

              <Card className="border-black">
                <CardContent className="p-8">
                  <Icon name="Mail" size={32} className="mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">Email</h3>
                  <p className="text-muted-foreground">
                    info@creed-boutique.ru
                  </p>
                </CardContent>
              </Card>

              <Card className="border-black">
                <CardContent className="p-8">
                  <Icon name="Instagram" size={32} className="mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">Социальные сети</h3>
                  <p className="text-muted-foreground">
                    @creed_boutique_russia
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{selectedProduct.volume}</p>
                    <p className="text-3xl font-bold">{selectedProduct.price.toLocaleString()} ₽</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct.fullDescription}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-serif font-semibold mb-2">Верхние ноты</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.notes.top.map(note => (
                          <Badge key={note} variant="outline" className="border-black">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold mb-2">Ноты сердца</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.notes.heart.map(note => (
                          <Badge key={note} variant="outline" className="border-black">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold mb-2">Базовые ноты</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.notes.base.map(note => (
                          <Badge key={note} variant="outline" className="border-black">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-black text-white hover:bg-black/90"
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl">Оформление заказа</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold">Контактные данные</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя и фамилия *</Label>
                  <Input
                    id="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    className="border-black"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      className="border-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                      className="border-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold">Доставка</h3>
              <div className="space-y-4">
                <div>
                  <Label>Способ доставки</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <Card 
                      className={`cursor-pointer transition-all ${
                        orderForm.deliveryMethod === 'courier' 
                          ? 'border-black border-2' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setOrderForm({...orderForm, deliveryMethod: 'courier'})}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Icon name="Truck" size={24} />
                        <div>
                          <p className="font-semibold">Курьерская доставка</p>
                          <p className="text-sm text-muted-foreground">По Москве — бесплатно от 20 000 ₽</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card 
                      className={`cursor-pointer transition-all ${
                        orderForm.deliveryMethod === 'pickup' 
                          ? 'border-black border-2' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setOrderForm({...orderForm, deliveryMethod: 'pickup'})}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Icon name="MapPin" size={24} />
                        <div>
                          <p className="font-semibold">Самовывоз</p>
                          <p className="text-sm text-muted-foreground">Из шоу-рума в Москве</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card 
                      className={`cursor-pointer transition-all ${
                        orderForm.deliveryMethod === 'cdek' 
                          ? 'border-black border-2' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setOrderForm({...orderForm, deliveryMethod: 'cdek'})}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Icon name="Package" size={24} />
                        <div>
                          <p className="font-semibold">CDEK / Boxberry</p>
                          <p className="text-sm text-muted-foreground">Доставка по России</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {orderForm.deliveryMethod !== 'pickup' && (
                  <>
                    <div>
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        value={orderForm.city}
                        onChange={(e) => setOrderForm({...orderForm, city: e.target.value})}
                        className="border-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Адрес доставки *</Label>
                      <Input
                        id="address"
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                        className="border-black"
                        placeholder="Улица, дом, квартира"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Индекс</Label>
                      <Input
                        id="postalCode"
                        value={orderForm.postalCode}
                        onChange={(e) => setOrderForm({...orderForm, postalCode: e.target.value})}
                        className="border-black"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="comment">Комментарий к заказу</Label>
                  <Textarea
                    id="comment"
                    value={orderForm.comment}
                    onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                    className="border-black"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <Button 
                className="w-full bg-black text-white hover:bg-black/90"
                onClick={() => {
                  alert('Спасибо за заказ! Наш менеджер свяжется с вами в ближайшее время.');
                  setIsCheckoutOpen(false);
                  setCart([]);
                  setOrderForm({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    postalCode: '',
                    comment: '',
                    deliveryMethod: 'courier'
                  });
                }}
              >
                Подтвердить заказ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-black text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">CREED</h3>
              <p className="text-gray-400">Премиальная парфюмерия с 1760 года</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2 text-gray-400">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="block hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p>+7 (495) 123-45-67</p>
                <p>info@creed-boutique.ru</p>
                <p>Москва, ул. Тверская, д. 10</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 CREED Boutique. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;