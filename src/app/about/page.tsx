'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: '🏪',
      title: 'Yerel İşletmeler',
      description: 'KKTC\'deki yerel işletmeleri destekleyerek ekonomiye katkıda bulunuyoruz.'
    },
    {
      icon: '🚚',
      title: 'Hızlı Teslimat',
      description: 'Ada genelinde hızlı ve güvenilir teslimat hizmeti sunuyoruz.'
    },
    {
      icon: '💳',
      title: 'Güvenli Ödeme',
      description: 'Kapıda ödeme ile %100 güvenli alışveriş garantisi.'
    },
    {
      icon: '🤝',
      title: 'Müşteri Memnuniyeti',
      description: '7/24 müşteri desteği ile her zaman yanınızdayız.'
    }
  ]

  const team = [
    {
      name: 'Ömer Tekin',
      role: 'Kurucu & CEO',
      bio: 'Teknoloji ve e-ticaret alanında 15 yıllık deneyim.',
      avatar: 'ÖT'
    },
    {
      name: 'Elif Demir',
      role: 'CTO',
      bio: 'Yazılım geliştirme ve sistem mimarisi uzmanı.',
      avatar: 'ED'
    },
    {
      name: 'Murat Özkan',
      role: 'İş Geliştirme',
      bio: 'Yerel işletmeler ve ortaklık geliştirme sorumlusu.',
      avatar: 'MÖ'
    }
  ]

  const stats = [
    { number: '500+', label: 'Yerel İşletme' },
    { number: '10,000+', label: 'Mutlu Müşteri' },
    { number: '50,000+', label: 'Tamamlanan Sipariş' },
    { number: '99%', label: 'Müşteri Memnuniyeti' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
            <span className="block">Kuzey Kıbrıs&apos;ın</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Dijital Pazarı
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            2025 yılında kurulan e-KKTC, Kuzey Kıbrıs&apos;ın en güvenilir e-ticaret platformu 
            olarak yerel işletmeleri ve müşterileri buluşturuyor.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Alışverişe Başla
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Misyonumuz
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Kuzey Kıbrıs&apos;taki yerel işletmeleri güçlendirmek ve müşterilere 
                en iyi alışveriş deneyimini sunmak için kurulduk. Teknoloji ile 
                geleneği harmanlayarak, ada ekonomisine katkıda bulunuyoruz.
              </p>
              <p className="text-gray-600 text-lg">
                Güvenli, hızlı ve kullanıcı dostu platformumuzla hem satıcılar 
                hem de alıcılar için değer yaratıyoruz.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">🏝️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Neden e-KKTC?
            </h2>
            <p className="text-gray-600 text-lg">
              Müşterilerimize sunduğumuz benzersiz değerler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ekibimiz
            </h2>
            <p className="text-gray-600 text-lg">
              e-KKTC&apos;yi hayata geçiren deneyimli ekip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Sorularınız mı var? Satıcı olmak mı istiyorsunuz? 
            Size yardımcı olmak için buradayız!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                İletişim
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Satıcı Ol
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
