"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, TrendingUp, Eye, MousePointer } from "lucide-react"

export default function AnalyticsPage() {
  const metrics = [
    { title: "Sayfa Görüntüleme", value: "124,892", change: "+12.5%", icon: Eye },
    { title: "Tıklama Oranı", value: "4.6%", change: "+0.8%", icon: MousePointer },
    { title: "Hemen Çıkma Oranı", value: "32.1%", change: "-2.3%", icon: BarChart3 },
    { title: "Büyüme", value: "+18.2%", change: "+3.1%", icon: TrendingUp },
  ]
  const trafficData = [
    { label: "Organik", value: 4200 },
    { label: "Direkt", value: 3100 },
    { label: "Sosyal", value: 1800 },
    { label: "Reklam", value: 2400 },
    { label: "Yönlendirme", value: 1300 },
  ]
  const conversionData = [
    { label: "Kayıt", value: 680 },
    { label: "Demo Talebi", value: 420 },
    { label: "Satın Alma", value: 190 },
    { label: "Yükseltme", value: 110 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analitik</h1>
        <p className="text-muted-foreground">Temel performans metriklerini takip et</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-green-500">{metric.change} önceki dönemden</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trafik Kaynakları</CardTitle>
            <CardDescription>Son 30 gün kanal kırılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-64"
              config={{
                value: {
                  label: "Oturum",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart data={trafficData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="label"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dönüşüm Hedefleri</CardTitle>
            <CardDescription>Son 30 gün dönüşüm dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-64"
              config={{
                value: {
                  label: "Adet",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <BarChart data={conversionData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="label"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
