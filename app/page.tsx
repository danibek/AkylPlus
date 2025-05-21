// app/page.tsx
import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-2">
      <div className="flex justify-between items-center  bg-gradient-to-r from-yellow-400 to-yellow-500 px-12  rounded-2xl shadow-xl text-white overflow-hidden">
        {/* Фоновая PNG-картинка */}
        {/* Контент поверх фона */}
        <div className="flex-col ">
          <h2 className="text-6xl font-black mb-10 text-slate-950">
            АҚЫЛЫНА +<br />
            БІР БІЛІМ.
          </h2>
          <button className="bg-black text-yellow-400 text-2xl font-bold px-9 py-5 rounded-lg hover:bg-gray-200 transition">
            <a href="/search"> Курстарға өту </a>
          </button>
        </div>
        <div className=" h-full">
          <Image src="/bg.png" alt="Background" width={300} height={150} />
        </div>
      </div>
      {/* Hero */}

      {/* <section className="py-20 px-6 bg-gradient-to-br from-yellow-600 to-yellow-400 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">AkylPlus — онлайн оқыту платформасы</h1>
          <p className="text-lg md:text-2xl mb-6">Ең жақсылардан үйрен. Кез келген уақытта. Кез келген жерден.</p>
          <a href="#start" className="inline-block px-6 py-3 bg-white text-yellow-500 font-semibold rounded-full shadow-md hover:bg-gray-100 transition">
            Оқуды бастау
          </a>
        </section> */}

      {/* О нас */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center" id="about">
        <h2 className="text-3xl font-bold mb-4">Akyl+ дегеніміз не?</h2>
        <p className="text-lg text-gray-700">
          Бұл мұғалімдер курстар ашатын және студенттер білім алатын заманауи
          платформа. Ақылы курстар үшін төлем карта арқылы жүзеге асырылады.
          Тегін курстар бар. Ыңғайлы және қарапайым.
        </p>
      </section>

      <section className="py-16 px-6 ">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            ["🎓", "Мамандардың курстары"],
            ["📱", "Телефон мен компьютерден қол жеткізу"],
            ["💳", "Карта арқылы төлеу"],
            ["⭐", "Пікірлер мен рейтингтер"],
            ["📊", "Мұғалімдерге арналған аналитика"],
            ["🔒", "Деректер қауіпсіздігі"],
          ].map(([emoji, title]) => (
            <div
              key={title}
              className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] transition-all duration-300 overflow-hidden"
            >
              <div className="text-4xl mb-2">{emoji}</div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Карточка для студентов */}
          <div className="relative h-[720px] rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
            <Image
              src="/student.jpg"
              alt="Преимущества для студентов"
              fill
              className="object-cover"
            />
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-bold text-yellow-400 text-center ">
                Студенттерге арналған <br />
                артықшылықтар
              </h3>
            </div>
            <div className="relative z-10 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <ul className="space-y-2 text-sm text-white mb-4 sm:mb-0">
                  <li className="flex items-center">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Қолжетімді бағалар
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Жылдам төлем жүйесі
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Сертификат алу мүмкіндігі
                  </li>
                </ul>
                <a
                  href="/signup"
                  className="block text-center bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition"
                >
                  Тіркелу
                </a>
              </div>
            </div>
          </div>

          {/* Карточка для учителей */}
          <div className="relative h-[720px] rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
            <Image
              src="/teacher.jpg"
              alt="Преимущества для учителей"
              fill
              className="object-cover"
            />
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-bold text-yellow-400 text-center ">
                Мұғалімдерге арналған <br /> артықшылықтар
              </h3>
            </div>
            <div className="relative z-10 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <ul className="space-y-2 text-sm text-white mb-4 sm:mb-0">
                  <li className="flex items-center">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Жоғары табыс
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Жеңіл контент басқару
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Студенттермен байланыс
                  </li>
                </ul>
                <a
                  href="/AkylPlus.pdf"
                  download
                  className="block text-center bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition"
                >
                  Нұсқаулықты жүктеу
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Секция для вопросов */}
        <div className="max-w-6xl mx-auto mt-16 text-center bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">
            Сұрақтарыңыз бар ма?
          </h3>
          <p className="text-white mb-6">
            Бізге хабарласыңыз, барлық сұрақтарыңызға жауап береміз
          </p>
          <a
            href="https://wa.me/+77082356977"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-yellow-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <span className="mr-2">WhatsApp</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />{" "}
              {/* WhatsApp иконка, можно оставить как есть */}
            </svg>
          </a>
        </div>
      </section>

      {/* Курсы */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Біздегі курстар
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Бағдарламашы",
              desc: "HTML, CSS, JavaScript, React",
              image: "/courses/devvvvv.png",
              link: "/search?categoryId=01a4b6c8-a784-449e-aec1-826da1cf6530",
            },
            {
              title: "Дизайнер",
              desc: "Фигма, UX зерттеулері, прототиптеу",
              image: "/courses/designnnn.png",
              link: "/search?categoryId=1c1dbcd8-a949-472c-8a76-c5583631f426",
            },
            {
              title: "Қаржы",
              desc: "Аналитика, есептеу, пландау",
              image: "/courses/financee.png",
              link: "/search?categoryId=4e01e2e3-9767-46fd-af6f-f672f105d46b",
            },
            {
              title: "Маркетинг",
              desc: "Таргет, әлеуметтік желілер, аналитика",
              image: "/courses/marketingg.png",
              link: "/search?categoryId=5102c331-3429-41a2-a8b3-8665e2e5d884",
            },
            {
              title: "Тілдер ұйрену",
              desc: "Ағылшын, қазақ тілі, сөйлеу практикасы",
              image: "/courses/languagess.png",
              link: "/search?categoryId=beb6d9da-dc3a-4c43-b025-91d1d56ca977",
            },
            {
              title: "Басқалары",
              desc: "Көптеген пайдалы курстар",
              image: "/courses/otherr.png",
              link: "/search?categoryId=c86f35a8-f3a9-4538-9a5c-8e301c007e99",
            },
          ].map((course) => (
            <a
              href={course.link}
              key={course.title}
              className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden block group"
            >
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="w-full h-full object-contain p-0 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-yellow-500 mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-700">{course.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-16 px-6  text-center ">
        <h2 className="text-3xl font-bold mb-8">Пікірлер</h2>
        <blockquote className="italic text-gray-600 mb-4">
          Карта арқылы бірден төлеуге өте ыңғайлы. Курстар сапалы әрі түсінікті!
        </blockquote>
        <cite className="text-gray-700 font-semibold">— Айжан, студентка</cite>
      </section>

      {/* CTA */}
      <section
        id="start"
        className=" h-50 p-10 text-white text-center bg-gradient-to-r from-yellow-400 to-yellow-500 px-12  rounded-2xl shadow-xl text-white overflow-hidden"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Бастауға дайынсыз ба?
        </h2>
        <p className="text-lg mb-6">
          Тіркеліп, білімге саяхатыңызды бүгіннен бастаңыз.
        </p>
        <a
          href="/signup"
          className="inline-block px-6 py-3 bg-white text-yellow-500 font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Тіркелу
        </a>
      </section>
    </main>
  );
}
