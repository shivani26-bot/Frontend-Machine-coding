//API: https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbXhlVk1YWnlscDVDM1FnUU4xeXhIUkdBNUtsQXxBQ3Jtc0trRDl1QlJxQmN5elFvZ2pUZ0oza2VmNmN4OWg3MmJEeXc2RDNtMlE0bnZ0bnJtdS1vRnk2WThzRDNzbF9Za1RvWkVqcUdpemVhNk9neUEyX052WUEyZktHY2dWU1Q5R0x3UGdoaFVIczViVG84QWw3aw&q=https%3A%2F%2Fapi.coingecko.com%2Fapi%2Fv3%2Fcoins%2Fmarkets%3Fvs_currency%3Dinr%26order%3Dmarket_cap_desc%26per_page%3D100%26page%3D1%26sparkline%3Dfalse&v=1z_PTw_mOCw
let data = [];
const cardContainer = document.getElementById("card-container");
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false";
document.addEventListener("DOMContentLoaded", function (event) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      data = res;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        cardContainer.innerHTML += `<div class="card">
        <div class="image">
        <img class="bitcoin-img" src=${data[i].image}/>
        </div>
        <div class="details">
        <div class="row">
        <span>${data[i].name}</span>
         <span>${data[i].current_price}</span>
        </div>
         <div class="row">
        <span>${data[i].symbol}</span>
         <span class="percent">${data[i].market_cap_change_percentage_24h}%</span>
        </div>
        </div>
        </div>`;
      }
    });
});

// function cryptocurrency(event) {
//   fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//       data = res;
//       console.log(data);
//       for (let i = 0; i < data.length; i++) {
//         cardContainer.innerHTML += `<div class="card">
//           <div class="image">
//           <img class="bitcoin-img" src="data[i].image"/>
//           </div>
//           </div>`;
//       }
//     });
// }

// cryptocurrency();
