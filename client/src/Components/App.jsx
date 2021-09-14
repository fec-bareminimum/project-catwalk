import React from 'react';

const title = 'Hello React';

function App() {
  return <div>{title}</div>;
}

//cart provider
export default App;


// //<CartProvider>
// {cartVisible && <Cart onHideCart={hideCartHandler} />}
// <Header onShowCart={showCartHandler} />
// <main>
//   <Meals />
// </main>
// </CartProvider>