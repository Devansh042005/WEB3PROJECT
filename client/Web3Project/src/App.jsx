import { useState } from 'react';

import {Navbar , Welcome , Services , Footer , Transactions} from './Components';
function App() {
  

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
