import { SafeIcon } from './components/SafeIcon';
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

// Squiggle SVG Component
const Squiggle = ({ className, color = "#818cf8" }) => (
  <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 50 Q 30 10, 50 50 T 90 50 T 130 50 T 170 50"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
      className="squiggle-path"
    />
  </svg>
)

// 3D Character Face Component
const CharacterFace = () => (
  <div className="relative w-48 h-48 md:w-64 md:h-64 sphere-3d rounded-full flex items-center justify-center">
    {/* Eyes */}
    <div className="absolute flex gap-8 md:gap-12 top-1/3">
      <div className="w-8 h-8 md:w-12 md:h-12 bg-indigo-950 rounded-full flex items-center justify-center">
        <div className="w-6 h-6 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center">
          <SafeIcon name="star" size={24} className="text-indigo-600 fill-indigo-600" />
        </div>
      </div>
      <div className="w-8 h-8 md:w-12 md:h-12 bg-indigo-950 rounded-full flex items-center justify-center">
        <div className="w-6 h-6 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center">
          <SafeIcon name="star" size={24} className="text-indigo-600 fill-indigo-600" />
        </div>
      </div>
    </div>
    {/* Mouth */}
    <div className="absolute top-2/3 w-6 h-8 md:w-8 md:h-10 bg-indigo-950 rounded-full"></div>
    {/* Highlight */}
    <div className="absolute top-4 left-8 w-12 h-8 bg-white/30 rounded-full blur-xl"></div>
  </div>
)

// Pink Stamp Component
const PartyStamp = () => (
  <motion.div
    className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 w-24 h-24 md:w-32 md:h-32 bg-pink-400 rounded-full flex items-center justify-center stamp-rotate border-4 border-dashed border-pink-600"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
  >
    <div className="text-center">
      <div className="text-indigo-900 font-display text-xs md:text-sm tracking-wider rotate-12">FLOW</div>
      <div className="text-indigo-900 font-display text-xl md:text-2xl font-bold rotate-12">PARTY</div>
    </div>
  </motion.div>
)

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div className="min-h-screen bg-indigo-600 overflow-x-hidden" ref={containerRef}>
      {/* HEADER - Block 1 */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="font-display text-2xl md:text-3xl text-lime-400 tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            FLOW PARTY
          </motion.div>

          {/* Center Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute left-1/2 transform -translate-x-1/2 bg-lime-400 hover:bg-lime-300 text-indigo-900 px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon name="menu" size={20} />
            <span className="hidden md:inline">MENU</span>
          </motion.button>

          {/* Right Buttons */}
          <motion.div
            className="flex items-center gap-2 md:gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button className="hidden md:block text-white/80 hover:text-white text-sm font-semibold transition-colors px-4 py-2 border border-white/30 rounded-full hover:border-white/60">
              JOIN COMMUNITY
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-4 md:px-6 py-2 rounded-full font-bold text-sm transition-all hover:scale-105">
              ENROLL NOW
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-indigo-600/95 backdrop-blur-lg z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-2"
          >
            <SafeIcon name="x" size={32} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="font-display text-4xl text-white hover:text-lime-400 transition-colors">ABOUT</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="font-display text-4xl text-white hover:text-lime-400 transition-colors">FEATURES</a>
            <a href="#community" onClick={() => setIsMenuOpen(false)} className="font-display text-4xl text-white hover:text-lime-400 transition-colors">COMMUNITY</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="font-display text-4xl text-white hover:text-lime-400 transition-colors">CONTACT</a>
          </nav>
        </motion.div>
      )}

      {/* HERO SECTION - Block 2 */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4 overflow-hidden">
        {/* Background Squiggles */}
        <Squiggle className="absolute top-32 left-4 w-32 h-16 md:w-48 md:h-24 opacity-80 rotate-12" />
        <Squiggle className="absolute bottom-32 right-4 w-40 h-20 md:w-56 md:h-28 opacity-60 -rotate-12" />
        <Squiggle className="absolute top-1/2 right-8 w-24 h-12 opacity-40 rotate-45 hidden md:block" />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Giant FLOW Text */}
          <div className="relative flex items-center justify-center">
            <motion.h1
              className="font-display text-[20vw] md:text-[18vw] lg:text-[16vw] leading-none text-white tracking-tighter select-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ y }}
            >
              FLOW
            </motion.h1>

            {/* Center Character */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CharacterFace />
            </div>

            {/* Party Stamp */}
            <div className="absolute top-1/2 left-1/2 transform translate-x-8 translate-y-8 md:translate-x-24 md:translate-y-16">
              <PartyStamp />
            </div>
          </div>

          {/* Tagline */}
          <motion.div
            className="text-center mt-8 md:mt-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
              THE FLOW PARTY IS A <span className="text-lime-400 font-bold italic">safe</span>, INCLUSIVE, AND FUN SPACE FOR WEBSITE DEVELOPERS AND <span className="italic">designers</span>.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              className="bg-lime-400 hover:bg-lime-300 text-indigo-900 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all shadow-xl hover:shadow-2xl group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon name="sparkles" size={20} className="group-hover:rotate-12 transition-transform" />
              JOIN THE PARTY
              <SafeIcon name="arrow-right" size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION - Block 3 */}
      <section id="about" className="relative py-24 md:py-32 px-4 bg-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/90 text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">
              Flow Party is a <span className="text-lime-400 font-bold">safe</span>, inclusive, and fun space for website developers and designers. We believe in creating an environment where creativity flows freely and everyone feels welcome to share their work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative py-24 md:py-32 px-4 bg-indigo-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6">
              WHY JOIN <span className="text-pink-400">THE PARTY?</span>
            </h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Everything you need to grow as a creative professional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-indigo-500/50 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 hover:border-lime-400/50 transition-all hover:transform hover:scale-105 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <SafeIcon name="users" size={32} className="text-indigo-900" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">COMMUNITY</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Connect with like-minded creatives who share your passion for design and development.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-indigo-500/50 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 hover:border-pink-400/50 transition-all hover:transform hover:scale-105 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform">
                <SafeIcon name="sparkles" size={32} className="text-indigo-900" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">RESOURCES</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Access exclusive tutorials, templates, and tools to accelerate your creative workflow.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-indigo-500/50 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 hover:border-white/50 transition-all hover:transform hover:scale-105 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <SafeIcon name="zap" size={32} className="text-indigo-900" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">EVENTS</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Join live workshops, design challenges, and networking events every week.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section id="community" className="relative py-24 md:py-32 px-4 bg-indigo-800 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 border border-white/20">
              <SafeIcon name="message-circle" size={16} />
              TESTIMONIALS
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-white">
              WHAT MEMBERS <span className="text-lime-400">SAY</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xl">
                  A
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Alex Chen</div>
                  <div className="text-white/60 text-sm">UI Designer</div>
                </div>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                "Flow Party completely transformed how I approach design. The community is incredibly supportive and I've learned so much from the workshops."
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} name="star" size={20} className="text-lime-400 fill-current" />
                ))}
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xl">
                  S
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Sarah Miller</div>
                  <div className="text-white/60 text-sm">Frontend Dev</div>
                </div>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                "The best community I've ever joined! The resources are top-notch and the networking opportunities have led to actual client work."
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} name="star" size={20} className="text-lime-400 fill-current" />
                ))}
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xl">
                  M
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Marcus Johnson</div>
                  <div className="text-white/60 text-sm">Full Stack Dev</div>
                </div>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                "Finally found a space where designers and developers actually collaborate instead of working in silos. Highly recommend!"
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} name="star" size={20} className="text-lime-400 fill-current" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 md:py-32 px-4 bg-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800"></div>
        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
            READY TO <span className="text-lime-400">FLOW</span> WITH US?
          </h2>
          <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Join hundreds of creative professionals who are already part of the party. Your seat is waiting!
          </p>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.button
              className="bg-lime-400 hover:bg-lime-300 text-indigo-900 px-10 py-5 rounded-full font-bold text-xl flex items-center gap-3 transition-all shadow-2xl hover:shadow-lime-400/50 group w-full md:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon name="sparkles" size={24} className="group-hover:rotate-12 transition-transform" />
              JOIN FLOW PARTY
              <SafeIcon name="arrow-right" size={24} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
          <p className="text-white/50 text-sm mt-8">
            No credit card required • Free to join • Cancel anytime
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-indigo-900 border-t border-white/10 py-12 px-4 telegram-safe-bottom">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
                <SafeIcon name="sparkles" size={20} className="text-indigo-900" />
              </div>
              <span className="font-display text-2xl text-white">FLOW PARTY</span>
            </div>
            <div className="flex items-center gap-6 text-white/60">
              <a href="#" className="hover:text-lime-400 transition-colors text-sm font-semibold">Privacy</a>
              <a href="#" className="hover:text-lime-400 transition-colors text-sm font-semibold">Terms</a>
              <a href="#" className="hover:text-lime-400 transition-colors text-sm font-semibold">Contact</a>
            </div>
            <div className="text-white/40 text-sm">
              © 2024 Flow Party. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}