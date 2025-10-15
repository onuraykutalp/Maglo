import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Hoşgeldiniz!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Burası uygulamanızın ana sayfası. Üye ol, giriş yap veya profilini incele!
      </p>
      {/* Örnek butonlar */}
      <div className="flex gap-4">
        <a
          href="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Kayıt Ol
        </a>
        <a
          href="/login"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
        >
          Giriş Yap
        </a>
      </div>
    </div>
  );
};

export default HomePage;