import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import KeywordsPage from "./Pages/KeywordsPage";
import "./App.css";
import WhatIKnowPage from "./Pages/WhatIKnowPage";
import IntroSection from "./Pages/IntroSection";
import Skills from "./Pages/Skills";
import BlurredFooter from "./Pages/BlurredFooter";
import Projects from "./Pages/Projects";
import { ReactLenis } from "lenis/react";
const App = () => {
  return (
    <ReactLenis root>
      <Header />
      <HomePage />
      <IntroSection />
      <Skills />
      <Projects />
      <WhatIKnowPage />
      <KeywordsPage />
      <BlurredFooter className=" text-center text-2xl md:text-3xl font-semibold" />
    </ReactLenis>
  );
};

export default App;
