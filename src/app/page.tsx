import { Briefcase, ChevronRight, Mail, MapPin, Phone, Play, Search, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Job Dhoondo - Find Your Dream Job in 60 Seconds | AI-Powered Job Search',
  description: 'Connect with top employers and discover opportunities with AI-powered job matching. 50,000+ active jobs, 2M+ job seekers. Start your career journey today.',
  keywords: 'jobs, career, employment, job search, AI matching, remote jobs, hiring, recruitment',
  openGraph: {
    title: 'Job Dhoondo - Your Dream Job Awaits',
    description: 'AI-powered job matching platform with 50,000+ active jobs. Find your perfect career opportunity today.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Dhoondo - Find Your Dream Job',
    description: 'AI-powered job search platform with 50,000+ opportunities',
  },
  robots: {
    index: true,
    follow: true,
  }
};

const JobDhoondoLanding = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at TechCorp",
      content: "Found my dream job within 2 weeks! The platform's AI matching is incredible.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "Marketing Manager at StartupXYZ",
      content: "Job Dhoondo's filters helped me find the perfect remote opportunity.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Anita Patel",
      role: "Data Scientist at AnalyticsPro",
      content: "The interview preparation resources gave me the confidence to succeed.",
      rating: 5,
      avatar: "AP"
    }
  ];

  const partnerLogos = [
    "TechCorp", "InnovateLab", "FutureVision", "DataStream", "CloudTech", "DigitalEdge"
  ];

  const stats = [
    { number: "50,000+", label: "Active Jobs" },
    { number: "2M+", label: "Job Seekers" },
    { number: "10,000+", label: "Companies" },
    { number: "95%", label: "Success Rate" }
  ];

  const features = [
    {
      icon: Search,
      title: "AI-Powered Matching",
      description: "Our advanced algorithm matches you with opportunities that perfectly align with your skills and career goals.",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: Users,
      title: "Direct Employer Contact",
      description: "Connect directly with hiring managers and skip the lengthy application processes with our premium network.",
      gradient: "from-teal-600 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Career Growth Insights",
      description: "Get personalized recommendations for skill development and career advancement based on market trends.",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Job Dhoondo",
            "url": "https://jobdhoondo.com",
            "logo": "https://jobdhoondo.com/logo.png",
            "description": "AI-powered job search platform connecting job seekers with top employers",
            "sameAs": [
              "https://linkedin.com/company/jobdhoondo",
              "https://twitter.com/jobdhoondo"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-98765-43210",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": "English"
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 text-gray-900">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <header className="relative z-10 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Job Dhoondo
                </h1>
              </div>

              <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
                <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-3 py-2">
                  For Employers
                </button>
                <Link href="/login">
                  <button className="cursor-pointer px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="cursor-pointer px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all shadow-lg">
                    Get Started
                  </button>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main>
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-12 sm:pb-24">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6 sm:mb-8">
                <TrendingUp className="w-4 h-4 mr-2" />
                10,000+ new jobs posted this week
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                Your Dream Job Awaits – 
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Apply in 60 Seconds
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                Connect with top employers, discover opportunities that match your skills, 
                and accelerate your career with AI-powered job matching.
              </p>

              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-4xl mx-auto mb-8 sm:mb-12 border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      aria-label="Job search query"
                      className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent transition-all"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City, state, or remote"
                      aria-label="Job location"
                      className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent transition-all"
                    />
                  </div>
                  <button 
                    className="px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center"
                    aria-label="Search for jobs"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Jobs
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center text-base sm:text-lg">
                  Get Started Free
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center text-base sm:text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16 bg-white border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-600 mb-6 sm:mb-8">
                  Trusted by 500+ Leading Companies
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8 items-center">
                  {partnerLogos.map((logo, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <div className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 rounded-lg font-semibold text-gray-600 text-sm sm:text-base">
                        {logo}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16">
                Success Stories
              </h2>
              <div className="space-y-6 sm:space-y-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-lg sm:text-xl md:text-2xl font-medium mb-6 text-gray-700">
                        {testimonial.content}
                      </blockquote>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {testimonial.avatar}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600 text-sm sm:text-base">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Why Choose Job Dhoondo?
                </h2>
                <p className="text-lg sm:text-xl text-gray-600">
                  Advanced features designed to accelerate your job search
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
                      <div className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                        <IconComponent className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Job Dhoondo
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Empowering careers, connecting talent with opportunity.
                </p>
                <div className="flex space-x-4">
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <span className="text-xs font-bold">Li</span>
                  </a>
                  <a href="#" aria-label="Twitter" className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                    <span className="text-xs font-bold">Tw</span>
                  </a>
                  <a href="#" aria-label="Facebook" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                    <span className="text-xs font-bold">Fb</span>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li><a href="/jobs" className="hover:text-blue-600 transition-colors">Browse Jobs</a></li>
                  <li><a href="/companies" className="hover:text-blue-600 transition-colors">Companies</a></li>
                  <li><a href="/career-advice" className="hover:text-blue-600 transition-colors">Career Advice</a></li>
                  <li><a href="/salary-guide" className="hover:text-blue-600 transition-colors">Salary Guide</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">For Employers</h4>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li><a href="/post-job" className="hover:text-blue-600 transition-colors">Post a Job</a></li>
                  <li><a href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                  <li><a href="/talent-solutions" className="hover:text-blue-600 transition-colors">Talent Solutions</a></li>
                  <li><a href="/enterprise" className="hover:text-blue-600 transition-colors">Enterprise</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact Info</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <a href="mailto:hello@jobdhoondo.com" className="hover:text-blue-600 transition-colors">
                      hello@jobdhoondo.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <a href="tel:+919876543210" className="hover:text-blue-600 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Mumbai, India</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h5 className="font-medium mb-3 text-sm">Stay Updated</h5>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      aria-label="Email for newsletter"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent"
                    />
                    <button className="w-full py-2 text-white text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition-all">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2025 Job Dhoondo. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm text-gray-600">
                <a href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                <a href="/cookie-policy" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default JobDhoondoLanding;