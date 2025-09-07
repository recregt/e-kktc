'use client'

import { Card, CardContent } from '@/components/ui/card'

// Helper function to generate random recent dates
const getRandomRecentDate = (daysBack: number) => {
  const now = new Date()
  const randomDays = Math.floor(Math.random() * daysBack)
  const date = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000)
  return date
}

// Helper function to format time ago
const getTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  
  if (diffInDays === 0) {
    if (diffInHours === 0) return "Az önce"
    return `${diffInHours} saat önce`
  } else if (diffInDays === 1) {
    return "Dün"
  } else if (diffInDays < 7) {
    return `${diffInDays} gün önce`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} hafta önce`
  } else {
    const months = Math.floor(diffInDays / 30)
    return `${months} ay önce`
  }
}

export default function TestimonialsSection() {
  // Generate testimonials with dynamic dates
  const testimonials = [
    {
      id: 1,
      name: "Ayşe Demir",
      location: "Girne",
      comment: "Harika bir platform! Yerel işletmelerden güvenle alışveriş yapabiliyorum. Kapıda ödeme özelliği çok kullanışlı.",
      rating: 5,
      avatar: "AD",
      date: getRandomRecentDate(7) // Son 7 gün içinde
    },
    {
      id: 2,
      name: "Mehmet Özkan",
      location: "Lefkoşa",
      comment: "Siparişim çok hızlı geldi. Ürün kalitesi mükemmeldi. Kesinlikle tavsiye ederim!",
      rating: 5,
      avatar: "MÖ",
      date: getRandomRecentDate(14) // Son 14 gün içinde
    },
    {
      id: 3,
      name: "Zeynep Kaya",
      location: "Mağusa",
      comment: "Yerel işletmeleri desteklemek için harika bir fırsat. Uygulama çok kullanıcı dostu.",
      rating: 5,
      avatar: "ZK",
      date: getRandomRecentDate(30) // Son 30 gün içinde
    }
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Binlerce mutlu müşterimizin deneyimlerini okuyun
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                {/* Stars */}
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  &quot;{testimonial.comment}&quot;
                </p>

                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3 sm:mr-4 text-xs sm:text-sm lg:text-base">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  
                  {/* Time ago */}
                  <div className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-1 rounded-full whitespace-nowrap">
                    {getTimeAgo(testimonial.date)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Siz de mutlu müşterilerimize katılın!
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Ücretsiz Kargo
            </div>
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Kapıda Ödeme
            </div>
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              7/24 Destek
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
