let data = [];
let container = document.getElementById("container");
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((response) => {
    data = response;
    data.forEach((val) => {
      // ratings are given in floating point in api response
      let coloredRatingStar = parseInt(val.rating.rate);
      let notColoredRatingStar = 5 - coloredRatingStar;
      let tempDiv = document.createElement("div");
      let allStarDiv = document.createElement("div");
      allStarDiv.setAttribute("class", "all-star");
      allStarDiv.setAttribute("id", "all-star");
      for (let i = 0; i < coloredRatingStar; i++) {
        allStarDiv.innerHTML += ` <span class="star-filled">&#9733;</span>`;
      }
      for (let i = 0; i < notColoredRatingStar; i++) {
        allStarDiv.innerHTML += ` <span class="star-notfilled">&#9734;</span>`;
      }
      tempDiv.appendChild(allStarDiv);
      container.innerHTML += `
      <div class="card">
      <img 
        src="${val.image}"
        alt="image"
        class="img"
      />
      <div class="product-details">
        <span class="product-name">
          ${val.title}
        </span>
        <span class="product-category">${val.category}</span>
     ${tempDiv.innerHTML}
        <p class="rating-count">Rating Count:${val.rating.count}</p>
      </div>
      <div class="btn"><button class="buy-btn">Buy Now</button></div>
    </div>
        `;
    });
  });
