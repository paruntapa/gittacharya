'use client'

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { createCheckoutSession } from "@/lib/stripe"
import { api } from "@/trpc/react"
import { Info } from "lucide-react"
import { useState } from "react"


const BillingPage = () => {
  const { data: user } = api.project.getMyCredits.useQuery()
  const [ creditsToBuy, setCreditsToBuy ] = useState<number[]>([100])
  const creditsToBuyAmount = creditsToBuy[0]!
  const price = (creditsToBuyAmount / 50).toFixed(2)
  return (
    <div>
      <h1 className="text-xl font-semibold">
        Billing
      </h1>
      <div className="h-2"></div>
      <p className="text-sm text-gray-500">
        You currently have {user?.credits} credits.
      </p>
      <div className="h-2"></div>
      <div className="bg-blue-50 rounded-md px-4 py-4 border border-blue-200 text-green-700">
        <div className="flex items-center gap-2">
          <Info className="size-4"/>
          <p className="text-sm"> 
            Each Credit allows you to index 1 file in a repository
          </p>
        </div>
        <div className="h-4"></div>
        <Slider defaultValue={[100]} max={1000}  min={10} step={10} onValueChange={value => setCreditsToBuy(value)} value={creditsToBuy} className="bg-green-200"/>
          <div className="h-4"></div>

          <Button className="bg-green-700" onClick={() => {
            createCheckoutSession(creditsToBuyAmount)
          }}>
            Buy {creditsToBuyAmount} credits for ${price}
          </Button>

      </div>
      </div>
  )
}

export default BillingPage