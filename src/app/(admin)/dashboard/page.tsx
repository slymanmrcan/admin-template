import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Toplam Gelir",
      value: "\$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Aktif Kullanıcılar",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Toplam Sipariş",
      value: "1,234",
      change: "-4.2%",
      trend: "down",
      icon: ShoppingCart,
    },
    {
      title: "Dönüşüm Oranı",
      value: "3.24%",
      change: "+2.5%",
      trend: "up",
      icon: Activity,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel</h1>
        <p className="text-muted-foreground">Tekrar hoş geldin! Bugün olanlar burada.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">geçen aydan</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Content */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
          <CardTitle>Son Etkinlikler</CardTitle>
          <CardDescription>Panelindeki en son güncellemeler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Etkinlik {i}</p>
                    <p className="text-xs text-muted-foreground">2 saat önce</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>Sık kullanılan özellikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {["Kullanıcı ekle", "Yeni sipariş", "Raporlar", "Ayarlar"].map((action) => (
                <button
                  key={action}
                  className="flex items-center justify-center p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="text-sm font-medium">{action}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
