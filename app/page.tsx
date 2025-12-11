import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  Search,
  Star,
  Zap,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Sparkles,
  Target,
  Globe,
  Code,
  Palette,
  Database,
  Brain,
  Rocket,
  Heart,
  Play,
  Award,
  MessageCircle,
  Lightbulb,
  Infinity,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Music,
  PenTool,
  Camera,
  Briefcase,
  Fence as Dance,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-xl shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black font-space-grotesk bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                TeamForge
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium font-outfit"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium font-outfit"
              >
                How it Works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium font-outfit"
              >
                Success Stories
              </Link>
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium font-outfit"
              >
                Pricing
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-outfit font-medium"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-outfit font-semibold">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-float">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30">
              <Code className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float-delayed">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30">
              <Palette className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-float-slow">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30">
              <Brain className="h-8 w-8 text-pink-600" />
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30">
              <Rocket className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-32 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-sm rounded-full text-indigo-700 text-sm font-medium mb-8 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold font-outfit">
                Join 25,000+ developers building together
              </span>
              <div className="ml-2 flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
              </div>
            </div>

            {/* Enhanced Main Headline */}
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight font-space-grotesk">
              <span className="block text-gray-900 mb-4 tracking-tight">Build Your</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x tracking-tighter">
                Dream Team
              </span>
              <span className="block text-gray-900 text-5xl lg:text-6xl mt-4 tracking-tight">in Seconds</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-outfit font-light">
              Revolutionary AI-powered platform that instantly connects you with perfect teammates for
              <span className="text-indigo-600 font-semibold font-poppins"> hackathons</span>,
              <span className="text-purple-600 font-semibold font-poppins"> open source projects</span>, and
              <span className="text-pink-600 font-semibold font-poppins"> startup ventures</span>.
              <br />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-4 block font-space-grotesk">
                Stop searching. Start building.
              </span>
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="group text-xl px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 rounded-2xl border-0 font-outfit font-bold"
                >
                  <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  Start Matching Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="group text-xl px-12 py-6 border-2 border-white/50 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:border-white/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-2xl text-gray-700 hover:text-gray-900 font-outfit font-semibold"
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch Demo
                <span className="ml-2 text-2xl">🎬</span>
              </Button>
            </div>

            {/* Enhanced Social Proof */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 text-sm">
              <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/40">
                <div className="flex -space-x-3 mr-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Avatar key={i} className="h-10 w-10 border-3 border-white shadow-lg">
                      <AvatarImage src={`/placeholder-40x40.png?height=40&width=40&text=${i}`} />
                      <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-poppins font-bold">
                        U{i}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-900 font-poppins">25,000+ developers</div>
                  <div className="text-gray-600 font-outfit">building together</div>
                </div>
              </div>

              <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/40">
                <div className="flex text-yellow-400 mr-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-900 font-poppins">4.9/5 rating</div>
                  <div className="text-gray-600 font-outfit">from 5,000+ reviews</div>
                </div>
              </div>

              <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/40">
                <div className="mr-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 font-poppins">98% success rate</div>
                  <div className="text-gray-600 font-outfit">team formation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-gray-600">
            <span className="text-sm mb-2 font-medium font-outfit">Discover More</span>
            <ChevronDown className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-purple-50"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "25K+", label: "Active Developers", icon: Users, color: "from-indigo-500 to-blue-500" },
              { number: "12K+", label: "Teams Formed", icon: Target, color: "from-purple-500 to-pink-500" },
              { number: "1.2K+", label: "Events Hosted", icon: Calendar, color: "from-pink-500 to-red-500" },
              { number: "98%", label: "Success Rate", icon: Award, color: "from-green-500 to-emerald-500" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`mx-auto mb-4 p-4 bg-gradient-to-r ${stat.color} rounded-2xl w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform font-space-grotesk">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium font-outfit">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section
        id="features"
        className="py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-6 px-6 py-3 text-indigo-600 border-indigo-200 bg-white/50 backdrop-blur-sm text-lg font-bold font-outfit"
            >
              <Zap className="mr-2 h-5 w-5" />
              Powerful Features
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight font-space-grotesk tracking-tight text-gray-900">
              Everything You Need to
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Build Great Teams
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-outfit">
              Our revolutionary AI platform combines intelligent matching with powerful collaboration tools to help you
              find and work with the perfect teammates in record time.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {[
              {
                icon: Brain,
                title: "AI-Powered Matching",
                description:
                  "Revolutionary algorithm analyzes 50+ data points including skills, experience, personality, and working styles to find your perfect teammates with 98% accuracy.",
                color: "from-indigo-500 to-purple-500",
                bgColor: "from-indigo-50 to-purple-50",
              },
              {
                icon: Calendar,
                title: "Smart Event Integration",
                description:
                  "Seamlessly discover and join hackathons, open source events, and collaborative projects. Get automatically matched with teammates based on event requirements.",
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50",
              },
              {
                icon: Search,
                title: "Advanced Discovery",
                description:
                  "Powerful search and filtering system with 20+ criteria. Find exactly the right person for your project with precision matching and real-time availability.",
                color: "from-pink-500 to-red-500",
                bgColor: "from-pink-50 to-red-50",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm`}
              >
                <CardHeader className="text-center pb-8">
                  <div
                    className={`mx-auto mb-8 p-6 bg-gradient-to-r ${feature.color} rounded-3xl w-fit shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl mb-6 font-black group-hover:text-indigo-600 transition-colors font-space-grotesk text-gray-900">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-gray-700 font-outfit">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Enhanced Secondary Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Peer Reviews",
                description: "Build reputation through detailed feedback and ratings from teammates",
                color: "text-yellow-500",
              },
              {
                icon: MessageCircle,
                title: "Real-time Chat",
                description: "Instant communication with integrated team messaging and video calls",
                color: "text-blue-500",
              },
              {
                icon: Shield,
                title: "Verified Profiles",
                description: "Connect with confidence through skill verification and background checks",
                color: "text-green-500",
              },
              {
                icon: Lightbulb,
                title: "Smart Suggestions",
                description: "AI-powered project ideas and team composition recommendations",
                color: "text-purple-500",
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard",
                description: "Track your collaboration success and skill development over time",
                color: "text-indigo-500",
              },
              {
                icon: Infinity,
                title: "Unlimited Projects",
                description: "Join as many teams and projects as you want with no restrictions",
                color: "text-pink-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50"
              >
                <div
                  className={`p-3 bg-gray-100 rounded-xl group-hover:scale-110 transition-transform ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg group-hover:text-indigo-600 transition-colors font-poppins text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-outfit">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Showcase */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-indigo-50 to-white"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-8 font-space-grotesk tracking-tight text-gray-900">
              Connect Across
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                All Tech Stacks
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-outfit">
              From frontend wizards to AI researchers, find teammates with complementary skills for any project
              imaginable
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: Code, label: "Frontend", color: "from-blue-500 to-cyan-500", projects: "15K+" },
              { icon: Database, label: "Backend", color: "from-green-500 to-emerald-500", projects: "12K+" },
              { icon: Palette, label: "Design", color: "from-pink-500 to-rose-500", projects: "8K+" },
              { icon: Brain, label: "AI/ML", color: "from-purple-500 to-violet-500", projects: "6K+" },
              { icon: Globe, label: "DevOps", color: "from-orange-500 to-red-500", projects: "4K+" },
              { icon: Rocket, label: "Mobile", color: "from-indigo-500 to-blue-500", projects: "7K+" },
            ].map((skill, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-3xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-indigo-50 transition-all duration-300 transform hover:-translate-y-4 hover:scale-105"
              >
                <div
                  className={`mx-auto mb-6 p-6 bg-gradient-to-r ${skill.color} rounded-2xl w-fit group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}
                >
                  <skill.icon className="h-8 w-8 text-white" />
                </div>
                <div className="font-black text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors font-poppins">
                  {skill.label}
                </div>
                <div className="text-sm text-gray-500 font-medium font-jetbrains-mono">{skill.projects} projects</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section
        id="how-it-works"
        className="py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-24">
            <Badge
              variant="outline"
              className="mb-6 px-6 py-3 text-indigo-600 border-indigo-200 bg-white/50 backdrop-blur-sm text-lg font-bold font-outfit"
            >
              <Target className="mr-2 h-5 w-5" />
              Simple Process
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight font-space-grotesk tracking-tight text-gray-900">
              From Profile to Project in
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-outfit">
              Our streamlined process gets you from signup to successful collaboration faster than ever before
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Tell us about your skills, experience, interests, and what you're looking for in teammates. Our AI learns your preferences and working style.",
                icon: Users,
                color: "from-indigo-500 to-purple-500",
                features: [
                  "Skill assessment",
                  "Personality matching",
                  "Availability tracking",
                  "Portfolio integration",
                ],
              },
              {
                step: "02",
                title: "Get Matched",
                description:
                  "Our revolutionary AI analyzes thousands of profiles to find your perfect teammates based on compatibility, skills, and project requirements.",
                icon: Target,
                color: "from-purple-500 to-pink-500",
                features: ["98% accuracy rate", "Real-time matching", "Compatibility scoring", "Smart recommendations"],
              },
              {
                step: "03",
                title: "Start Building",
                description:
                  "Connect with your matches, join events, and start building amazing projects together with integrated collaboration tools.",
                icon: Rocket,
                color: "from-pink-500 to-red-500",
                features: ["Team chat", "Project management", "Progress tracking", "Success analytics"],
              },
            ].map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 z-0 transform translate-y-4">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                  </div>
                )}

                <div className="relative z-10 text-center">
                  <div
                    className={`mx-auto mb-8 p-8 bg-gradient-to-r ${step.color} rounded-3xl w-fit shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2`}
                  >
                    <step.icon className="h-12 w-12 text-white" />
                  </div>

                  <div className="mb-6">
                    <span className="text-8xl font-black text-gray-200 group-hover:text-gray-300 transition-colors font-space-grotesk">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black mb-6 group-hover:text-indigo-600 transition-colors font-poppins text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-sm mx-auto font-outfit">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center justify-center space-x-2 text-sm text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-outfit">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-24">
            <Badge
              variant="outline"
              className="mb-6 px-6 py-3 text-indigo-600 border-indigo-200 bg-white/50 backdrop-blur-sm text-lg font-bold font-outfit"
            >
              <Heart className="mr-2 h-5 w-5" />
              Success Stories
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black mb-8 font-space-grotesk tracking-tight text-gray-900">
              Loved by Developers
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-outfit">
              Join thousands of successful developers who have found their perfect teammates and built amazing projects
              together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Raunak Jha",
                role: "Full Stack Developer",
                company: "TechCorp India",
                avatar: "/placeholder.svg?height=80&width=80",
                content:
                  "TeamForge completely transformed how I approach hackathons. I found my co-founder here and we've built 3 successful products together. The matching algorithm is incredibly accurate!",
                rating: 5,
                project: "Built AI healthcare app",
                achievement: "Won ₹40L in funding",
              },
              {
                name: "Soham Salvkar",
                role: "ML Engineer",
                company: "AI Labs Mumbai",
                avatar: "/placeholder.svg?height=80&width=80",
                content:
                  "I've participated in 12 hackathons through TeamForge and won 8 of them. The team chemistry is always perfect, and I've learned so much from my teammates. This platform is a game-changer!",
                rating: 5,
                project: "Created ML trading bot",
                achievement: "8/12 hackathon wins",
              },
              {
                name: "Ishaan H",
                role: "Product Designer",
                company: "Design Studio Bangalore",
                avatar: "/placeholder.svg?height=80&width=80",
                content:
                  "As a designer, finding developers who understand good UX was always challenging. TeamForge made it effortless. I've formed 5 successful teams and launched 2 products to market!",
                rating: 5,
                project: "Launched design system",
                achievement: "2 products in market",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="group border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-gradient-to-br from-white to-blue-50"
              >
                <CardHeader className="pb-6">
                  <div className="flex text-yellow-400 mb-6 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 fill-current animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <CardDescription className="text-lg leading-relaxed text-gray-700 text-center mb-6 font-outfit">
                    "{testimonial.content}"
                  </CardDescription>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6">
                    <div className="text-sm font-bold text-indigo-600 mb-1 font-poppins">Latest Achievement</div>
                    <div className="text-sm text-gray-600 font-outfit">{testimonial.project}</div>
                    <div className="text-xs text-green-600 font-bold mt-1 font-jetbrains-mono">
                      {testimonial.achievement}
                    </div>
                  </div>
                </CardHeader>

                <div className="px-6 pb-6">
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-poppins font-bold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <div className="font-black text-lg font-poppins text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 font-outfit">{testimonial.role}</div>
                      <div className="text-xs text-indigo-600 font-bold font-jetbrains-mono">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-6 px-6 py-3 text-indigo-600 border-indigo-200 bg-white/50 backdrop-blur-sm text-lg font-bold font-outfit"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Creative Communities
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight font-space-grotesk tracking-tight text-gray-900">
              Find Teams Across
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                All Creative Fields
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-outfit">
              Whether you're a musician, artist, dancer, developer, designer, writer, photographer, or entrepreneur—find
              your perfect collaborators on TeamForge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Music,
                name: "Music",
                description:
                  "Producers, singers, composers, and musicians collaborating on albums, beats, and performances",
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50",
                count: "2.3K",
              },
              {
                icon: Palette,
                name: "Arts",
                description:
                  "Visual artists, illustrators, and designers creating stunning digital and traditional art",
                color: "from-pink-500 to-rose-500",
                bgColor: "from-pink-50 to-rose-50",
                count: "1.8K",
              },
              {
                icon: Dance,
                name: "Dance",
                description: "Choreographers and dancers exploring contemporary, classical, and fusion movements",
                color: "from-red-500 to-orange-500",
                bgColor: "from-red-50 to-orange-50",
                count: "1.2K",
              },
              {
                icon: Code,
                name: "Development",
                description: "Full-stack developers, frontend wizards, and backend engineers building amazing software",
                color: "from-blue-500 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50",
                count: "5.1K",
              },
              {
                icon: Palette,
                name: "Design",
                description: "UI/UX designers and creative directors crafting beautiful digital experiences",
                color: "from-cyan-500 to-teal-500",
                bgColor: "from-cyan-50 to-teal-50",
                count: "1.9K",
              },
              {
                icon: PenTool,
                name: "Writing",
                description: "Authors, content creators, and storytellers sharing their words with the world",
                color: "from-orange-500 to-amber-500",
                bgColor: "from-orange-50 to-amber-50",
                count: "1.5K",
              },
              {
                icon: Camera,
                name: "Photography",
                description: "Photographers and videographers capturing and editing stunning visual content",
                color: "from-amber-500 to-yellow-500",
                bgColor: "from-amber-50 to-yellow-50",
                count: "0.9K",
              },
              {
                icon: Briefcase,
                name: "Business",
                description: "Entrepreneurs and business strategists building startups and ventures together",
                color: "from-green-500 to-emerald-500",
                bgColor: "from-green-50 to-emerald-50",
                count: "2.1K",
              },
            ].map((category, index) => (
              <Link key={index} href={`/discover?category=${category.name.toLowerCase()}`}>
                <Card
                  className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-gradient-to-br ${category.bgColor} backdrop-blur-sm cursor-pointer h-full`}
                >
                  <CardHeader className="text-center pb-8">
                    <div
                      className={`mx-auto mb-6 p-4 bg-gradient-to-r ${category.color} rounded-2xl w-fit shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-black group-hover:text-indigo-600 transition-colors font-space-grotesk text-gray-900">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-gray-700 font-outfit mt-3">
                      {category.description}
                    </CardDescription>
                    <div className="mt-6 flex items-center justify-center gap-2 text-indigo-600 font-semibold font-poppins">
                      <span>{category.count} active</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 font-outfit mb-8">
              Don't see your field?{" "}
              <span className="text-indigo-600 font-semibold">We're adding more categories every month</span>
            </p>
            <Link href="/discover">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-2xl font-outfit font-semibold"
              >
                Explore All Communities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl lg:text-8xl font-black text-white mb-8 leading-tight font-space-grotesk tracking-tight">
              Ready to Find Your
              <span className="block text-yellow-300">Dream Team?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto leading-relaxed font-outfit">
              Join 25,000+ developers, designers, and innovators who are building the future together on TeamForge. Your
              next breakthrough project is just one match away.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="group text-xl px-12 py-6 bg-white text-indigo-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 rounded-2xl font-black font-outfit"
                >
                  <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  Start Building Teams
                  <Heart className="ml-3 h-6 w-6 text-red-500 group-hover:animate-pulse" />
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-2xl bg-transparent font-bold font-outfit"
                >
                  <Calendar className="mr-3 h-6 w-6" />
                  Browse Events
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-indigo-200">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span className="text-lg font-medium font-outfit">Free to start</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span className="text-lg font-medium font-outfit">No credit card required</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span className="text-lg font-medium font-outfit">Join in 60 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-xl">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <span className="text-3xl font-black font-space-grotesk">TeamForge</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg max-w-md font-outfit">
                The revolutionary platform that connects developers, designers, and innovators to build amazing projects
                together. Join the future of collaborative development.
              </p>
              <div className="flex space-x-6">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Mail, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  >
                    <social.icon className="h-5 w-5 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black mb-8 text-xl text-white font-poppins">Product</h3>
              <ul className="space-y-4 text-gray-400">
                {["Features", "Pricing", "API", "Integrations", "Mobile App"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block font-outfit"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-8 text-xl text-white font-poppins">Company</h3>
              <ul className="space-y-4 text-gray-400">
                {["About", "Blog", "Careers", "Press", "Partners"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block font-outfit"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-8 text-xl text-white font-poppins">Support</h3>
              <ul className="space-y-4 text-gray-400">
                {["Help Center", "Contact", "Privacy", "Terms", "Security"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block font-outfit"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-12 flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400 mb-6 lg:mb-0 text-center lg:text-left font-outfit">
              &copy; 2024 TeamForge. All rights reserved. Made with ❤️ for developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
