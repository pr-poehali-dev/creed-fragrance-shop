import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Product, products } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface IndexProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
}

const Index = ({ cart, setCart, addToCart }: IndexProps) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const productsData = products;
    {
      id: 1,
      name: 'Aventus',
      price: 35000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/4827fc83-00ee-4683-b72d-22959118f3d9.jpg',
      description: 'Легендарный аромат силы и успеха',
      volume: '100 мл',
      category: 'men',
      collection: 'Signature',
      inStock: true,
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
      category: 'unisex',
      collection: 'Millésime',
      inStock: true,
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
      category: 'men',
      collection: 'Heritage',
      inStock: true,
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
      category: 'unisex',
      collection: 'Millésime',
      inStock: true,
      fullDescription: 'Millésime Impérial воплощает дух роскоши и свободы. Созданный для тех, кто ценит морскую свежесть и элегантность, этот аромат переносит вас на борт роскошной яхты. Солёные морские ноты в сочетании с цитрусовыми создают ощущение бесконечной свободы.',
      notes: {
        top: ['Морская соль', 'Бергамот', 'Мандарин', 'Лимон'],
        heart: ['Ирис', 'Фрукты', 'Море'],
        base: ['Мускус', 'Древесные ноты', 'Амбра']
      }
    },
    {
      id: 5,
      name: 'Love in White',
      price: 36000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/78b5e02e-db2a-4960-b361-0d5314d7ffe6.jpg',
      description: 'Воплощение чистоты и романтики',
      volume: '75 мл',
      category: 'women',
      collection: 'Millésime',
      inStock: true,
      fullDescription: 'Love in White — изысканный женский аромат, созданный как гимн чистой любви. Нежные цветочные ноты в сочетании с рисовым паром создают воздушную, невесомую композицию, символизирующую искренность и романтику.',
      notes: {
        top: ['Апельсин', 'Магнолия', 'Рисовый пар'],
        heart: ['Ирис', 'Роза', 'Нарцисс'],
        base: ['Сандал', 'Мускус', 'Тонка']
      }
    },
    {
      id: 6,
      name: 'Viking',
      price: 37000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/b8a372b2-9fa4-43af-9d71-daff420f7920.jpg',
      description: 'Мужество северных воинов',
      volume: '100 мл',
      category: 'men',
      collection: 'Heritage',
      inStock: true,
      fullDescription: 'Viking — мощный аромат, вдохновленный бесстрашием и силой скандинавских воинов. Пряные и древесные ноты создают композицию для настоящих мужчин, не боящихся бросить вызов стихиям.',
      notes: {
        top: ['Бергамот', 'Мята', 'Лимон', 'Розовый перец'],
        heart: ['Лаванда', 'Роза', 'Перец'],
        base: ['Сандал', 'Пачули', 'Ветивер', 'Кедр']
      }
    },
    {
      id: 7,
      name: 'Carmina',
      price: 31000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/4827fc83-00ee-4683-b72d-22959118f3d9.jpg',
      description: 'Летняя свежесть для неё',
      volume: '75 мл',
      category: 'women',
      collection: 'Les Royales Exclusives',
      inStock: true,
      fullDescription: 'Carmina — яркий и свежий аромат, воспевающий красоту летнего дня. Сочетание цветочных и фруктовых нот создаёт лёгкую, жизнерадостную композицию для современной женщины.',
      notes: {
        top: ['Яблоко', 'Мандарин', 'Бергамот'],
        heart: ['Роза', 'Иланг-иланг', 'Жасмин'],
        base: ['Сандал', 'Мускус', 'Ваниль']
      }
    },
    {
      id: 8,
      name: 'Royal Oud',
      price: 38000,
      image: 'https://cdn.poehali.dev/projects/c8967640-190e-49be-9740-62d8a3b5e331/files/78b5e02e-db2a-4960-b361-0d5314d7ffe6.jpg',
      description: 'Королевская роскошь уда',
      volume: '100 мл',
      category: 'unisex',
      collection: 'Les Royales Exclusives',
      inStock: false,
      fullDescription: 'Royal Oud — воплощение восточной роскоши и благородства. Драгоценный уд в сочетании с пряными нотами создаёт аромат истинного величия, достойный королевских особ.',
      notes: {
        top: ['Лимон', 'Розовый перец', 'Кедр'],
        heart: ['Уд', 'Ангелика', 'Гальбанум'],
        base: ['Сандал', 'Мускус', 'Тонка']
      }
    }
  ];

  const filteredProducts = productsData
    .filter(p => {
      const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

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

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-black shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <h1 
                className="text-4xl font-serif font-bold tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => setActiveSection('home')}
              >
                CREED
              </h1>
              <nav className="hidden lg:flex gap-8 items-center">
                <button
                  onClick={() => setActiveSection('catalog')}
                  className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase"
                >
                  Каталог
                </button>
                <button
                  onClick={() => setActiveSection('about')}
                  className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase"
                >
                  О бренде
                </button>
                <button
                  onClick={() => setActiveSection('delivery')}
                  className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase"
                >
                  Доставка
                </button>
                <button
                  onClick={() => setActiveSection('contacts')}
                  className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase"
                >
                  Контакты
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                    <Icon name="ShoppingBag" size={22} />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white border-none">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg bg-white border-black">
                  <SheetHeader>
                    <SheetTitle className="font-serif text-3xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col h-full">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <Icon name="ShoppingBag" size={64} className="mb-4 opacity-20" />
                        <p>Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-auto space-y-4 pr-2">
                          {cart.map(item => (
                            <div key={item.id} className="flex gap-4 border-b pb-4 border-gray-200">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover border border-gray-200" />
                              <div className="flex-1">
                                <h3 className="font-serif font-semibold">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.volume}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-black"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-black"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">{(item.price * item.quantity).toLocaleString()} ₽</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="mt-2 hover:bg-gray-100"
                                >
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t-2 border-black pt-4 mt-4">
                          <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Итого:</span>
                            <span>{totalPrice.toLocaleString()} ₽</span>
                          </div>
                          <Button 
                            className="w-full bg-black text-white hover:bg-gray-800 h-12 text-base font-semibold"
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

              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setActiveSection(activeSection === 'home' ? 'catalog' : 'home')}
              >
                <Icon name="Menu" size={22} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <>
            <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white border-b-2 border-black">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              <div className="container mx-auto px-4 text-center relative z-10">
                <Badge className="mb-6 bg-black text-white border-none px-6 py-2 text-sm">
                  EST. 1760
                </Badge>
                <h2 className="text-6xl md:text-8xl font-serif font-bold mb-6 tracking-wider">
                  CREED
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                  Более 260 лет традиций парфюмерного искусства
                </p>
                <Button 
                  onClick={() => setActiveSection('catalog')}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg font-semibold"
                >
                  Смотреть коллекцию
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h3 className="text-4xl font-serif font-bold mb-4">Избранные ароматы</h3>
                  <p className="text-muted-foreground">Культовые композиции от легендарного дома</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {productsData.slice(0, 4).map(product => (
                    <Card 
                      key={product.id} 
                      className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black overflow-hidden"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <CardContent className="p-0">
                        <div 
                          className="aspect-square overflow-hidden bg-gray-50"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <Badge variant="outline" className="mb-3 border-black text-xs">
                            {product.category === 'men' ? 'ДЛЯ НЕГО' : product.category === 'women' ? 'ДЛЯ НЕЁ' : 'УНИСЕКС'}
                          </Badge>
                          <h4 
                            className="font-serif text-xl font-bold mb-2 hover:opacity-60 transition-opacity"
                          >
                            {product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold">{product.price.toLocaleString()} ₽</span>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="bg-black text-white hover:bg-gray-800"
                              disabled={!product.inStock}
                            >
                              {product.inStock ? 'В корзину' : 'Нет в наличии'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-20 bg-black text-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <Icon name="Award" size={48} className="mx-auto mb-4" />
                    <h4 className="text-xl font-serif font-bold mb-2">Наследие</h4>
                    <p className="text-gray-400">Более 260 лет мастерства</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Sparkles" size={48} className="mx-auto mb-4" />
                    <h4 className="text-xl font-serif font-bold mb-2">Качество</h4>
                    <p className="text-gray-400">Только натуральные ингредиенты</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Crown" size={48} className="mx-auto mb-4" />
                    <h4 className="text-xl font-serif font-bold mb-2">Эксклюзивность</h4>
                    <p className="text-gray-400">Ароматы для королевских особ</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-4xl font-serif font-bold mb-2">Каталог ароматов</h2>
                <p className="text-muted-foreground">Полная коллекция парфюмов CREED</p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по названию или описанию..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-black h-12"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px] border-black h-12">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="men">Для него</SelectItem>
                      <SelectItem value="women">Для неё</SelectItem>
                      <SelectItem value="unisex">Унисекс</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] border-black h-12">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">По умолчанию</SelectItem>
                      <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                      <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                      <SelectItem value="name">По названию</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Icon name="Search" size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="text-xl text-muted-foreground">Ничего не найдено</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <Card 
                      key={product.id} 
                      className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black overflow-hidden bg-white"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <CardContent className="p-0">
                        <div 
                          className="aspect-square overflow-hidden bg-gray-100 relative"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Badge className="bg-white text-black">Нет в наличии</Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex gap-2 mb-3">
                            <Badge variant="outline" className="border-black text-xs">
                              {product.category === 'men' ? 'ДЛЯ НЕГО' : product.category === 'women' ? 'ДЛЯ НЕЁ' : 'УНИСЕКС'}
                            </Badge>
                            <Badge variant="outline" className="border-gray-300 text-xs">
                              {product.collection}
                            </Badge>
                          </div>
                          <h4 
                            className="font-serif text-lg font-bold mb-1 hover:opacity-60 transition-opacity"
                          >
                            {product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-1">{product.description}</p>
                          <p className="text-xs text-muted-foreground mb-4">{product.volume}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold">{product.price.toLocaleString()} ₽</span>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="bg-black text-white hover:bg-gray-800"
                              size="sm"
                              disabled={!product.inStock}
                            >
                              В корзину
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-5xl font-serif font-bold mb-8">О бренде CREED</h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Основанный в 1760 году в Лондоне, Дом CREED — это синоним роскоши и изысканности в мире парфюмерии. 
                  На протяжении более чем 260 лет семья Крид создаёт уникальные ароматы для королевских особ, знаменитостей 
                  и ценителей по всему миру.
                </p>
                <p>
                  Каждый аромат CREED создаётся вручную с использованием только самых качественных натуральных ингредиентов 
                  со всего мира. Традиционные методы производства передаются из поколения в поколение, сохраняя аутентичность 
                  и неповторимость каждой композиции.
                </p>
                <p>
                  Среди клиентов CREED — королева Виктория, император Наполеон III, Уинстон Черчилль, Грейс Келли, 
                  Кэри Грант и многие другие легендарные личности. Сегодня бренд продолжает создавать ароматы, 
                  которые становятся легендами современности.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">260+</div>
                  <div className="text-sm text-muted-foreground">Лет традиций</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Натуральные масла</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Поколений мастеров</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Стран продаж</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-5xl font-serif font-bold mb-12">Доставка и оплата</h2>
              
              <div className="space-y-8">
                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Icon name="Truck" size={32} className="flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-serif font-bold mb-3">Курьерская доставка</h3>
                        <p className="text-muted-foreground mb-2">
                          По Москве в пределах МКАД — <strong>бесплатно при заказе от 20 000 ₽</strong>
                        </p>
                        <p className="text-muted-foreground mb-2">
                          За МКАД — 500 ₽ + 50 ₽/км
                        </p>
                        <p className="text-muted-foreground">
                          Доставка в день заказа при оформлении до 14:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Icon name="MapPin" size={32} className="flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-serif font-bold mb-3">Самовывоз</h3>
                        <p className="text-muted-foreground mb-2">
                          Из нашего шоу-рума в Москве — <strong>бесплатно</strong>
                        </p>
                        <p className="text-muted-foreground">
                          Адрес: г. Москва, ул. Тверская, д. 15
                        </p>
                        <p className="text-muted-foreground">
                          Время работы: ежедневно с 10:00 до 21:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Icon name="Package" size={32} className="flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-serif font-bold mb-3">Доставка по России</h3>
                        <p className="text-muted-foreground mb-2">
                          CDEK и Boxberry — от 400 ₽
                        </p>
                        <p className="text-muted-foreground">
                          Сроки доставки: 2-7 дней в зависимости от региона
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Icon name="CreditCard" size={32} className="flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-serif font-bold mb-3">Способы оплаты</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                          <li>Банковские карты (Visa, Mastercard, МИР)</li>
                          <li>Наличными курьеру</li>
                          <li>Оплата при получении в пункте выдачи</li>
                          <li>Банковский перевод для юридических лиц</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-5xl font-serif font-bold mb-12">Контакты</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <Icon name="MapPin" size={32} className="mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-3">Адрес шоу-рума</h3>
                    <p className="text-muted-foreground mb-2">г. Москва, ул. Тверская, д. 15</p>
                    <p className="text-muted-foreground">Ежедневно с 10:00 до 21:00</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <Icon name="Phone" size={32} className="mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-3">Телефон</h3>
                    <a href="tel:+74951234567" className="text-muted-foreground hover:opacity-60 transition-opacity">
                      +7 (495) 123-45-67
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">Звонки принимаются ежедневно</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <Icon name="Mail" size={32} className="mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-3">Email</h3>
                    <a href="mailto:info@creed-moscow.ru" className="text-muted-foreground hover:opacity-60 transition-opacity">
                      info@creed-moscow.ru
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">Ответим в течение 24 часов</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black">
                  <CardContent className="p-8">
                    <Icon name="MessageCircle" size={32} className="mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-3">Мессенджеры</h3>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">WhatsApp: +7 (495) 123-45-67</p>
                      <p className="text-muted-foreground">Telegram: @creed_moscow</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-5xl bg-white max-h-[90vh] overflow-y-auto border-2 border-black">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-4xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
                <div className="aspect-square overflow-hidden border-2 border-gray-200">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline" className="border-black">
                        {selectedProduct.category === 'men' ? 'ДЛЯ НЕГО' : selectedProduct.category === 'women' ? 'ДЛЯ НЕЁ' : 'УНИСЕКС'}
                      </Badge>
                      <Badge variant="outline" className="border-gray-300">
                        {selectedProduct.collection}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{selectedProduct.volume}</p>
                    <p className="text-4xl font-bold mb-4">{selectedProduct.price.toLocaleString()} ₽</p>
                    {!selectedProduct.inStock && (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        Нет в наличии
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct.fullDescription}
                  </p>
                  
                  <div className="space-y-5">
                    <div>
                      <h4 className="font-serif font-bold text-lg mb-3">Верхние ноты</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.notes.top.map(note => (
                          <Badge key={note} variant="outline" className="border-black px-3 py-1">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg mb-3">Ноты сердца</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.notes.heart.map(note => (
                          <Badge key={note} variant="outline" className="border-black px-3 py-1">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg mb-3">Базовые ноты</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.notes.base.map(note => (
                          <Badge key={note} variant="outline" className="border-black px-3 py-1">
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
                    className="w-full bg-black text-white hover:bg-gray-800 h-14 text-lg font-semibold"
                    disabled={!selectedProduct.inStock}
                  >
                    {selectedProduct.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-3xl bg-white max-h-[90vh] overflow-y-auto border-2 border-black">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl">Оформление заказа</DialogTitle>
          </DialogHeader>
          <div className="space-y-8 mt-6">
            <div className="space-y-5">
              <h3 className="font-serif text-xl font-bold">Контактные данные</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base">Имя и фамилия *</Label>
                  <Input
                    id="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    className="border-black h-12 mt-2"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-base">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      className="border-black h-12 mt-2"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                      className="border-black h-12 mt-2"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="font-serif text-xl font-bold">Способ доставки</h3>
              <div className="grid grid-cols-1 gap-4">
                <Card 
                  className={`cursor-pointer transition-all border-2 ${ 
                    orderForm.deliveryMethod === 'courier' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-300'
                  }`}
                  onClick={() => setOrderForm({...orderForm, deliveryMethod: 'courier'})}
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <Icon name="Truck" size={28} />
                    <div>
                      <p className="font-bold text-lg">Курьерская доставка</p>
                      <p className="text-sm text-muted-foreground">По Москве — бесплатно от 20 000 ₽</p>
                    </div>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all border-2 ${ 
                    orderForm.deliveryMethod === 'pickup' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-300'
                  }`}
                  onClick={() => setOrderForm({...orderForm, deliveryMethod: 'pickup'})}
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <Icon name="MapPin" size={28} />
                    <div>
                      <p className="font-bold text-lg">Самовывоз</p>
                      <p className="text-sm text-muted-foreground">Из шоу-рума в Москве — бесплатно</p>
                    </div>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all border-2 ${ 
                    orderForm.deliveryMethod === 'cdek' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-300'
                  }`}
                  onClick={() => setOrderForm({...orderForm, deliveryMethod: 'cdek'})}
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <Icon name="Package" size={28} />
                    <div>
                      <p className="font-bold text-lg">CDEK / Boxberry</p>
                      <p className="text-sm text-muted-foreground">Доставка по России — от 400 ₽</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {orderForm.deliveryMethod !== 'pickup' && (
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="city" className="text-base">Город *</Label>
                    <Input
                      id="city"
                      value={orderForm.city}
                      onChange={(e) => setOrderForm({...orderForm, city: e.target.value})}
                      className="border-black h-12 mt-2"
                      placeholder="Москва"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-base">Адрес доставки *</Label>
                    <Input
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                      className="border-black h-12 mt-2"
                      placeholder="Улица, дом, квартира"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-base">Индекс</Label>
                    <Input
                      id="postalCode"
                      value={orderForm.postalCode}
                      onChange={(e) => setOrderForm({...orderForm, postalCode: e.target.value})}
                      className="border-black h-12 mt-2"
                      placeholder="123456"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="comment" className="text-base">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  value={orderForm.comment}
                  onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                  className="border-black mt-2"
                  rows={3}
                  placeholder="Дополнительная информация для курьера"
                />
              </div>
            </div>

            <div className="border-t-2 border-black pt-6">
              <h3 className="font-serif text-xl font-bold mb-4">Состав заказа</h3>
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-base">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-2xl font-bold mb-8 pt-4 border-t">
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <Button 
                className="w-full bg-black text-white hover:bg-gray-800 h-14 text-lg font-semibold"
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

      <footer className="bg-black text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">CREED</h3>
              <p className="text-gray-400 text-sm">
                Более 260 лет традиций парфюмерного искусства
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => setActiveSection('about')} className="block text-gray-400 hover:text-white transition-colors">
                  О бренде
                </button>
                <button onClick={() => setActiveSection('delivery')} className="block text-gray-400 hover:text-white transition-colors">
                  Доставка и оплата
                </button>
                <button onClick={() => setActiveSection('contacts')} className="block text-gray-400 hover:text-white transition-colors">
                  Контакты
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => { setActiveSection('catalog'); setFilterCategory('men'); }} className="block text-gray-400 hover:text-white transition-colors">
                  Для него
                </button>
                <button onClick={() => { setActiveSection('catalog'); setFilterCategory('women'); }} className="block text-gray-400 hover:text-white transition-colors">
                  Для неё
                </button>
                <button onClick={() => { setActiveSection('catalog'); setFilterCategory('unisex'); }} className="block text-gray-400 hover:text-white transition-colors">
                  Унисекс
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+7 (495) 123-45-67</p>
                <p>info@creed-moscow.ru</p>
                <p>г. Москва, ул. Тверская, 15</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 CREED. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;