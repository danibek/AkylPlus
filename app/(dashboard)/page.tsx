"use client";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="h-full p-6 ">
        {/* Контейнер с фоном и PNG */}
        <div className="flex justify-between items-center bg-gradient-to-r from-yellow-400 to-yellow-500 p-20 rounded-2xl shadow-xl text-white overflow-hidden">
          {/* Фоновая PNG-картинка */}
          {/* Контент поверх фона */}
          <div className="flex-col ">
            <h2 className="text-6xl font-black mb-10 text-slate-950">АҚЫЛЫНА +<br/>
            БІР БІЛІМ.</h2>
            <button className="bg-black text-yellow-400 text-2xl font-bold px-9 py-5 rounded-lg hover:bg-gray-200 transition">
            Курстарға өту
            </button >
          </div>
            <div className="w-full h-full">
                <img
                    src="/bg.png" // Убедись, что картинка лежит в public/
                    alt="Background"
                    className="w-90 h-80"
                />
            </div>
        </div>

        {/* Рендер основного контента */}
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;

