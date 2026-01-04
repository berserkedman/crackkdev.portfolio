import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'
import { ProjectDetail } from './pages/ProjectDetail'
import './styles/globals.css'

* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  tap-highlight-color: rgba(0,0,0,0);
}

*:focus {
  outline: none !important;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Админка — без хедера/футера */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Страница проекта */}
        <Route path="/projects/:slug" element={
          <>
            <Header />
            <main>
              <ProjectDetail />
            </main>
            <Footer />
          </>
        } />
        
        {/* Главная страница */}
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Home />
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
