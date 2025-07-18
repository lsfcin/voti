'use client'

export function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Política Real',
      description: 'Baseado no que os políticos fizeram de verdade, não no que prometeram na campanha.'
    },
    {
      icon: '⚡',
      title: 'Linguagem Simples',
      description: 'Transformamos textos complicados em perguntas que qualquer pessoa entende.'
    },
    {
      icon: '✅',
      title: 'Quem te Ajuda',
      description: 'Mostra quais políticos realmente lutaram por coisas que melhoram sua vida.'
    },
    {
      icon: '🛡️',
      title: 'Sem Propaganda',
      description: 'Só os fatos: o que cada um votou e como isso afeta você no dia a dia.'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Como descobrimos quem tá do seu lado
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Política sem enrolação: vamos direto ao que interessa para sua vida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto para descobrir quem realmente te representa?
          </h3>
          <p className="text-gray-600 mb-6">
            São só algumas perguntas rápidas sobre questões que afetam seu dia a dia. 
            Em poucos minutos você vai saber quem tá na política e realmente te ajuda!
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors">
            Bora descobrir!
          </button>
        </div>
      </div>
    </section>
  )
}
