import React from 'react';

export const About = () => (
  <div className="container mx-auto p-4 flex justify-center">
    <h1 className="text-3xl font-bold mb-4">О нас</h1>
    <p className="mb-4">
      Мы - компания, специализирующаяся на 3D-моделировании и визуализации. 
      Наша цель - предоставить инновационные решения для ваших проектов.
    </p>
    <p>
      С нашей командой опытных специалистов мы стремимся превзойти ожидания клиентов 
      и создавать высококачественные 3D-модели для различных отраслей.
    </p>
  </div>
);

export const Contact = () => (
  <div className="container mx-auto p-4 text-center" id='contact'>
    <h1 className="text-3xl font-bold mb-4">Контакты</h1>
    <p className="mb-2">Email: romdevv@gmail.com</p>
    <p className="mb-2">Телефон: +996 998 555 990</p>
    <p className="mb-2">Адрес: Ahunbaeva 125/2</p>
  </div>
);