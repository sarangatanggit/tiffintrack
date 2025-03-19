"use client"

import { useEffect, useRef } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function NutritionChart({ nutrition }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // This would be replaced with a proper chart rendering in a full implementation
    // For now, we'll just draw a simple placeholder visualization
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw simple macronutrient breakdown
    const macroData = [
      { name: "Protein", value: nutrition.protein * 4, color: "#4D6447" }, // Curry Leaf Green
      { name: "Carbs", value: nutrition.carbs * 4, color: "#E2A72E" }, // Deep Turmeric
      { name: "Fat", value: nutrition.fat * 9, color: "#A18276" }, // Cardamom
    ]

    const total = macroData.reduce((sum, item) => sum + item.value, 0)
    let startAngle = -0.5 * Math.PI

    // Draw pie chart
    macroData.forEach((item) => {
      const sliceAngle = (item.value / total) * (2 * Math.PI)

      ctx.beginPath()
      ctx.moveTo(width / 2, height / 2)
      ctx.arc(width / 2, height / 2, Math.min(width, height) / 2 - 10, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 4, 0, 2 * Math.PI)
    ctx.fillStyle = "#fff"
    ctx.fill()

    // Draw calories in center
    ctx.fillStyle = "#000"
    ctx.font = "bold 16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${nutrition.calories}`, width / 2, height / 2 - 10)
    ctx.font = "12px sans-serif"
    ctx.fillText("calories", width / 2, height / 2 + 10)
  }, [nutrition])

  // Prepare data for the recharts pie chart
  const data = [
    { name: "Protein", value: nutrition.protein * 4 },
    { name: "Carbs", value: nutrition.carbs * 4 },
    { name: "Fat", value: nutrition.fat * 9 },
  ]

  const COLORS = ["#4D6447", "#E2A72E", "#A18276"]

  return (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} calories`, "Energy"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="w-4 h-4 bg-[#4D6447] rounded-full mx-auto"></div>
          <div className="text-sm font-medium">Protein</div>
          <div className="text-xs">
            {nutrition.protein}g ({Math.round(((nutrition.protein * 4) / nutrition.calories) * 100)}%)
          </div>
        </div>
        <div className="space-y-1">
          <div className="w-4 h-4 bg-[#E2A72E] rounded-full mx-auto"></div>
          <div className="text-sm font-medium">Carbs</div>
          <div className="text-xs">
            {nutrition.carbs}g ({Math.round(((nutrition.carbs * 4) / nutrition.calories) * 100)}%)
          </div>
        </div>
        <div className="space-y-1">
          <div className="w-4 h-4 bg-[#A18276] rounded-full mx-auto"></div>
          <div className="text-sm font-medium">Fat</div>
          <div className="text-xs">
            {nutrition.fat}g ({Math.round(((nutrition.fat * 9) / nutrition.calories) * 100)}%)
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} width={300} height={300} style={{ display: "none" }} />
    </div>
  )
}

