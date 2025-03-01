interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="text-center h-full">
    <div className="bg-white p-8 rounded-2xl border border-gray-200 h-full flex flex-col items-center group hover:shadow-xl transition-all cursor-pointer hover:border-green-600">
      <div className="w-16 h-16 text-green-600 mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 transform group-hover:scale-105 transition-transform">
        {description}
      </p>
    </div>
  </div>
); 