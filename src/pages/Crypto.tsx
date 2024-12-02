import React, { useEffect, useState } from 'react'

interface Wallet {
  name: string
  xrpTokenCount: number
  snakeTokenCount: number
}

const Crypto: React.FC = () => {
  const [xrpPrice, setXrpPrice] = useState<number | null>(null)
  const [snakePrice, setSnakePrice] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const wallets: Wallet[] = [
    { name: 'Colin', xrpTokenCount: 1700, snakeTokenCount: 20000 },
    { name: 'Ramo', xrpTokenCount: 3011, snakeTokenCount: 0 }
  ]

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ripple,snake-wif-hat&vs_currencies=eur'
        )
        const data = await response.json()
        if (data.ripple && data['snake-wif-hat']) {
          setXrpPrice(data.ripple.eur)
          setSnakePrice(data['snake-wif-hat'].eur)
        } else {
          setError('Failed to fetch one or more cryptocurrency prices.')
        }
      } catch (err) {
        setError('An error occurred while fetching cryptocurrency prices.')
      }
    }

    fetchPrices()
  }, [])

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-xl font-extrabold mb-4 text-center text-indigo-600">Crypto Wallet Overview</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {xrpPrice !== null && snakePrice !== null ? (
            <>
              {wallets.map((wallet) => {
                const xrpTotal = wallet.xrpTokenCount * (xrpPrice ?? 0)
                const snakeTotal = wallet.snakeTokenCount * (snakePrice ?? 0)
                const grandTotal = xrpTotal + snakeTotal

                return (
                  <div key={wallet.name} className="mb-4 p-3 bg-white rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold mb-3 text-indigo-500">{wallet.name}'s Wallet</h2>
                    <div className="grid gap-3 text-sm">
                      <div className="p-2 bg-gray-100 rounded-lg shadow-sm border">
                        <h3 className="text-md font-medium mb-1 text-gray-700">XRP</h3>
                        <p className="text-gray-600">
                          Tokens: <span className="font-semibold">{wallet.xrpTokenCount}</span>
                        </p>
                        <p className="text-gray-600">
                          Price per Token: <span className="font-semibold">€{xrpPrice.toFixed(2)}</span>
                        </p>
                        <div className="mt-2 text-blue-600 font-extrabold">Total: €{xrpTotal.toFixed(2)}</div>
                      </div>

                      <div className="p-2 bg-gray-100 rounded-lg shadow-sm border">
                        <h3 className="text-md font-medium mb-1 text-gray-700">Snake-Wif-Hat</h3>
                        <p className="text-gray-600">
                          Tokens: <span className="font-semibold">{wallet.snakeTokenCount}</span>
                        </p>
                        <p className="text-gray-600">
                          Price per Token: <span className="font-semibold">€{snakePrice.toFixed(2)}</span>
                        </p>
                        <div className="mt-2 text-green-600 font-extrabold">Total: €{snakeTotal.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg shadow-sm border border-blue-200 text-center">
                      <h3 className="text-md font-semibold text-blue-700">Grand Total</h3>
                      <p className="text-2xl font-extrabold text-blue-800 mt-1">€{grandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <p className="text-center text-gray-500">Loading prices...</p>
          )}
        </>
      )}
    </div>
  )
}

export default Crypto
