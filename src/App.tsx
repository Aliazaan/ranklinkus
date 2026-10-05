import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { PageTransition } from './components/PageTransition'
import { ScrollToTop } from './components/ScrollToTop'
import About from './pages/About'
import ArmourTech from './pages/ArmourTech'
import Businesses from './pages/Businesses'
import Contact from './pages/Contact'
import Cortexley from './pages/Cortexley'
import DadaSons from './pages/DadaSons'
import Home from './pages/Home'
import Industries from './pages/Industries'
import InsightArticle from './pages/InsightArticle'
import Insights from './pages/Insights'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import Solutions from './pages/Solutions'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/businesses/dada-sons" element={<DadaSons />} />
            <Route path="/businesses/armour-tech" element={<ArmourTech />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cortexley" element={<Cortexley />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}
