import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfessionalChatbot from './components/ProfessionalChatbot';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Teams from './pages/Teams';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import ProjectBuilder from './pages/ProjectBuilder';
import Milestones from './pages/Milestones';
import VoiceBotAI from './pages/VoiceBotAI';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/project-builder" element={<ProjectBuilder />} />
              <Route path="/milestones" element={<Milestones />} />
              <Route path="/voice-bot-ai" element={<VoiceBotAI />} />
            </Routes>
          </main>
          <Footer />
          <ProfessionalChatbot />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;