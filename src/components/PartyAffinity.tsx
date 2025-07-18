interface Party {
  party: string
  affinity: number
}

interface PartyAffinityProps {
  parties: Party[]
}

export function PartyAffinity({ parties }: PartyAffinityProps) {
  const getAffinityColor = (affinity: number) => {
    if (affinity >= 80) return 'bg-green-500'
    if (affinity >= 60) return 'bg-yellow-400'
    if (affinity >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getAffinityText = (affinity: number) => {
    if (affinity >= 80) return 'text-green-600'
    if (affinity >= 60) return 'text-yellow-600'
    if (affinity >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-4">
      {parties.map((party) => (
        <div key={party.party} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-lg">{party.party}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-32 bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-300 ${getAffinityColor(party.affinity)}`}
                style={{ width: `${party.affinity}%` }}
              />
            </div>
            <span className={`font-bold text-lg ${getAffinityText(party.affinity)}`}>
              {party.affinity}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
