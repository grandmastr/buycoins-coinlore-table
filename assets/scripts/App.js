const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const tableBody = document.querySelector('#tableBody');

// fetching data asynchronously from the coinlore endpoint
// asynchronously fetching data from the coinlore API, all 100 at once
const getData = async () => {
  try {
    const response = await fetch('https://api.coinlore.com/api/tickers/');
    return response.json();
  } catch (e) {
    throw new Error(e);
  }
};

// declaring and initializing the data and active page variables
let wholeData = [];
let activePage = 1;

const paginate = async () => {
  // this is to control the visibility of the navigation buttons
  if (activePage === wholeData.length / 10) {
    next.style.visibility = 'hidden';
  } else next.style.visibility = 'visible';

  if (activePage === 1) {
    prev.style.visibility = 'hidden';
    console.log(activePage);
  } else prev.style.visibility = 'visible';

  try {
    // if an api call has not been made, this section makes sure it is made, and if it has been made, this block makes sure, It is not made again
    if (wholeData.length === 0) {
      prev.style.visibility = 'hidden';
      const { data } = await getData();
      wholeData = [...data];
    }

    let res = '';
    const sliceFrom = activePage * 10 - 10;
    const sliceTo = activePage * 10;
    wholeData
      .slice(sliceFrom, sliceTo)
      .forEach(
        coin =>
          (res += `<tr><td>${coin['name']}</td><td>${coin['symbol']}</td><td>$${coin['price_usd']}</td><td>${coin['tsupply']} ${coin['symbol']}</td></tr>`)
      );
    tableBody.innerHTML = res;
  } catch (e) {
    throw new Error(e);
  }
};

paginate();

// handling click event from the navigation buttons
next.addEventListener('click', () => {
  activePage += 1;
  paginate();
});

prev.addEventListener('click', () => {
  activePage -= 1;
  paginate();
});
