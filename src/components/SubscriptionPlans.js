import React from 'react';
import { ArrowRight } from 'lucide-react';

const PlanCard = ({ title, limit, price, isSpecial, color }) => (
  <div className={`flex flex-col justify-between bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 w-full sm:w-80 border border-gray-700 transition-all duration-300 hover:scale-105 ${color === 'blue' ? 'bg-blue-900' : color === 'gold' ? 'bg-yellow-900' : 'bg#14293A'}`}>
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-gray-300 mb-4">{limit}</p>
      <p className="text-xl font-semibold mb-4 text-white">{price}</p>
    </div>
    <div className="mt-6">
      <p className="text-gray-300 mb-4">Team Guidance</p>
      <button className={`w-full py-2 px-4 rounded-full text-white font-semibold flex items-center justify-center transition-colors duration-300 ${isSpecial ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
        Select Plan <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  </div>
);

export default function SubscriptionPlans() {
  return (
    <div className="bg#14293A py-16 px-6 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-2">Monetization</h1>
      <p className="text-xl text-gray-400 mb-12">Choose your subscription plan</p>
      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-5xl justify-center">
        <PlanCard
          title="Standard"
          limit="< 30 goods"
          price="USD 150/month"
          color="gray"
        />
        <PlanCard
          title="Premium"
          limit="< 60 goods"
          price="USD 280/month"
          color="gold"
        />
        <PlanCard
          title="Enterprise"
          limit="> 60 goods"
          price="Special Offer"
          isSpecial={true}
          color="blue"
        />
      </div>
    </div>
  );
}