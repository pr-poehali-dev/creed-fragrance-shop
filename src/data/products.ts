export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  volume: string;
  category: 'men' | 'women' | 'unisex';
  collection: string;
  inStock: boolean;
  fullDescription: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export const products: Product[] = [
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
