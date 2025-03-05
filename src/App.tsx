import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import KeywordsPage from "./Pages/KeywordsPage";
import "./App.css";
import WhatIKnowPage from "./Pages/WhatIKnowPage";
import IntroSection from "./Pages/IntroSection";
import Skills from "./Pages/Skills";
import BlurredFooter from "./Pages/BlurredFooter";
const App = () => {
  return (
    <>
      <Header />
      <HomePage />
      <IntroSection />
      <Skills />
      <WhatIKnowPage />
      <KeywordsPage />
      <BlurredFooter className=" text-center text-2xl md:text-3xl font-semibold" />
    </>
  );
};

export default App;
