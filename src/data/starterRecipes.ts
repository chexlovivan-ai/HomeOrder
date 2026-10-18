import { Recipe } from '../types';

export const STARTER_RECIPES: Recipe[] = [
  {
    id: 'shakshuka',
    title: { ru: 'Шакшука по-домашнему', en: 'Homemade Shakshuka' },
    description: {
      ru: 'Яичница в густом пряном соусе из спелых томатов, сладкого перца, чеснока и восточных специй.',
      en: 'Eggs poached in a spiced tomato, sweet bell pepper, garlic and cumin sauce.'
    },
    category: 'breakfast',
    timeMinutes: 20,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Яйца куриные', en: 'Eggs' }, amount: '4', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Томаты в собственном соку', en: 'Canned crushed tomatoes' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Болгарский перец', en: 'Bell pepper' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Лук репчатый', en: 'Onion' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Чеснок', en: 'Garlic' }, amount: '2', unit: { ru: 'зубчика', en: 'cloves' } },
      { name: { ru: 'Зира и паприка', en: 'Cumin and paprika' }, amount: '1', unit: { ru: 'ч.л.', en: 'tsp' } },
      { name: { ru: 'Свежая кинза/петрушка', en: 'Fresh cilantro or parsley' }, amount: '15', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Мелко нарежьте лук и сладкий перец. Обжарьте на оливковом масле 5 минут до мягкости.',
          en: 'Finely chop onion and bell pepper. Sauté in olive oil for 5 minutes until softened.'
        },
        timerSeconds: 300,
      },
      {
        text: {
          ru: 'Добавьте измельченный чеснок, зиру и паприку. Прогрейте 1 минуту до появления аромата.',
          en: 'Add minced garlic, cumin and paprika. Stir for 1 minute until fragrant.'
        },
        timerSeconds: 60,
      },
      {
        text: {
          ru: 'Влейте томаты, посолите, поперчите и тушите на среднем огне 7 минут до загустения.',
          en: 'Pour in crushed tomatoes, season with salt and pepper, simmer for 7 minutes.'
        },
        timerSeconds: 420,
      },
      {
        text: {
          ru: 'Сделайте ложкой 4 углубления и аккуратно вбейте яйца. Накройте крышкой и готовьте 4 минуты.',
          en: 'Make 4 wells with a spoon and crack in the eggs. Cover and cook on low for 4 minutes.'
        },
        timerSeconds: 240,
      },
      {
        text: {
          ru: 'Посыпьте свежей зеленью и подавайте прямо в сковороде с теплым хрустящим хлебом!',
          en: 'Sprinkle with fresh herbs and serve hot right in the skillet with crusty bread!'
        },
      },
    ],
  },
  {
    id: 'sweet_sour_pork',
    title: { ru: 'Кисло-сладкое мясо', en: 'Sweet and Sour Pork' },
    description: {
      ru: 'Хрустящие кусочки свинины в карамельной кисло-сладкой глазури с кусочками ананаса и перца.',
      en: 'Crispy pork bites glazed in a tangy sweet & sour sauce with juicy pineapple and crisp bell peppers.'
    },
    category: 'dinner',
    timeMinutes: 35,
    servings: 2,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Свиная вырезка', en: 'Pork tenderloin' }, amount: '450', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Консервированный ананас', en: 'Pineapple chunks' }, amount: '150', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Болгарский перец красный', en: 'Red bell pepper' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Кукурузный крахмал', en: 'Cornstarch' }, amount: '3', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Томатная паста или кетчуп', en: 'Tomato paste or ketchup' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Яблочный уксус', en: 'Apple cider vinegar' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Сахар тростниковый', en: 'Brown sugar' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Соевый соус', en: 'Soy sauce' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'Нарежьте свинину небольшими кусочками, замаринуйте в соевом соусе на 10 минут, затем обваляйте в крахмале.',
          en: 'Cut pork into bite-sized pieces, marinate in soy sauce for 10 minutes, coat in starch.'
        },
        timerSeconds: 600,
      },
      {
        text: {
          ru: 'Обжарьте мясо во фритюре или сковороде вок до золотистой корочки (около 6 минут).',
          en: 'Fry pork in hot oil until golden and crispy (about 6 minutes), transfer to paper towels.'
        },
        timerSeconds: 360,
      },
      {
        text: {
          ru: 'В отдельной сковороде быстро обжарьте перец и ананасы (3 минуты).',
          en: 'Stir fry bell pepper and pineapple chunks for 3 minutes.'
        },
        timerSeconds: 180,
      },
      {
        text: {
          ru: 'Смешайте уксус, сахар, кетчуп и ананасовый сок. Влейте к овощам, дайте соусу загустеть (2 минуты).',
          en: 'Combine vinegar, sugar, ketchup, and pineapple juice. Pour in and reduce for 2 minutes.'
        },
        timerSeconds: 120,
      },
      {
        text: {
          ru: 'Переложите мясо в горячий соус, перемешайте 30 секунд и подавайте с рисом.',
          en: 'Toss pork into the bubbling glaze for 30 seconds and serve immediately over steamed rice.'
        },
      },
    ],
  },
  {
    id: 'bolognese',
    title: { ru: 'Паста Болоньезе', en: 'Spaghetti Bolognese' },
    description: {
      ru: 'Классическое итальянское мясное рагу на медленном огне с пряными травами и пармезаном.',
      en: 'Authentic Italian slow-simmered beef ragù served over al dente spaghetti with aged parmesan.'
    },
    category: 'dinner',
    timeMinutes: 45,
    servings: 3,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d628178a?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Спагетти из твердых сортов', en: 'Spaghetti pasta' }, amount: '300', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Говяжий фарш', en: 'Ground beef' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Томаты протертые (пассата)', en: 'Tomato passata' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Морковь и сельдерей', en: 'Carrot and celery' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Лук репчатый', en: 'Yellow onion' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Чеснок', en: 'Garlic' }, amount: '2', unit: { ru: 'зубчика', en: 'cloves' } },
      { name: { ru: 'Пармезан тертый', en: 'Grated parmesan' }, amount: '50', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Мелко нарежьте лук, морковь и сельдерей. Пассеруйте на оливковом масле 7 минут.',
          en: 'Finely dice onion, carrot and celery. Sauté in olive oil for 7 minutes.'
        },
        timerSeconds: 420,
      },
      {
        text: {
          ru: 'Добавьте фарш, разбивая комочки лопаткой, обжаривайте 8 минут до подрумянивания.',
          en: 'Add ground beef, breaking up lumps with a spatula, brown for 8 minutes.'
        },
        timerSeconds: 480,
      },
      {
        text: {
          ru: 'Влейте протертые томаты, добавьте чеснок, орегано и тушите на слабом огне 25 минут.',
          en: 'Add passata, garlic, oregano, and simmer gently on low for 25 minutes.'
        },
        timerSeconds: 1500,
      },
      {
        text: {
          ru: 'Отварите спагетти в подсоленной воде до состояния al dente (9 минут).',
          en: 'Boil spaghetti in salted water until al dente (9 minutes).'
        },
        timerSeconds: 540,
      },
      {
        text: {
          ru: 'Смешайте пасту с рагу болоньезе и щедро посыпьте пармезаном.',
          en: 'Toss pasta with warm bolognese sauce and garnish generously with grated parmesan.'
        },
      },
    ],
  },
  {
    id: 'beef_stroganoff',
    title: { ru: 'Бефстроганов со сливочным пюре', en: 'Beef Stroganoff' },
    description: {
      ru: 'Нежнейшие брусочки говядины в бархатном соусе из сметаны, белых грибов и дижонской горчицы.',
      en: 'Tender beef strips simmered in a velvety sour cream and mushroom sauce.'
    },
    category: 'dinner',
    timeMinutes: 35,
    servings: 2,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Говяжья вырезка', en: 'Beef tenderloin' }, amount: '450', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Шампиньоны свежие', en: 'Fresh button mushrooms' }, amount: '200', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сметана 20%', en: 'Sour cream (20%)' }, amount: '200', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Лук репчатый', en: 'Onion' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Дижонская горчица', en: 'Dijon mustard' }, amount: '1', unit: { ru: 'ч.л.', en: 'tsp' } },
      { name: { ru: 'Сливочное масло', en: 'Butter' }, amount: '30', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Нарежьте мясо тонкими брусочками поперек волокон. Лук нашинкуйте полукольцами, грибы — пластинками.',
          en: 'Slice beef across the grain into thin strips. Slice onion and mushrooms.'
        },
      },
      {
        text: {
          ru: 'Обжарьте грибы и лук на сливочном масле 6 минут до золотистого оттенка.',
          en: 'Sauté mushrooms and onions in butter for 6 minutes until golden.'
        },
        timerSeconds: 360,
      },
      {
        text: {
          ru: 'На очень сильном огне порциями обжарьте говядину по 2-3 минуты, чтобы сохранить сочность.',
          en: 'Sear beef strips over very high heat in batches for 3 minutes to lock in juices.'
        },
        timerSeconds: 180,
      },
      {
        text: {
          ru: 'Соедините мясо, грибы, сметану и горчицу. Томите на медленном огне 5 минут.',
          en: 'Combine meat, mushrooms, sour cream and mustard. Simmer gently for 5 minutes.'
        },
        timerSeconds: 300,
      },
      {
        text: {
          ru: 'Подавайте с картофельным пюре или хрустящими солеными огурчиками.',
          en: 'Serve hot with silky mashed potatoes and pickles.'
        },
      },
    ],
  },
  {
    id: 'uzbek_plov',
    title: { ru: 'Узбекский плов', en: 'Uzbek Plov' },
    description: {
      ru: 'Ароматный рассыпчатый рис с бараниной или говядиной, сладкой желтой морковью, зирой и целыми головками чеснока.',
      en: 'Fragrant golden rice pilaf cooked with tender meat, sweet julienned carrots, cumin and garlic heads.'
    },
    category: 'lunch',
    timeMinutes: 60,
    servings: 4,
    difficulty: 'hard',
    photoUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Мясо (говядина или баранина)', en: 'Beef or lamb' }, amount: '600', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Рис девзира или лазер', en: 'Long-grain plov rice' }, amount: '500', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Морковь соломкой', en: 'Carrots (julienned)' }, amount: '500', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Лук репчатый', en: 'Onions' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Чеснок целый', en: 'Whole garlic heads' }, amount: '2', unit: { ru: 'головки', en: 'heads' } },
      { name: { ru: 'Зира и барбарис', en: 'Cumin and barberries' }, amount: '2', unit: { ru: 'ч.л.', en: 'tsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'В казане раскалите растительное масло. Обжарьте мясо до уверенной темно-золотой корочки (10 минут).',
          en: 'Heat oil in a heavy pot or kazan. Brown meat until deep golden crust forms (10 minutes).'
        },
        timerSeconds: 600,
      },
      {
        text: {
          ru: 'Добавьте лук, затем морковь. Жарьте зирвак 12 минут, добавьте зиру и соль.',
          en: 'Add onions, then carrots. Fry the zirvak for 12 minutes, add cumin and salt.'
        },
        timerSeconds: 720,
      },
      {
        text: {
          ru: 'Влейте кипяток, погрузите головки чеснока и томите зирвак 20 минут на тихом огне.',
          en: 'Pour boiling water to cover, insert garlic heads, simmer zirvak for 20 minutes.'
        },
        timerSeconds: 1200,
      },
      {
        text: {
          ru: 'Выложите ровным слоем промытый рис. Залейте водой на 1.5 см выше уровня риса и выпарите воду на сильном огне (8 минут).',
          en: 'Spread rinsed rice evenly over top. Add water 1.5cm above rice, boil off excess water (8 min).'
        },
        timerSeconds: 480,
      },
      {
        text: {
          ru: 'Соберите рис горкой, сделайте проколы, плотно закройте крышкой и томите на минимальном огне 15 минут.',
          en: 'Gather rice into a mound, puncture holes, cover tightly and steam on low for 15 minutes.'
        },
        timerSeconds: 900,
      },
    ],
  },
  {
    id: 'draniki',
    title: { ru: 'Драники картофельные со сметаной', en: 'Crispy Potato Draniki' },
    description: {
      ru: 'Хрустящие картофельные оладьи с золотистой корочкой и нежной серединой.',
      en: 'Crisp traditional potato pancakes served piping hot with sour cream and herbs.'
    },
    category: 'breakfast',
    timeMinutes: 25,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Картофель крупный', en: 'Large potatoes' }, amount: '6', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Лук репчатый', en: 'Onion' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Яйцо куриное', en: 'Egg' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Мука пшеничная', en: 'Flour' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Сметана для подачи', en: 'Sour cream' }, amount: '100', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Натрите картофель и лук на мелкой терке, хорошо отожмите лишнюю влагу через марлю.',
          en: 'Grate potatoes and onion finely, thoroughly squeeze out excess liquid.'
        },
      },
      {
        text: {
          ru: 'Добавьте яйцо, муку, соль и свежемолотый перец. Быстро перемешайте.',
          en: 'Mix in egg, flour, salt and freshly ground black pepper.'
        },
      },
      {
        text: {
          ru: 'Выкладывайте ложкой на раскаленную сковороду с маслом. Жарьте по 3-4 минуты с каждой стороны.',
          en: 'Spoon mixture into sizzling oiled pan. Fry 4 minutes per side until deeply crisp.'
        },
        timerSeconds: 240,
      },
      {
        text: {
          ru: 'Подавайте сразу горячими с щедрой ложкой холодной сметаны.',
          en: 'Serve immediately steaming hot with chilled sour cream.'
        },
      },
    ],
  },
  {
    id: 'pelmeni',
    title: { ru: 'Пельмени домашние с маслом', en: 'Homemade Pelmeni' },
    description: {
      ru: 'Классические домашние пельмени с начинкой из сочного фарша трех видов мяса.',
      en: 'Tender dumplings filled with seasoned juicy minced meat, served with melting butter.'
    },
    category: 'lunch',
    timeMinutes: 20,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Пельмени домашние', en: 'Pelmeni dumplings' }, amount: '450', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Лавровый лист и душистый перец', en: 'Bay leaf and peppercorns' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Сливочное масло', en: 'Butter' }, amount: '40', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Свежий укроп', en: 'Fresh dill' }, amount: '15', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Уксус 9% или сметана', en: 'Vinegar or sour cream' }, amount: '1', unit: { ru: 'ст.л.', en: 'tbsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'Вскипятите в широкой кастрюле 2 литра воды, щедро посолите, опустите лавровый лист и перец горошком.',
          en: 'Bring 2 liters of water to a boil, salt well, add bay leaves and peppercorns.'
        },
      },
      {
        text: {
          ru: 'Опустите пельмени по одному, помешивая шумовкой, чтобы они не прилипли ко дну.',
          en: 'Drop in dumplings one by one, stirring gently so they do not stick.'
        },
      },
      {
        text: {
          ru: 'После всплытия варите на среднем огне ровно 6-7 минут.',
          en: 'Once floating, cook at a steady rolling simmer for 7 minutes.'
        },
        timerSeconds: 420,
      },
      {
        text: {
          ru: 'Выловите шумовкой, добавьте сливочное масло, посыпьте укропом и черным перцем.',
          en: 'Drain with a slotted spoon, toss in butter, garnish with fresh dill and black pepper.'
        },
      },
    ],
  },
  {
    id: 'greek_salad',
    title: { ru: 'Греческий салат с фетой', en: 'Classic Greek Salad' },
    description: {
      ru: 'Спелые сладкие томаты, хрустящие огурцы, маслины каламата, красный лук и сыр фета с орегано.',
      en: 'Ripe sweet tomatoes, crisp cucumbers, kalamata olives, red onion, and creamy feta sprinkled with wild oregano.'
    },
    category: 'salad',
    timeMinutes: 12,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Спелые помидоры', en: 'Ripe tomatoes' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Огурцы свежие', en: 'Cucumbers' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Красный лук', en: 'Red onion' }, amount: '0.5', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Маслины каламата', en: 'Kalamata olives' }, amount: '100', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сыр фета', en: 'Feta cheese block' }, amount: '150', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Оливковое масло extra virgin', en: 'Extra virgin olive oil' }, amount: '3', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Сушеный орегано', en: 'Dried oregano' }, amount: '1', unit: { ru: 'ч.л.', en: 'tsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'Нарежьте томаты и огурцы крупными дольками, лук — тонкими перьями.',
          en: 'Chop tomatoes and cucumbers into large rustic chunks, slice red onion thinly.'
        },
      },
      {
        text: {
          ru: 'Сложите овощи в салатник, добавьте маслины, посолите и сбрызните оливковым маслом.',
          en: 'Place vegetables into a bowl, add olives, a pinch of sea salt and drizzle olive oil.'
        },
      },
      {
        text: {
          ru: 'Сверху положите цельный пласт сыра фета, посыпьте ароматным орегано и полейте маслом.',
          en: 'Top with a thick slab of feta cheese, dust with fragrant oregano, and drizzle more olive oil.'
        },
      },
    ],
  },
  {
    id: 'syrniki',
    title: { ru: 'Сырники с ягодами и сметаной', en: 'Cottage Cheese Syrniki' },
    description: {
      ru: 'Пышные нежные сырники с румяной корочкой, свежими лесными ягодами и сахарной пудрой.',
      en: 'Tender fluffy cottage cheese pancakes with golden crust, fresh berries and cool sour cream.'
    },
    category: 'breakfast',
    timeMinutes: 20,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Творог 9% (сухой)', en: 'Farmer curd cheese 9%' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Желток куриный', en: 'Egg yolk' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Мука рисовая или пшеничная', en: 'Flour' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Сахар или сахарная пудра', en: 'Sugar' }, amount: '1.5', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Свежие ягоды для подачи', en: 'Fresh berries' }, amount: '80', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Протрите творог вилкой, смешайте с желтком, сахаром, щепоткой соли и мукой.',
          en: 'Mash curd cheese with egg yolk, sugar, pinch of salt and flour until homogeneous.'
        },
      },
      {
        text: {
          ru: 'Сформируйте аккуратные шайбочки с помощью стакана или ножа на присыпанной мукой доске.',
          en: 'Shape into thick round patties using a glass on a floured surface.'
        },
      },
      {
        text: {
          ru: 'Жарьте на небольшом огне на топленом масле по 4 минуты с каждой стороны до золотистости.',
          en: 'Fry over medium-low heat in ghee for 4 minutes per side until golden.'
        },
        timerSeconds: 240,
      },
      {
        text: {
          ru: 'Подавайте со сметаной, свежей малиной и черникой.',
          en: 'Serve hot dusted with powdered sugar, fresh raspberries and blueberries.'
        },
      },
    ],
  },
  {
    id: 'tom_yum',
    title: { ru: 'Том Ям с тигровыми креветками', en: 'Tom Yum Soup with Shrimp' },
    description: {
      ru: 'Остро-кислый тайский суп на кокосовом молоке с креветками, лемонграссом, грибами и лаймом.',
      en: 'Fiery sweet & sour Thai soup with lemongrass, galangal, kaffir lime, mushrooms and tiger shrimp.'
    },
    category: 'soup',
    timeMinutes: 25,
    servings: 2,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Тигровые креветки', en: 'Tiger prawns' }, amount: '350', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Кокосовое молоко', en: 'Coconut milk' }, amount: '250', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Бульон рыбный или куриный', en: 'Broth' }, amount: '500', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Паста Том Ям', en: 'Tom Yum paste' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Грибы шиитаке или вешенки', en: 'Mushrooms' }, amount: '150', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Помидоры черри', en: 'Cherry tomatoes' }, amount: '6', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Лайм и кинза', en: 'Lime and cilantro' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
    ],
    steps: [
      {
        text: {
          ru: 'Доведите бульон до кипения, распустите пасту том ям, добавьте лемонграсс и варите 3 минуты.',
          en: 'Bring broth to a boil, dissolve tom yum paste, add lemongrass, simmer 3 minutes.'
        },
        timerSeconds: 180,
      },
      {
        text: {
          ru: 'Добавьте нарезанные грибы и влейте кокосовое молоко. Варите 5 минут.',
          en: 'Add sliced mushrooms and pour in coconut milk. Simmer for 5 minutes.'
        },
        timerSeconds: 300,
      },
      {
        text: {
          ru: 'Опустите очищенные креветки и половинки черри. Варите ровно 3 минуты.',
          en: 'Add peeled shrimp and cherry tomato halves. Cook for exactly 3 minutes.'
        },
        timerSeconds: 180,
      },
      {
        text: {
          ru: 'Снимите с огня, влейте сок лайма, посыпьте кинзой и подавайте с пиалой жасминового риса.',
          en: 'Remove from heat, squeeze lime juice, top with fresh cilantro, serve with jasmine rice.'
        },
      },
    ],
  },
  {
    id: 'borscht',
    title: { ru: 'Борщ домашний с чесночными пампушками', en: 'Traditional Borscht' },
    description: {
      ru: 'Насыщенный рубиновый суп на мясном бульоне со свеклой, молодой капустой, фасолью и чесноком.',
      en: 'Rich ruby-red beet soup made with tender beef, cabbage, herbs, served with garlic rolls and sour cream.'
    },
    category: 'soup',
    timeMinutes: 70,
    servings: 4,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Говядина на кости', en: 'Beef with bone' }, amount: '500', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Свекла крупная', en: 'Beetroot' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Капуста белокочанная', en: 'Cabbage' }, amount: '300', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Картофель', en: 'Potatoes' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Томатная паста', en: 'Tomato paste' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Чеснок и сало', en: 'Garlic and lard' }, amount: '3', unit: { ru: 'зубчика', en: 'cloves' } },
    ],
    steps: [
      {
        text: {
          ru: 'Сварите прозрачный говяжий бульон на медленном огне (45 минут).',
          en: 'Simmer beef broth over gentle heat skimming foam for 45 minutes.'
        },
        timerSeconds: 2700,
      },
      {
        text: {
          ru: 'Свеклу нарежьте соломкой, потушите с томатной пастой, капелькой уксуса и сахара 15 минут.',
          en: 'Sauté julienned beets with tomato paste, a dash of vinegar and sugar for 15 minutes.'
        },
        timerSeconds: 900,
      },
      {
        text: {
          ru: 'В бульон опустите картофель и капусту, варите 10 минут.',
          en: 'Add diced potatoes and shredded cabbage to the broth, cook 10 minutes.'
        },
        timerSeconds: 600,
      },
      {
        text: {
          ru: 'Добавьте свекольную заправку, пассерованный лук с морковью и варите еще 7 минут.',
          en: 'Add beet mixture and sautéed onion & carrot, simmer for 7 minutes.'
        },
        timerSeconds: 420,
      },
      {
        text: {
          ru: 'В конце заправьте толченым чесноком с салом и зеленью. Дайте настояться 15 минут под крышкой.',
          en: 'Season with crushed garlic, dill and let rest covered for 15 minutes.'
        },
      },
    ],
  },
  {
    id: 'carbonara',
    title: { ru: 'Паста Карбонара классическая', en: 'Classic Pasta Carbonara' },
    description: {
      ru: 'Римская карбонара без сливок: с хрустящим гуанчале/беконом, желтками, пекорино и свежим черным перцем.',
      en: 'Authentic Roman pasta carbonara made with crispy cured pork, egg yolks, pecorino and coarse black pepper.'
    },
    category: 'dinner',
    timeMinutes: 20,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Спагетти', en: 'Spaghetti' }, amount: '250', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Гуанчале или бекон', en: 'Guanciale or bacon' }, amount: '150', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Желтки яичные', en: 'Egg yolks' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Сыр Пекорино или Пармезан', en: 'Pecorino Romano or Parmesan' }, amount: '60', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Черный перец свежемолотый', en: 'Fresh cracked black pepper' }, amount: '1', unit: { ru: 'ч.л.', en: 'tsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'Поставьте вариться спагетти в кипящую подсоленную воду (8-9 минут).',
          en: 'Boil spaghetti in salted water until al dente (9 minutes).'
        },
        timerSeconds: 540,
      },
      {
        text: {
          ru: 'На сухой сковороде медленно обжарьте нарезанный бекон до золотистого хруста (6 минут).',
          en: 'Slowly render bacon in a dry skillet until crisp and golden (6 minutes).'
        },
        timerSeconds: 360,
      },
      {
        text: {
          ru: 'В миске взбейте желтки с тертым сыром и большим количеством черного перца.',
          en: 'Whisk yolks with grated pecorino cheese and plenty of black pepper.'
        },
      },
      {
        text: {
          ru: 'Снимите сковороду с огня. Переложите спагетти к бекону, добавьте 2 ложки воды от пасты и яично-сырную смесь. Быстро перемешайте до шелковистого соуса.',
          en: 'Off heat, combine pasta with bacon, splash of pasta water, and egg mixture. Toss briskly into a silky emulsion.'
        },
      },
    ],
  },
  {
    id: 'teriyaki_chicken',
    title: { ru: 'Курица Терияки с рисом', en: 'Teriyaki Chicken Rice Bowl' },
    description: {
      ru: 'Сочное куриное бедро в карамельном японском соусе терияки с кунжутом, зеленым луком и рисом.',
      en: 'Pan-seared chicken thighs glazed in savory-sweet teriyaki sauce with toasted sesame and scallions.'
    },
    category: 'lunch',
    timeMinutes: 25,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Филе куриного бедра', en: 'Boneless chicken thighs' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Соус терияки', en: 'Teriyaki sauce' }, amount: '4', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Имбирь свежий тертый', en: 'Grated fresh ginger' }, amount: '1', unit: { ru: 'ч.л.', en: 'tsp' } },
      { name: { ru: 'Чеснок', en: 'Garlic' }, amount: '1', unit: { ru: 'зубчик', en: 'clove' } },
      { name: { ru: 'Семена кунжута', en: 'Sesame seeds' }, amount: '1', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Рис жасмин для гарнира', en: 'Jasmine rice' }, amount: '150', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Нарежьте курицу кусочками, обжарьте на сковороде 6 минут до подрумянивания со всех сторон.',
          en: 'Cut chicken into bite-sized pieces, pan-fry for 6 minutes until lightly browned.'
        },
        timerSeconds: 360,
      },
      {
        text: {
          ru: 'Добавьте имбирь и чеснок, обжаривайте еще 1 минуту.',
          en: 'Add grated ginger and garlic, stir fry for 1 minute.'
        },
        timerSeconds: 60,
      },
      {
        text: {
          ru: 'Влейте соус терияки, убавьте огонь и глазируйте курицу 4 минуты до густого блестящего покрытия.',
          en: 'Pour in teriyaki sauce, reduce heat and glaze chicken for 4 minutes until syrupy.'
        },
        timerSeconds: 240,
      },
      {
        text: {
          ru: 'Подавайте на подушке из риса, посыпав кунжутом и колечками зеленого лука.',
          en: 'Serve over warm rice, sprinkled with toasted sesame seeds and sliced green onions.'
        },
      },
    ],
  },
  {
    id: 'blini_cottage',
    title: { ru: 'Блинчики с творожной начинкой', en: 'Crepes with Sweet Cottage Cheese' },
    description: {
      ru: 'Тончайшие кружевные блинчики с ванильным творогом, запеченные в сливочном масле.',
      en: 'Delicate paper-thin crepes filled with vanilla sweetened curd, lightly crisped in butter.'
    },
    category: 'breakfast',
    timeMinutes: 30,
    servings: 2,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Молоко 3.2%', en: 'Milk' }, amount: '500', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Яйца куриные', en: 'Eggs' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Мука', en: 'Flour' }, amount: '180', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Творог 9%', en: 'Cottage cheese' }, amount: '350', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Ванильный сахар', en: 'Vanilla sugar' }, amount: '1', unit: { ru: 'пакетик', en: 'pack' } },
    ],
    steps: [
      {
        text: {
          ru: 'Взбейте молоко с яйцами, сахаром, щепоткой соли и мукой до однородного жидкого теста.',
          en: 'Whisk milk, eggs, sugar, salt and flour into smooth batter. Rest 10 minutes.'
        },
      },
      {
        text: {
          ru: 'Испеките тонкие блинчики на раскаленной сковороде (по 1 минуте с каждой стороны).',
          en: 'Cook thin crepes in a buttered pan (1 minute per side).'
        },
        timerSeconds: 60,
      },
      {
        text: {
          ru: 'Смешайте творог с ванилью и ложкой сметаны. Заверните начинку конвертиком в каждый блинчик.',
          en: 'Mix curd cheese with vanilla and a spoon of sour cream. Roll up into pouches.'
        },
      },
      {
        text: {
          ru: 'Подрумяньте блинчики на сливочном масле по 2 минуты до хруста.',
          en: 'Pan-fry stuffed crepes in butter for 2 minutes on each side until golden crisp.'
        },
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'olivier_salad',
    title: { ru: 'Оливье праздничный', en: 'Classic Olivier Salad' },
    description: {
      ru: 'Любимый салат с отварным языком или колбасой, хрустящими солеными огурчиками и зеленым горошком.',
      en: 'Traditional potato salad with diced vegetables, eggs, pickles, tender meat and creamy mayo.'
    },
    category: 'salad',
    timeMinutes: 30,
    servings: 4,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Картофель отварной', en: 'Boiled potatoes' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Морковь отварная', en: 'Boiled carrots' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Яйца вареные', en: 'Hard-boiled eggs' }, amount: '4', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Мясо или докторская колбаса', en: 'Cooked ham or beef' }, amount: '250', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Соленые или маринованные огурцы', en: 'Pickled cucumbers' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Зеленый горошек', en: 'Sweet canned peas' }, amount: '1', unit: { ru: 'банка', en: 'can' } },
      { name: { ru: 'Майонез провансаль', en: 'Mayonnaise' }, amount: '4', unit: { ru: 'ст.л.', en: 'tbsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'Нарежьте одинаковыми аккуратными кубиками овощи, яйца, мясо и огурцы.',
          en: 'Dice all boiled vegetables, eggs, pickles and meat into uniform small cubes.'
        },
      },
      {
        text: {
          ru: 'Добавьте зеленый горошек, предварительно слив жидкость.',
          en: 'Add drained sweet green peas.'
        },
      },
      {
        text: {
          ru: 'Заправьте майонезом, аккуратно перемешайте и охладите 20 минут в холодильнике.',
          en: 'Dress with mayonnaise, stir gently, and chill for 20 minutes before serving.'
        },
        timerSeconds: 1200,
      },
    ],
  },
  {
    id: 'caesar_chicken',
    title: { ru: 'Салат Цезарь с курицей гриль', en: 'Grilled Chicken Caesar Salad' },
    description: {
      ru: 'Хрустящий романо, сочная куриная грудка, чесночные гренки, пармезан и домашний соус с анчоусами.',
      en: 'Crisp romaine lettuce, grilled chicken breast, garlic brioche croutons, shaved parmesan and caesar dressing.'
    },
    category: 'salad',
    timeMinutes: 20,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Салат Романо', en: 'Romaine lettuce' }, amount: '1', unit: { ru: 'кочан', en: 'head' } },
      { name: { ru: 'Куриное филе', en: 'Chicken breast' }, amount: '300', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Пармезан лепестками', en: 'Shaved parmesan' }, amount: '50', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Багет для гренок', en: 'Baguette for croutons' }, amount: '100', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Соус Цезарь', en: 'Caesar dressing' }, amount: '4', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Помидоры черри', en: 'Cherry tomatoes' }, amount: '8', unit: { ru: 'шт', en: 'pcs' } },
    ],
    steps: [
      {
        text: {
          ru: 'Куриное филе приправьте солью и паприкой. Обжарьте на сковороде-гриль по 5 минут с каждой стороны.',
          en: 'Season chicken breast, grill for 5 minutes per side until juicy and golden.'
        },
        timerSeconds: 300,
      },
      {
        text: {
          ru: 'Нарежьте багет кубиками, подсушите на оливковом масле с чесноком 4 минуты.',
          en: 'Toss diced baguette in olive oil with garlic, bake or pan-toast for 4 minutes.'
        },
        timerSeconds: 240,
      },
      {
        text: {
          ru: 'Порвите листья романо руками, смешайте с половиной соуса.',
          en: 'Tear crisp romaine into a large bowl, toss with half the dressing.'
        },
      },
      {
        text: {
          ru: 'Выложите сверху слайсы теплой курицы, черри, гренки и лепестки пармезана.',
          en: 'Top with sliced warm chicken, cherry tomatoes, croutons and parmesan shavings.'
        },
      },
    ],
  },
  {
    id: 'ratatouille',
    title: { ru: 'Рататуй прованский', en: 'Provençal Ratatouille' },
    description: {
      ru: 'Традиционное запеченное овощное блюдо из цукини, баклажанов, томатов и прованских трав.',
      en: 'French vegetable bake featuring spiraled slices of zucchini, eggplant and tomatoes over roasted pepper sauce.'
    },
    category: 'dinner',
    timeMinutes: 50,
    servings: 3,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Баклажан', en: 'Eggplant' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Цукини или кабачок', en: 'Zucchini' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Помидоры плотные', en: 'Roma tomatoes' }, amount: '4', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Томатный соус с базиликом', en: 'Tomato basil sauce' }, amount: '250', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Прованские травы и оливковое масло', en: 'Herbes de Provence & olive oil' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'На дно круглой формы для запекания вылейте томатный соус с чесноком.',
          en: 'Spread seasoned tomato sauce evenly across bottom of baking dish.'
        },
      },
      {
        text: {
          ru: 'Нарежьте овощи тонкими кружочками одинаковой толщины и уложите по спирали чередуя цвета.',
          en: 'Slice vegetables thinly and arrange in an alternating colorful spiral pattern.'
        },
      },
      {
        text: {
          ru: 'Сбрызните оливковым маслом, посыпьте прованскими травами, накройте пергаментом и запекайте 35 минут при 180°C.',
          en: 'Drizzle with olive oil, sprinkle herbs, cover with parchment and bake at 180°C for 35 minutes.'
        },
        timerSeconds: 2100,
      },
      {
        text: {
          ru: 'Снимите бумагу и запекайте еще 10 минут до легкой румяности.',
          en: 'Remove parchment and roast 10 minutes more until edges lightly brown.'
        },
        timerSeconds: 600,
      },
    ],
  },
  {
    id: 'cheesecake_ny',
    title: { ru: 'Чизкейк Нью-Йорк', en: 'New York Cheesecake' },
    description: {
      ru: 'Шелковистый сливочный чизкейк из крем-чиза на песочной основе со стручком бурбонской ванили.',
      en: 'Dense and velvety cream cheese cake on a golden buttery graham crumb crust.'
    },
    category: 'dessert',
    timeMinutes: 60,
    servings: 6,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Сливочный сыр (Philadelphia)', en: 'Cream cheese' }, amount: '600', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Песочное печенье', en: 'Shortbread cookies' }, amount: '180', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сливочное масло 82%', en: 'Melted butter' }, amount: '80', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сахарная пудра', en: 'Powdered sugar' }, amount: '140', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сливки 33%', en: 'Heavy cream 33%' }, amount: '150', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Яйца куриные', en: 'Eggs' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
    ],
    steps: [
      {
        text: {
          ru: 'Измельчите печенье в крошку, смешайте с растопленным маслом и утрамбуйте на дно формы. Выпекайте 10 минут.',
          en: 'Crush cookies, mix with melted butter, press into pan and pre-bake crust for 10 minutes.'
        },
        timerSeconds: 600,
      },
      {
        text: {
          ru: 'На низкой скорости миксера соедините сливочный сыр с сахарной пудрой, сливками и ванилью.',
          en: 'Mix cream cheese with sugar, heavy cream and vanilla at low speed until smooth.'
        },
      },
      {
        text: {
          ru: 'По одному введите яйца, аккуратно перемешивая лопаткой без взбивания.',
          en: 'Add eggs one at a time, folding gently without whipping excess air.'
        },
      },
      {
        text: {
          ru: 'Выпекайте на водяной бане при 130°C 60 минут, затем оставьте остывать в духовке с приоткрытой дверцей.',
          en: 'Bake in water bath at 130°C for 60 minutes, cool in oven with door ajar.'
        },
        timerSeconds: 3600,
      },
    ],
  },
  {
    id: 'tiramisu',
    title: { ru: 'Тирамису классический', en: 'Classic Italian Tiramisu' },
    description: {
      ru: 'Нежнейший десерт из воздушного маскарпоне, печенья савоярди, пропитанного эспрессо и горького какао.',
      en: 'Italian coffee-flavoured dessert layered with espresso-soaked savoiardi ladyfingers and whipped mascarpone.'
    },
    category: 'dessert',
    timeMinutes: 25,
    servings: 4,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Сыр Маскарпоне', en: 'Mascarpone cheese' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Печенье Савоярди', en: 'Savoiardi ladyfingers' }, amount: '200', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Свежесваренный эспрессо', en: 'Brewed strong espresso' }, amount: '250', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Яичные желтки', en: 'Egg yolks' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Сахарная пудра', en: 'Powdered sugar' }, amount: '80', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Какао-порошок', en: 'Cocoa powder' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'Взбейте желтки с сахарной пудрой до пышного светлого крема, затем добавьте маскарпоне.',
          en: 'Beat egg yolks with powdered sugar until pale, then gently fold in mascarpone.'
        },
      },
      {
        text: {
          ru: 'Быстро обмакивайте палочки савоярди в остывший кофе и выкладывайте первым слоем в форму.',
          en: 'Quickly dip ladyfingers into cooled espresso and lay down the first layer.'
        },
      },
      {
        text: {
          ru: 'Покройте кремом из маскарпоне, повторите слой печенья и завершите кремом.',
          en: 'Spread half the cream, add another layer of soaked cookies, top with remaining cream.'
        },
      },
      {
        text: {
          ru: 'Посыпьте просеянным какао через сито и уберите в холод минимум на 2 часа.',
          en: 'Dust generously with cocoa powder and chill for at least 2 hours.'
        },
      },
    ],
  },
  {
    id: 'lohikeitto',
    title: { ru: 'Уха по-фински со сливками (Лохикейто)', en: 'Creamy Salmon Soup (Lohikeitto)' },
    description: {
      ru: 'Бархатный скандинавский суп из лосося, молодого картофеля, порея и жирных сливок с укропом.',
      en: 'Comforting Nordic salmon soup with tender fish chunks, leeks, potatoes and heavy cream.'
    },
    category: 'soup',
    timeMinutes: 30,
    servings: 3,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Филе лосося/форели', en: 'Salmon fillet' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Картофель', en: 'Potatoes' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Лук-порей', en: 'Leek' }, amount: '1', unit: { ru: 'стебель', en: 'stalk' } },
      { name: { ru: 'Сливки 20-33%', en: 'Heavy cream 20%' }, amount: '200', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Рыбный бульон или вода', en: 'Fish stock or water' }, amount: '800', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Свежий укроп', en: 'Fresh dill' }, amount: '30', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Слегка спассеруйте нарезанный кольцами лук-порей на сливочном масле прямо в кастрюле 4 минуты.',
          en: 'Sauté sliced leek in butter directly in soup pot for 4 minutes.'
        },
        timerSeconds: 240,
      },
      {
        text: {
          ru: 'Влейте бульон, добавьте нарезанный кубиками картофель и варите 12 минут до готовности.',
          en: 'Pour in broth, add cubed potatoes and simmer for 12 minutes until tender.'
        },
        timerSeconds: 720,
      },
      {
        text: {
          ru: 'Опустите кусочки лосося, влейте сливки, посолите и варите 5 минут.',
          en: 'Add cubed salmon, pour in cream, season with salt and white pepper, simmer 5 minutes.'
        },
        timerSeconds: 300,
      },
      {
        text: {
          ru: 'Добавьте много свежего укропа, снимите с огня и дайте постоять 5 минут.',
          en: 'Stir in plenty of freshly chopped dill, remove from heat and let stand 5 minutes.'
        },
      },
    ],
  },
  {
    id: 'lasagna',
    title: { ru: 'Лазанья с соусом бешамель', en: 'Lasagna Bolognese' },
    description: {
      ru: 'Многослойная итальянская запеканка с мясным рагу, нежнейшим бешамелем и корочкой моцареллы.',
      en: 'Layers of tender pasta sheets, rich bolognese ragù, silky béchamel and bubbling golden mozzarella.'
    },
    category: 'dinner',
    timeMinutes: 55,
    servings: 4,
    difficulty: 'hard',
    photoUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Листы для лазаньи', en: 'Lasagna pasta sheets' }, amount: '12', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Мясной фарш говядина/свинина', en: 'Minced beef/pork' }, amount: '500', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Томаты в собственном соку', en: 'Canned tomatoes' }, amount: '400', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Молоко для бешамеля', en: 'Milk for béchamel' }, amount: '600', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Мука и сливочное масло', en: 'Flour and butter' }, amount: '40', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сыр моцарелла и пармезан', en: 'Mozzarella & parmesan' }, amount: '200', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Приготовьте соус болоньезе: обжарьте фарш с луком, томатами и травами 15 минут.',
          en: 'Cook meat sauce: brown minced beef with onion, herbs and tomatoes for 15 minutes.'
        },
        timerSeconds: 900,
      },
      {
        text: {
          ru: 'Приготовьте бешамель: обжарьте муку в масле, тонкой струйкой влейте молоко, варите до загустения с мускатным орехом.',
          en: 'Make béchamel: cook butter and flour, whisk in milk until silky and thick with nutmeg.'
        },
      },
      {
        text: {
          ru: 'Соберите лазанью в форме: слой бешамеля, листы пасты, мясной соус, сыр. Повторите 4 раза.',
          en: 'Layer in baking dish: béchamel, pasta sheet, bolognese, cheese. Repeat 4 times.'
        },
      },
      {
        text: {
          ru: 'Запекайте в духовке 30 минут при 190°C до аппетитной золотистой корочки.',
          en: 'Bake at 190°C for 30 minutes until bubbling and crusty golden.'
        },
        timerSeconds: 1800,
      },
    ],
  },
  {
    id: 'garlic_shrimp_pasta',
    title: { ru: 'Паста с креветками в сливочном соусе', en: 'Creamy Garlic Shrimp Pasta' },
    description: {
      ru: 'Феттуччине с королевскими креветками, чесноком, белым вином, шпинатом и густыми сливками.',
      en: 'Fettuccine ribbons tossed with succulent garlic shrimp, white wine, baby spinach and creamy parmesan.'
    },
    category: 'dinner',
    timeMinutes: 20,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Паста феттуччине', en: 'Fettuccine pasta' }, amount: '250', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Креветки очищенные', en: 'Peeled king prawns' }, amount: '350', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сливки 20%', en: 'Light cream' }, amount: '200', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Чеснок', en: 'Garlic' }, amount: '3', unit: { ru: 'зубчика', en: 'cloves' } },
      { name: { ru: 'Свежий шпинат', en: 'Baby spinach' }, amount: '80', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Пармезан', en: 'Parmesan' }, amount: '40', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Отварите феттуччине в кипящей воде до состояния al dente (8 минут).',
          en: 'Boil fettuccine until al dente (8 minutes).'
        },
        timerSeconds: 480,
      },
      {
        text: {
          ru: 'Обжарьте креветки с измельченным чесноком на оливковом масле по 1.5 минуты с каждой стороны.',
          en: 'Sear shrimp with minced garlic in olive oil for 1.5 minutes per side.'
        },
        timerSeconds: 180,
      },
      {
        text: {
          ru: 'Влейте сливки, добавьте шпинат и пармезан, прогрейте 2 минуты до увядания шпината.',
          en: 'Pour in cream, add spinach and parmesan, simmer 2 minutes until spinach wilts.'
        },
        timerSeconds: 120,
      },
      {
        text: {
          ru: 'Соедините пасту с соусом и креветками, перемешайте и подавайте.',
          en: 'Toss pasta with sauce and shrimp, season with fresh black pepper and serve.'
        },
      },
    ],
  },
  {
    id: 'hungarian_goulash',
    title: { ru: 'Венгерский гуляш', en: 'Hungarian Goulash' },
    description: {
      ru: 'Пряное густое мясное рагу с паприкой, сладким перцем, картофелем и тмином.',
      en: 'Traditional Hungarian beef stew rich with sweet paprika, caraway seeds, potatoes and tender meat.'
    },
    category: 'lunch',
    timeMinutes: 55,
    servings: 3,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Говяжья лопатка', en: 'Beef chuck' }, amount: '500', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Лук репчатый', en: 'Onions' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Паприка сладкая венгерская', en: 'Sweet Hungarian paprika' }, amount: '2', unit: { ru: 'ст.л.', en: 'tbsp' } },
      { name: { ru: 'Картофель', en: 'Potatoes' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Перец сладкий', en: 'Bell pepper' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
    ],
    steps: [
      {
        text: {
          ru: 'Нарежьте мясо кубиками 3 см, лук нашинкуйте.',
          en: 'Cut beef into 3cm cubes, finely dice onions.'
        },
      },
      {
        text: {
          ru: 'Обжарьте лук до мягкости, снимите с огня, всыпьте паприку и перемешайте.',
          en: 'Sauté onions, remove from heat, stir in paprika powder.'
        },
      },
      {
        text: {
          ru: 'Добавьте мясо, верните на огонь, влейте стакан воды и тушите под крышкой 40 минут.',
          en: 'Add meat, water to cover, simmer covered on low for 40 minutes.'
        },
        timerSeconds: 2400,
      },
      {
        text: {
          ru: 'Добавьте картофель и перец, варите еще 15 минут до мягкости овощей.',
          en: 'Add cubed potatoes and bell pepper, simmer 15 minutes more until tender.'
        },
        timerSeconds: 900,
      },
    ],
  },
  {
    id: 'salmon_steak',
    title: { ru: 'Стейк из лосося с овощами гриль', en: 'Grilled Salmon with Vegetables' },
    description: {
      ru: 'Нежное филе лосося с румяной корочкой, лимонным тимьяном, спаржей и сладким перцем.',
      en: 'Pan-seared salmon steak with crispy skin, lemon-thyme butter, tender asparagus and grilled peppers.'
    },
    category: 'dinner',
    timeMinutes: 18,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Стейк или филе лосося', en: 'Salmon steaks' }, amount: '2', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Спаржа зеленая', en: 'Fresh asparagus' }, amount: '200', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Лимон', en: 'Lemon' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
      { name: { ru: 'Сливочное масло', en: 'Butter' }, amount: '25', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Оливковое масло и розмарин', en: 'Olive oil and rosemary' }, amount: '1', unit: { ru: 'ст.л.', en: 'tbsp' } },
    ],
    steps: [
      {
        text: {
          ru: 'Промокните стейки салфеткой, посолите, поперчите и смажьте оливковым маслом.',
          en: 'Pat salmon dry, season with sea salt, cracked black pepper and olive oil.'
        },
      },
      {
        text: {
          ru: 'Обжарьте лосось на раскаленной сковороде кожей вниз 4 минуты, затем переверните и жарьте еще 3 минуты со сливочным маслом и лимоном.',
          en: 'Sear skin-side down for 4 minutes, flip and cook 3 minutes with butter and lemon.'
        },
        timerSeconds: 420,
      },
      {
        text: {
          ru: 'Рядом на сковороде быстро обжарьте спаржу 4 минуты.',
          en: 'Sauté asparagus alongside the salmon for 4 minutes until crisp-tender.'
        },
        timerSeconds: 240,
      },
      {
        text: {
          ru: 'Подавайте сразу, полив ароматным соком из сковороды.',
          en: 'Plate immediately with fresh lemon wedges and pan juices.'
        },
      },
    ],
  },
  {
    id: 'oatmeal_berries',
    title: { ru: 'Овсяная каша с ягодами и миндалем', en: 'Oatmeal with Berries & Almonds' },
    description: {
      ru: 'Кремовая овсянка на кокосовом или обычном молоке с медом, свежей клубникой и лепестками миндаля.',
      en: 'Warm creamy porridge topped with honey, fresh strawberries, blueberries and toasted almonds.'
    },
    category: 'breakfast',
    timeMinutes: 12,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Овсяные хлопья долгой варки', en: 'Rolled oats' }, amount: '100', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Молоко', en: 'Milk' }, amount: '350', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Мед натуральный', en: 'Honey' }, amount: '2', unit: { ru: 'ч.л.', en: 'tsp' } },
      { name: { ru: 'Свежие ягоды', en: 'Mixed fresh berries' }, amount: '100', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Миндальные лепестки', en: 'Flaked almonds' }, amount: '20', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Всыпьте хлопья в кипящее молоко со щепоткой соли, варите на слабом огне 7 минут, помешивая.',
          en: 'Add oats to simmering milk with pinch of salt, cook gently for 7 minutes, stirring.'
        },
        timerSeconds: 420,
      },
      {
        text: {
          ru: 'Снимите с огня, накройте крышкой на 2 минуты для мягкости.',
          en: 'Cover and let steam off heat for 2 minutes.'
        },
        timerSeconds: 120,
      },
      {
        text: {
          ru: 'Разложите по глубоким тарелкам, украсьте ягодами, полейте медом и посыпьте миндалем.',
          en: 'Spoon into bowls, arrange fresh berries, drizzle with honey and sprinkle almonds.'
        },
      },
    ],
  },
  {
    id: 'pumpkin_soup',
    title: { ru: 'Тыквенный крем-суп с семечками', en: 'Pumpkin Cream Soup' },
    description: {
      ru: 'Бархатистый согревающий суп из запеченной мускатной тыквы со сливками, имбирем и хрустящими семечками.',
      en: 'Velvety roasted butternut squash soup with cream, hint of ginger and toasted pumpkin seeds.'
    },
    category: 'soup',
    timeMinutes: 30,
    servings: 3,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Тыква мускатная', en: 'Butternut squash' }, amount: '600', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сливки 20%', en: 'Cooking cream' }, amount: '150', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Овощной бульон', en: 'Vegetable broth' }, amount: '400', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Корень имбиря', en: 'Fresh ginger' }, amount: '1', unit: { ru: 'ч.л.', en: 'tsp' } },
      { name: { ru: 'Тыквенные семечки', en: 'Pumpkin seeds' }, amount: '30', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Нарежьте тыкву кубиками, отварите в бульоне с имбирем 15 минут до полной мягкости.',
          en: 'Boil cubed squash with ginger in broth for 15 minutes until very soft.'
        },
        timerSeconds: 900,
      },
      {
        text: {
          ru: 'Пюрируйте погружным блендером до гладкой шелковистой текстуры.',
          en: 'Puree with immersion blender until silky smooth.'
        },
      },
      {
        text: {
          ru: 'Влейте горячие сливки, посолите, добавьте мускатный орех и доведите до легкого кипения.',
          en: 'Pour in warm cream, season with salt and nutmeg, heat through.'
        },
      },
      {
        text: {
          ru: 'Подавайте с подсушенными на сухой сковороде тыквенными семечками.',
          en: 'Garnish with toasted pumpkin seeds and a swirl of cream.'
        },
      },
    ],
  },
  {
    id: 'julienne',
    title: { ru: 'Сливочный жульен с курицей и грибами', en: 'Chicken & Mushroom Julienne' },
    description: {
      ru: 'Запеченные в кокотницах грибы и нежная курица под шапкой из расплавленного сыра.',
      en: 'Tender chicken and mushrooms baked in a rich cream sauce under a bubbling melted cheese crust.'
    },
    category: 'lunch',
    timeMinutes: 25,
    servings: 2,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Куриное филе', en: 'Chicken breast' }, amount: '250', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Шампиньоны', en: 'Mushrooms' }, amount: '200', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сливки 20%', en: 'Heavy cream' }, amount: '150', unit: { ru: 'мл', en: 'ml' } },
      { name: { ru: 'Сыр твердый', en: 'Gruyère or Gouda cheese' }, amount: '100', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Лук репчатый', en: 'Onion' }, amount: '1', unit: { ru: 'шт', en: 'pc' } },
    ],
    steps: [
      {
        text: {
          ru: 'Обжарьте мелко нарезанное филе, лук и грибы на сливочном масле 7 минут.',
          en: 'Sauté chopped chicken, onion, and mushrooms in butter for 7 minutes.'
        },
        timerSeconds: 420,
      },
      {
        text: {
          ru: 'Влейте сливки со щепоткой муки, тушите 3 минуты до загустения соуса.',
          en: 'Pour in cream dusted with flour, simmer 3 minutes until thickened.'
        },
        timerSeconds: 180,
      },
      {
        text: {
          ru: 'Разложите по порционным кокотницам, щедро посыпьте тертым сыром.',
          en: 'Divide into ramekins and top with a thick layer of grated cheese.'
        },
      },
      {
        text: {
          ru: 'Запекайте в духовке 10 минут при 200°C до подрумянивания сыра.',
          en: 'Bake at 200°C for 10 minutes until cheese is bubbly and golden.'
        },
        timerSeconds: 600,
      },
    ],
  },
  {
    id: 'pho_bo',
    title: { ru: 'Вьетнамский Фо-бо с говядиной', en: 'Vietnamese Pho Bo' },
    description: {
      ru: 'Ароматный пряный вьетнамский суп на говяжьем бульоне с рисовой лапшой, бадьяном, корицей и свежей зеленью.',
      en: 'Fragrant Vietnamese beef noodle soup infused with star anise, cinnamon, ginger, herbs and lime.'
    },
    category: 'soup',
    timeMinutes: 40,
    servings: 2,
    difficulty: 'medium',
    photoUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Говяжий бульон крепкий', en: 'Rich beef broth' }, amount: '1', unit: { ru: 'л', en: 'L' } },
      { name: { ru: 'Рисовая лапша фо', en: 'Flat rice noodles' }, amount: '150', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Тонко нарезанная говядина', en: 'Thinly sliced beef sirloin' }, amount: '200', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Бадьян и корица', en: 'Star anise & cinnamon' }, amount: '2', unit: { ru: 'звездочки', en: 'stars' } },
      { name: { ru: 'Ростки сои, лайм, мята', en: 'Bean sprouts, lime, herbs' }, amount: '100', unit: { ru: 'г', en: 'g' } },
    ],
    steps: [
      {
        text: {
          ru: 'Прогрейте специи на сухой сковороде, добавьте в кипящий бульон с рыбным соусом, варите 15 минут.',
          en: 'Toast spices in a dry pot, add to broth with fish sauce, simmer 15 minutes.'
        },
        timerSeconds: 900,
      },
      {
        text: {
          ru: 'Отдельно заварите рисовую лапшу горячей водой на 5 минут, слейте воду.',
          en: 'Soak rice noodles in boiling water for 5 minutes, then drain.'
        },
        timerSeconds: 300,
      },
      {
        text: {
          ru: 'В глубокие чаши выложите лапшу, сырые тонкие ломтики говядины и залейте кипящим бульоном.',
          en: 'Place noodles and raw sliced beef in bowls, pour over scalding boiling broth to cook the meat.'
        },
      },
      {
        text: {
          ru: 'Подавайте с ростками сои, перцем чили, лаймом и мятой.',
          en: 'Serve garnished with fresh bean sprouts, chili, lime wedges and mint.'
        },
      },
    ],
  },
  {
    id: 'brownie',
    title: { ru: 'Шоколадный брауни с соленой карамелью', en: 'Fudgy Brownie with Salted Caramel' },
    description: {
      ru: 'Тягучий влажный брауни из темного бельгийского шоколада с хрустящей корочкой и соленой карамелью.',
      en: 'Fudgy dark chocolate brownies with a crackly top, gooey center and salted caramel drizzle.'
    },
    category: 'dessert',
    timeMinutes: 35,
    servings: 6,
    difficulty: 'easy',
    photoUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: { ru: 'Темный шоколад 70%', en: 'Dark chocolate 70%' }, amount: '200', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сливочное масло', en: 'Butter' }, amount: '120', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Сахар', en: 'Sugar' }, amount: '150', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Яйца куриные', en: 'Eggs' }, amount: '3', unit: { ru: 'шт', en: 'pcs' } },
      { name: { ru: 'Мука пшеничная', en: 'Flour' }, amount: '80', unit: { ru: 'г', en: 'g' } },
      { name: { ru: 'Морская соль в хлопьях', en: 'Flaky sea salt' }, amount: '1', unit: { ru: 'щепотка', en: 'pinch' } },
    ],
    steps: [
      {
        text: {
          ru: 'Растопите шоколад со сливочным маслом на водяной бане или в микроволновке.',
          en: 'Melt chocolate and butter together until silky smooth.'
        },
      },
      {
        text: {
          ru: 'Взбейте яйца с сахаром 3 минуты до светлой пены.',
          en: 'Whip eggs and sugar for 3 minutes until thick and pale.'
        },
        timerSeconds: 180,
      },
      {
        text: {
          ru: 'Соедините шоколадную массу со взбитыми яйцами, аккуратно вмесите муку.',
          en: 'Fold chocolate mixture into eggs, then gently sift in flour.'
        },
      },
      {
        text: {
          ru: 'Вылейте в застеленную форму и выпекайте при 175°C ровно 22 минуты (серединка должна остаться влажной!).',
          en: 'Pour into parchment-lined pan, bake at 175°C for 22 minutes (keep center fudgy).'
        },
        timerSeconds: 1320,
      },
      {
        text: {
          ru: 'Посыпьте крупной морской солью перед нарезкой на квадраты.',
          en: 'Sprinkle with flaky sea salt before slicing.'
        },
      },
    ],
  },
];
