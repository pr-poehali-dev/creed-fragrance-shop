import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Product, products } from '@/data/products';

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

const ProductPage = ({ onAddToCart }: ProductPageProps) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(productId));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/404');
    }
  }, [productId, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin" />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b-2 border-black">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к каталогу
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden border-2 border-black">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex gap-2 mb-4">
                <Badge variant="outline" className="border-black text-sm px-3 py-1">
                  {product.category === 'men' ? 'ДЛЯ НЕГО' : product.category === 'women' ? 'ДЛЯ НЕЁ' : 'УНИСЕКС'}
                </Badge>
                <Badge variant="outline" className="border-gray-300 text-sm px-3 py-1">
                  {product.collection}
                </Badge>
              </div>

              <h1 className="text-5xl font-serif font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{product.description}</p>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold">{product.price.toLocaleString()} ₽</span>
                <span className="text-lg text-muted-foreground">{product.volume}</span>
              </div>

              {!product.inStock && (
                <Badge variant="outline" className="border-red-500 text-red-500 mb-6">
                  Нет в наличии
                </Badge>
              )}

              <Button
                onClick={() => {
                  onAddToCart(product);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-black text-white hover:bg-gray-800 h-16 text-lg font-semibold mb-8"
                disabled={!product.inStock}
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
              </Button>

              <div className="border-t-2 border-black pt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="Truck" size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Быстрая доставка</p>
                    <p className="text-sm text-muted-foreground">Бесплатная доставка по Москве от 20 000 ₽</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Shield" size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Гарантия качества</p>
                    <p className="text-sm text-muted-foreground">100% оригинальная продукция</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Award" size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Luxury упаковка</p>
                    <p className="text-sm text-muted-foreground">Фирменная упаковка CREED в подарок</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-black pt-12 mb-20">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-serif font-bold mb-6">Описание аромата</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {product.fullDescription}
            </p>

            <h3 className="text-2xl font-serif font-bold mb-6">Пирамида аромата</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 border-black">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Sparkles" size={24} />
                    <h4 className="font-serif font-bold text-lg">Верхние ноты</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.top.map(note => (
                      <Badge key={note} variant="outline" className="border-black px-3 py-1">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Heart" size={24} />
                    <h4 className="font-serif font-bold text-lg">Ноты сердца</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.heart.map(note => (
                      <Badge key={note} variant="outline" className="border-black px-3 py-1">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Layers" size={24} />
                    <h4 className="font-serif font-bold text-lg">Базовые ноты</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.base.map(note => (
                      <Badge key={note} variant="outline" className="border-black px-3 py-1">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t-2 border-black pt-12">
            <h2 className="text-3xl font-serif font-bold mb-8">Вам также может понравиться</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Card 
                  key={relatedProduct.id}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black overflow-hidden"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <Badge variant="outline" className="border-black text-xs mb-3">
                        {relatedProduct.category === 'men' ? 'ДЛЯ НЕГО' : relatedProduct.category === 'women' ? 'ДЛЯ НЕЁ' : 'УНИСЕКС'}
                      </Badge>
                      <h4 className="font-serif text-lg font-bold mb-2">
                        {relatedProduct.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">{relatedProduct.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">{relatedProduct.price.toLocaleString()} ₽</span>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(relatedProduct);
                          }}
                          className="bg-black text-white hover:bg-gray-800"
                          size="sm"
                          disabled={!relatedProduct.inStock}
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
      </div>

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
                <button onClick={() => navigate('/')} className="block text-gray-400 hover:text-white transition-colors">
                  О бренде
                </button>
                <button onClick={() => navigate('/')} className="block text-gray-400 hover:text-white transition-colors">
                  Доставка и оплата
                </button>
                <button onClick={() => navigate('/')} className="block text-gray-400 hover:text-white transition-colors">
                  Контакты
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => navigate('/')} className="block text-gray-400 hover:text-white transition-colors">
                  Для него
                </button>
                <button onClick={() => navigate('/')} className="block text-gray-400 hover:text-white transition-colors">
                  Для неё
                </button>
                <button onClick={() => navigate('/')} className="block text-gray-400 hover:text-white transition-colors">
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

export default ProductPage;
