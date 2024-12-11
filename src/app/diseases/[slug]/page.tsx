import { notFound } from 'next/navigation';

interface Symptom {
  id: number;
  name: string;
  description?: string;
}

interface Disease {
  id: number;
  name: string;
  slug: string;
  author: {
    name: string;
    avatar?: string;
  };
  shortDescription: string;
  content: string;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  image?: string;
  symptoms: Symptom[];
  updatedAt: string;
}

const diseases: Disease[] = [
  {
    id: 1,
    name: 'Allergiya',
    slug: 'allergiya',
    author: {
      name: 'Dr. Aziz Aliev',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    shortDescription: 'Allergiya - bu immunitetning ortiqcha reaktsiyasi bo\'lib, u turli xil allergenlarga nisbatan tananing himoya tizimi tomonidan yuzaga keladi.',
    content: `
      <h1>Allergiya haqida</h1>
      <p>Allergiya - bu immunitetning ortiqcha reaktsiyasi bo'lib, u turli xil allergenlarga nisbatan tananing himoya tizimi tomonidan yuzaga keladi. Bu kasallik turli yoshdagi odamlarda uchraydi va hayot sifatiga sezilarli ta'sir ko'rsatishi mumkin.</p>
      <h2>Allergiya turlari</h2>
      <h3>1. Mavsumiy allergiya</h3>
      <p>Chang, gul changi va boshqa mavsumiy allergenlarga nisbatan rivojlanadigan allergiya turi.</p>
      <h3>2. Oziq-ovqat allergiyasi</h3>
      <p>Turli oziq-ovqat mahsulotlariga nisbatan rivojlanadigan allergiya.</p>
      <h3>3. Dori allergiyasi</h3>
      <p>Ba'zi dori vositalariga nisbatan rivojlanadigan allergik reaktsiyalar.</p>
      <h2>Allergiya sabablari</h2>
      <ul>
        <li>Genetik moyillik</li>
        <li>Atrof-muhit omillari</li>
        <li>Immunitet tizimining o'zgarishi</li>
        <li>Stress va hayot tarzi</li>
      </ul>
      <h2>Davolanish usullari</h2>
      <ol>
        <li>Allergik omillardan saqlanish</li>
        <li>Antihistamin preparatlar</li>
        <li>Immunoterapiya</li>
        <li>Kortikosteroidlar</li>
      </ol>
      <h2>Asoratlar</h2>
      <p>Davolanmagan allergiya quyidagi asoratlarga olib kelishi mumkin:</p>
      <ul>
        <li>Astma</li>
        <li>Sinusit</li>
        <li>Teri kasalliklari</li>
      </ul>
      <h2>Shoshilinch yordam</h2>
      <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
        <p class="font-semibold text-yellow-800">Quyidagi hollarda zudlik bilan shifokorga murojaat qiling:</p>
        <ul class="mt-2 space-y-1 text-yellow-700">
          <li>Nafas olish qiyinlashganda</li>
          <li>Yurak urishi tezlashganda</li>
          <li>Bosh aylanishi kuzatilganda</li>
        </ul>
      </div>
      <h2>Hayot tarzi tavsiyanomasi</h2>
      <ol>
        <li>Allergenlardan saqlanish</li>
        <li>Muntazam sport bilan shug'ullanish</li>
        <li>To'g'ri ovqatlanish</li>
        <li>Stress darajasini kamaytirish</li>
      </ol>
    `,
    tags: [
      { id: 1, name: 'Allergiya', slug: 'allergiya' },
      { id: 2, name: 'Immunitet', slug: 'immunitet' },
      { id: 3, name: 'Teri', slug: 'teri' }
    ],
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=800&fit=crop',
    symptoms: [
      {
        id: 1,
        name: 'Teri qichishi',
        description: 'Terining turli qismlarida qichish va qizarish'
      },
      {
        id: 2,
        name: 'Aksirish',
        description: 'Tez-tez aksirish va burun bitishi'
      },
      {
        id: 3,
        name: "Ko'z yoshlanishi",
        description: "Ko'zlarning qizarishi va yoshlanishi"
      }
    ],
    updatedAt: '2024-12-11'
  },
  {
    id: 2,
    name: 'Bronxit',
    slug: 'bronxit',
    author: {
      name: 'Dr. Malika Karimova',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    shortDescription: 'Bronxit - bronxlar shilliq qavatining yallig\'lanishi bilan kechadigan kasallik.',
    content: `
      <h1>Bronxit haqida</h1>
      <p>Bronxit - bronxlar shilliq qavatining yallig'lanishi bilan kechadigan kasallik. Bu kasallik o'tkir va surunkali ko'rinishda bo'lishi mumkin.</p>
      <h2>Bronxit turlari</h2>
      <h3>1. O'tkir bronxit</h3>
      <p>Asosan viruslar va bakteriyalar ta'sirida rivojlanadi va 2-3 hafta davom etadi.</p>
      <h3>2. Surunkali bronxit</h3>
      <p>Uzoq muddat davom etuvchi, davriy zo'rayishlar bilan kechadigan kasallik.</p>
      <h2>Kasallik sabablari</h2>
      <ul>
        <li>Viruslar va bakteriyalar</li>
        <li>Chekish</li>
        <li>Havoning ifloslanishi</li>
        <li>Allergik omillar</li>
      </ul>
      <h2>Asosiy belgilari</h2>
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 my-4">
        <ul class="space-y-2">
          <li>Yo'tal (quruq yoki balg'amli)</li>
          <li>Ko'krak qafasida og'riq</li>
          <li>Nafas olishning qiyinlashuvi</li>
          <li>Holsizlik</li>
          <li>Tana haroratining ko'tarilishi</li>
        </ul>
      </div>
      <h2>Davolanish usullari</h2>
      <ol>
        <li>Balg'am ko'chiruvchi dorilar</li>
        <li>Bronxlarni kengaytiruvchi preparatlar</li>
        <li>Yallig'lanishga qarshi vositalar</li>
        <li>Fizioterapiya muolajalari</li>
      </ol>
      <h2>Oldini olish choralari</h2>
      <ul>
        <li>Chekishni tashlash</li>
        <li>Toza havoda sayr qilish</li>
        <li>Muntazam jismoniy mashqlar</li>
        <li>Immunitetni mustahkamlash</li>
      </ul>
      <div class="bg-red-50 p-4 rounded-lg border border-red-200 my-4">
        <p class="font-semibold text-red-800">Muhim eslatma:</p>
        <p class="mt-2 text-red-700">Agar yo'tal 3 haftadan ortiq davom etsa, albatta shifokorga murojaat qiling.</p>
      </div>
    `,
    tags: [
      { id: 4, name: 'Nafas olish', slug: 'nafas-olish' },
      { id: 5, name: "O'pka", slug: 'opka' }
    ],
    image: 'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=1200&h=800&fit=crop',
    symptoms: [
      {
        id: 4,
        name: "Yo'tal",
        description: "Quruq yoki balg'am bilan yo'tal"
      },
      {
        id: 5,
        name: 'Hansirash',
        description: 'Jismoniy faollik paytida nafas olishning qiyinlashuvi'
      },
      {
        id: 6,
        name: 'Holsizlik',
        description: 'Umumiy holsizlik va charchoq'
      }
    ],
    updatedAt: '2024-12-10'
  },
  {
    id: 3,
    name: 'Gastrit',
    slug: 'gastrit',
    author: {
      name: 'Dr. Jamshid Rahimov',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    shortDescription: 'Gastrit - oshqozon shilliq qavatining yallig\'lanishi bilan kechadigan kasallik.',
    content: `
      <h1>Gastrit haqida</h1>
      <p>Gastrit - oshqozon shilliq qavatining yallig'lanishi bilan kechadigan kasallik. Bu kasallik o'tkir va surunkali ko'rinishda kechishi mumkin.</p>
      <h2>Gastrit turlari</h2>
      <h3>1. O'tkir gastrit</h3>
      <p>Qisqa muddatli, lekin kuchli belgilar bilan namoyon bo'luvchi yallig'lanish.</p>
      <h3>2. Surunkali gastrit</h3>
      <p>Uzoq muddat davom etuvchi, davriy zo'rayishlar bilan kechadigan kasallik.</p>
      <h2>Kasallik sabablari</h2>
      <ul>
        <li>Helicobacter pylori bakteriyasi</li>
        <li>Noto'g'ri ovqatlanish</li>
        <li>Stress</li>
        <li>Dori vositalari (masalan, NSAIDlar)</li>
        <li>Alkogol</li>
      </ul>
      <h2>Asosiy belgilari</h2>
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 my-4">
        <ul class="space-y-2">
          <li>Oshqozon sohasidagi og'riq</li>
          <li>Ko'ngil aynishi</li>
          <li>Qorin dam bo'lishi</li>
          <li>Ishtaha yo'qolishi</li>
          <li>Tez to'yish hissi</li>
        </ul>
      </div>
      <h2>Davolanish usullari</h2>
      <ol>
        <li>Parhez</li>
        <li>Antibakterial terapiya (H. pylori mavjud bo'lsa)</li>
        <li>Kislota ishlab chiqarishni kamaytiruvchi dorilar</li>
        <li>Oshqozon shilliq qavatini himoyalovchi preparatlar</li>
      </ol>
      <h2>Parhez tavsiyalari</h2>
      <div class="bg-green-50 p-4 rounded-lg border border-green-200 my-4">
        <p class="font-semibold text-green-800">Tavsiya etiladigan:</p>
        <ul class="mt-2 space-y-1 text-green-700">
          <li>Bug'da pishirilgan taomlar</li>
          <li>Qaynatilgan sabzavotlar</li>
          <li>Yog'siz go'sht</li>
          <li>Sutli mahsulotlar</li>
        </ul>
        <p class="font-semibold text-red-800 mt-4">Taqiqlanadigan:</p>
        <ul class="mt-2 space-y-1 text-red-700">
          <li>Achchiq va nordon taomlar</li>
          <li>Qovurilgan taomlar</li>
          <li>Gazli ichimliklar</li>
          <li>Alkogol</li>
        </ul>
      </div>
      <h2>Oldini olish choralari</h2>
      <ul>
        <li>To'g'ri ovqatlanish</li>
        <li>Stress darajasini kamaytirish</li>
        <li>Muntazam ovqatlanish</li>
        <li>Zararli odatlardan voz kechish</li>
      </ul>
      <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
        <p class="font-semibold text-yellow-800">Eslatma:</p>
        <p class="mt-2 text-yellow-700">Agar belgilar 2 haftadan ortiq davom etsa yoki kuchayib borsa, albatta shifokorga murojaat qiling.</p>
      </div>
    `,
    tags: [
      { id: 6, name: 'Oshqozon', slug: 'oshqozon' },
      { id: 7, name: 'Ovqat hazm qilish', slug: 'ovqat-hazm-qilish' }
    ],
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&h=800&fit=crop',
    symptoms: [
      {
        id: 7,
        name: 'Oshqozon og\'rig\'i',
        description: 'Ovqatlanishdan keyin yoki och qoringa og\'riq'
      },
      {
        id: 8,
        name: 'Ko\'ngil aynish',
        description: 'Ko\'ngil aynishi va qayt qilish'
      },
      {
        id: 9,
        name: 'Ishtaha yo\'qolishi',
        description: 'Ovqat yeyishga ishtahaning pasayishi'
      }
    ],
    updatedAt: '2024-12-09'
  },
  {
    id: 4,
    name: 'Rinit',
    slug: 'rinit',
    author: {
      name: 'Dr. Aziz Aliev',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    shortDescription: 'Rinit - burun shilliq qavatining yallig\'lanishi bilan kechadigan kasallik.',
    content: `
      <h1>Rinit haqida</h1>
      <p>Rinit - burun shilliq qavatining yallig'lanishi bilan kechadigan kasallik. Bu kasallik o'tkir va surunkali ko'rinishda kechishi mumkin.</p>
      <h2>Rinit turlari</h2>
      <h3>1. O'tkir rinit</h3>
      <p>Qisqa muddatli, lekin kuchli belgilar bilan namoyon bo'luvchi yallig'lanish.</p>
      <h3>2. Surunkali rinit</h3>
      <p>Uzoq muddat davom etuvchi, davriy zo'rayishlar bilan kechadigan kasallik.</p>
      <h2>Kasallik sabablari</h2>
      <ul>
        <li>Helicobacter pylori bakteriyasi</li>
        <li>Noto'g'ri ovqatlanish</li>
        <li>Stress</li>
        <li>Dori vositalari (masalan, NSAIDlar)</li>
        <li>Alkogol</li>
      </ul>
      <h2>Asosiy belgilari</h2>
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 my-4">
        <ul class="space-y-2">
          <li>Burun sohasidagi og'riq</li>
          <li>Burun bitishi</li>
          <li>Aksirish</li>
          <li>Ishtaha yo'qolishi</li>
          <li>Tez to'yish hissi</li>
        </ul>
      </div>
      <h2>Davolanish usullari</h2>
      <ol>
        <li>Parhez</li>
        <li>Antibakterial terapiya (H. pylori mavjud bo'lsa)</li>
        <li>Kislota ishlab chiqarishni kamaytiruvchi dorilar</li>
        <li>Burun shilliq qavatini himoyalovchi preparatlar</li>
      </ol>
      <h2>Parhez tavsiyalari</h2>
      <div class="bg-green-50 p-4 rounded-lg border border-green-200 my-4">
        <p class="font-semibold text-green-800">Tavsiya etiladigan:</p>
        <ul class="mt-2 space-y-1 text-green-700">
          <li>Bug'da pishirilgan taomlar</li>
          <li>Qaynatilgan sabzavotlar</li>
          <li>Yog'siz go'sht</li>
          <li>Sutli mahsulotlar</li>
        </ul>
        <p class="font-semibold text-red-800 mt-4">Taqiqlanadigan:</p>
        <ul class="mt-2 space-y-1 text-red-700">
          <li>Achchiq va nordon taomlar</li>
          <li>Qovurilgan taomlar</li>
          <li>Gazli ichimliklar</li>
          <li>Alkogol</li>
        </ul>
      </div>
      <h2>Oldini olish choralari</h2>
      <ul>
        <li>To'g'ri ovqatlanish</li>
        <li>Stress darajasini kamaytirish</li>
        <li>Muntazam ovqatlanish</li>
        <li>Zararli odatlardan voz kechish</li>
      </ul>
      <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
        <p class="font-semibold text-yellow-800">Eslatma:</p>
        <p class="mt-2 text-yellow-700">Agar belgilar 2 haftadan ortiq davom etsa yoki kuchayib borsa, albatta shifokorga murojaat qiling.</p>
      </div>
    `,
    tags: [
      { id: 1, name: 'Allergiya', slug: 'allergiya' },
      { id: 4, name: 'Nafas olish', slug: 'nafas-olish' },
      { id: 8, name: 'Burun', slug: 'burun' }
    ],
    image: 'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=1200&h=800&fit=crop',
    symptoms: [
      {
        id: 11,
        name: 'Burun bitishi',
        description: 'Burundan nafas olishning qiyinlashuvi'
      },
      {
        id: 12,
        name: 'Aksirish',
        description: 'Tez-tez aksirish'
      }
    ],
    updatedAt: '2023-12-10'
  },
  {
    id: 5,
    name: 'Astma',
    slug: 'astma',
    author: {
      name: 'Dr. Malika Karimova',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    shortDescription: 'Astma - nafas yo\'llarining surunkali yallig\'lanishi bilan kechadigan kasallik.',
    content: `
      <h1>Astma haqida</h1>
      <p>Astma - nafas yo'llarining surunkali yallig'lanishi bilan kechadigan kasallik. Bu kasallik o'tkir va surunkali ko'rinishda kechishi mumkin.</p>
      <h2>Astma turlari</h2>
      <h3>1. O'tkir astma</h3>
      <p>Qisqa muddatli, lekin kuchli belgilar bilan namoyon bo'luvchi yallig'lanish.</p>
      <h3>2. Surunkali astma</h3>
      <p>Uzoq muddat davom etuvchi, davriy zo'rayishlar bilan kechadigan kasallik.</p>
      <h2>Kasallik sabablari</h2>
      <ul>
        <li>Helicobacter pylori bakteriyasi</li>
        <li>Noto'g'ri ovqatlanish</li>
        <li>Stress</li>
        <li>Dori vositalari (masalan, NSAIDlar)</li>
        <li>Alkogol</li>
      </ul>
      <h2>Asosiy belgilari</h2>
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 my-4">
        <ul class="space-y-2">
          <li>Nafas olishning qiyinlashuvi</li>
          <li>Ko'krak qafasida og'riq</li>
          <li>Yo'tal</li>
          <li>Ishtaha yo'qolishi</li>
          <li>Tez to'yish hissi</li>
        </ul>
      </div>
      <h2>Davolanish usullari</h2>
      <ol>
        <li>Parhez</li>
        <li>Antibakterial terapiya (H. pylori mavjud bo'lsa)</li>
        <li>Kislota ishlab chiqarishni kamaytiruvchi dorilar</li>
        <li>Nafas yo'llarini kengaytiruvchi preparatlar</li>
      </ol>
      <h2>Parhez tavsiyalari</h2>
      <div class="bg-green-50 p-4 rounded-lg border border-green-200 my-4">
        <p class="font-semibold text-green-800">Tavsiya etiladigan:</p>
        <ul class="mt-2 space-y-1 text-green-700">
          <li>Bug'da pishirilgan taomlar</li>
          <li>Qaynatilgan sabzavotlar</li>
          <li>Yog'siz go'sht</li>
          <li>Sutli mahsulotlar</li>
        </ul>
        <p class="font-semibold text-red-800 mt-4">Taqiqlanadigan:</p>
        <ul class="mt-2 space-y-1 text-red-700">
          <li>Achchiq va nordon taomlar</li>
          <li>Qovurilgan taomlar</li>
          <li>Gazli ichimliklar</li>
          <li>Alkogol</li>
        </ul>
      </div>
      <h2>Oldini olish choralari</h2>
      <ul>
        <li>To'g'ri ovqatlanish</li>
        <li>Stress darajasini kamaytirish</li>
        <li>Muntazam ovqatlanish</li>
        <li>Zararli odatlardan voz kechish</li>
      </ul>
      <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
        <p class="font-semibold text-yellow-800">Eslatma:</p>
        <p class="mt-2 text-yellow-700">Agar belgilar 2 haftadan ortiq davom etsa yoki kuchayib borsa, albatta shifokorga murojaat qiling.</p>
      </div>
    `,
    tags: [
      { id: 1, name: 'Allergiya', slug: 'allergiya' },
      { id: 4, name: 'Nafas olish', slug: 'nafas-olish' },
      { id: 5, name: "O'pka", slug: 'opka' }
    ],
    image: 'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=1200&h=800&fit=crop',
    symptoms: [
      {
        id: 13,
        name: 'Nafas qisilishi',
        description: 'Nafas olishning qiyinlashuvi va hushtak ovozi'
      },
      {
        id: 14,
        name: 'Yo\'tal',
        description: 'Quruq yo\'tal, ayniqsa kechasi'
      }
    ],
    updatedAt: '2023-12-09'
  },
  {
    id: 6,
    name: 'Dermatit',
    slug: 'dermatit',
    author: {
      name: 'Dr. Jamshid Rahimov',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    shortDescription: 'Dermatit - terining yallig\'lanishi bilan kechadigan kasallik.',
    content: `
      <h1>Dermatit haqida</h1>
      <p>Dermatit - terining yallig'lanishi bilan kechadigan kasallik. Bu kasallik o'tkir va surunkali ko'rinishda kechishi mumkin.</p>
      <h2>Dermatit turlari</h2>
      <h3>1. O'tkir dermatit</h3>
      <p>Qisqa muddatli, lekin kuchli belgilar bilan namoyon bo'luvchi yallig'lanish.</p>
      <h3>2. Surunkali dermatit</h3>
      <p>Uzoq muddat davom etuvchi, davriy zo'rayishlar bilan kechadigan kasallik.</p>
      <h2>Kasallik sabablari</h2>
      <ul>
        <li>Helicobacter pylori bakteriyasi</li>
        <li>Noto'g'ri ovqatlanish</li>
        <li>Stress</li>
        <li>Dori vositalari (masalan, NSAIDlar)</li>
        <li>Alkogol</li>
      </ul>
      <h2>Asosiy belgilari</h2>
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 my-4">
        <ul class="space-y-2">
          <li>Terining qichishi</li>
          <li>Teri qizarishi</li>
          <li>Toshmalar</li>
          <li>Ishtaha yo'qolishi</li>
          <li>Tez to'yish hissi</li>
        </ul>
      </div>
      <h2>Davolanish usullari</h2>
      <ol>
        <li>Parhez</li>
        <li>Antibakterial terapiya (H. pylori mavjud bo'lsa)</li>
        <li>Kislota ishlab chiqarishni kamaytiruvchi dorilar</li>
        <li>Terini himoyalovchi preparatlar</li>
      </ol>
      <h2>Parhez tavsiyalari</h2>
      <div class="bg-green-50 p-4 rounded-lg border border-green-200 my-4">
        <p class="font-semibold text-green-800">Tavsiya etiladigan:</p>
        <ul class="mt-2 space-y-1 text-green-700">
          <li>Bug'da pishirilgan taomlar</li>
          <li>Qaynatilgan sabzavotlar</li>
          <li>Yog'siz go'sht</li>
          <li>Sutli mahsulotlar</li>
        </ul>
        <p class="font-semibold text-red-800 mt-4">Taqiqlanadigan:</p>
        <ul class="mt-2 space-y-1 text-red-700">
          <li>Achchiq va nordon taomlar</li>
          <li>Qovurilgan taomlar</li>
          <li>Gazli ichimliklar</li>
          <li>Alkogol</li>
        </ul>
      </div>
      <h2>Oldini olish choralari</h2>
      <ul>
        <li>To'g'ri ovqatlanish</li>
        <li>Stress darajasini kamaytirish</li>
        <li>Muntazam ovqatlanish</li>
        <li>Zararli odatlardan voz kechish</li>
      </ul>
      <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
        <p class="font-semibold text-yellow-800">Eslatma:</p>
        <p class="mt-2 text-yellow-700">Agar belgilar 2 haftadan ortiq davom etsa yoki kuchayib borsa, albatta shifokorga murojaat qiling.</p>
      </div>
    `,
    tags: [
      { id: 1, name: 'Allergiya', slug: 'allergiya' },
      { id: 3, name: 'Teri', slug: 'teri' },
      { id: 9, name: 'Yallig\'lanish', slug: 'yalliglanish' }
    ],
    image: 'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=1200&h=800&fit=crop',
    symptoms: [
      {
        id: 15,
        name: 'Terining qichishi',
        description: 'Kuchli qichish va achishish'
      },
      {
        id: 16,
        name: 'Toshmalar',
        description: 'Qizil dog\'lar va toshmalar'
      }
    ],
    updatedAt: '2023-12-08'
  }
  // Add more diseases here
];

interface DiseasePageProps {
  params: {
    slug: string;
  };
}

export default function DiseasePage({ params }: DiseasePageProps) {
  const disease = diseases.find(d => d.slug === params.slug);

  if (!disease) {
    return notFound();
  }

  // Get related diseases based on same category or tags
  const relatedDiseases = diseases
    .filter(d => 
      d.id !== disease.id && 
      (d.tags.some(t => disease.tags.some(dt => dt.id === t.id)))
    )
    .slice(0, 3);

  return (
    <div className="py-16">
      <div className="container">
        <article>
          {/* Header */}
          <header className="mb-12">
            {disease.image && (
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-8">
                <img 
                  src={disease.image} 
                  alt={disease.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              {/* Title and Description */}
              <h1 className="text-4xl font-bold">{disease.name}</h1>
              <p className="text-xl text-muted-foreground">
                {disease.shortDescription}
              </p>

              {/* Author and Date */}
              <div className="flex items-center gap-4 pt-4">
                {disease.author.avatar && (
                  <img
                    src={disease.author.avatar}
                    alt={disease.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium">{disease.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Yangilangan: {disease.updatedAt}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Content and Symptoms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Content */}
              <section className="prose prose-lg max-w-none space-y-6">
                <div dangerouslySetInnerHTML={{ __html: disease.content }} />
              </section>

              {/* Tags Section */}
              <div className="flex flex-wrap gap-2">
                {disease.tags.map(tag => (
                  <a
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm hover:bg-primary/20 hover:underline transition-colors"
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>

              {/* Symptoms Section */}
              <section className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-6 h-6 text-red-600">⚠️</div>
                  </div>
                  <h2 className="text-2xl font-semibold">Kasallik belgilari</h2>
                </div>

                <div className="space-y-4">
                  {disease.symptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-start gap-4">
                      <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                      </span>
                      <div>
                        <h3 className="font-medium">{symptom.name}</h3>
                        {symptom.description && (
                          <p className="text-muted-foreground mt-1">
                            {symptom.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Related Diseases */}
            <div>
              <div className="bg-card rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-4">O'xshash kasalliklar</h2>
                <div className="space-y-4">
                  {relatedDiseases.map((related) => (
                    <a
                      key={related.id}
                      href={`/diseases/${related.slug}`}
                      className="block p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <h3 className="font-medium">{related.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {related.shortDescription}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
