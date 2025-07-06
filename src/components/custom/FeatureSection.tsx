import React from 'react'

interface Feature {
  id: number;
  title: string;
  description: string;
  icons: string | null;
}

interface FeatureSection {
  __component: 'layout.feature-section';
  id: number;
  title: string;
  description: string;
  feature: Feature[];
}

const FeatureSection = ({data}:{data:FeatureSection}) => {
  const icons=['🪄','⚔️','✨']
  return (
    <section className=" mx-auto px-4 py-16 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">{data.title}</h2>
        <p className="text-gray-500 mt-3 text-lg">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.feature.map((item,ind) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-5">
              <span className="text-3xl">{icons[ind]}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
            <p className="text-gray-500 text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeatureSection