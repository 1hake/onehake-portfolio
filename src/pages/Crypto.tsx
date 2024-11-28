import React, { useEffect, useState } from 'react'

interface CryptoPriceDisplayProps {}

const Crypto: React.FC<CryptoPriceDisplayProps> = () => {
  const [xrpPrice, setXrpPrice] = useState<number | null>(null)
  const [snakePrice, setSnakePrice] = useState<number | null>(null)
  const [xrpTokenCount] = useState<number>(1700) // Fixed token count for XRP
  const [snakeTokenCount] = useState<number>(20000) // Fixed token count for Snake-Wif-Hat
  const [error, setError] = useState<string | null>(null)

  // Fetch the current XRP and Snake-Wif-Hat prices
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

  const xrpTotal = xrpPrice !== null ? xrpTokenCount * xrpPrice : 0
  const snakeTotal = snakePrice !== null ? snakeTokenCount * snakePrice : 0
  const grandTotal = xrpTotal + snakeTotal

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Crypto Price Display</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {xrpPrice !== null && snakePrice !== null ? (
            <>
              <div className="grid gap-6">
                <div className="p-4 bg-white rounded-lg shadow-md border">
                  <h2 className="text-lg font-semibold mb-2">XRP</h2>
                  <p className="text-gray-600">
                    Tokens: <span className="font-bold">{xrpTokenCount}</span>
                  </p>
                  <p className="text-gray-600">
                    Price per Token: <span className="font-bold">€{xrpPrice.toFixed(2)}</span>
                  </p>
                  <div className="mt-3 text-blue-600 font-bold">Total: €{xrpTotal.toFixed(2)}</div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md border">
                  <h2 className="text-lg font-semibold mb-2">Snake-Wif-Hat</h2>
                  <p className="text-gray-600">
                    Tokens: <span className="font-bold">{snakeTokenCount}</span>
                  </p>
                  <p className="text-gray-600">
                    Price per Token: <span className="font-bold">€{snakePrice.toFixed(2)}</span>
                  </p>
                  <div className="mt-3 text-green-600 font-bold">Total: €{snakeTotal.toFixed(2)}</div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-100 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-blue-800">Grand Total</h2>
                <p className="text-3xl font-bold text-blue-900 mt-2">€{grandTotal.toFixed(2)}</p>
              </div>
            </>
          ) : (
            <p className="text-center">Loading prices...</p>
          )}
        </>
      )}
    </div>
  )
}

export default Crypto
