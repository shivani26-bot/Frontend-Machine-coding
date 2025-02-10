// import { useEffect, useState } from "react";
// import "./App.css";
// //frontend driven
// function App() {
//   const [products, setProducts] = useState([]);
//   // render 10 products on each pageXOffset, total of 10 pages
//   // limit=10 and skip =10 it means display products from 11 to 20 and skip the previous 0 to 10
//   const [page, setPage] = useState(1);
//   const fetchProducts = async () => {
//     const response = await fetch("https://dummyjson.com/products?limit=100");
//     const data = await response.json();
//     console.log(data);
//     if (data && data.products) setProducts(data.products);
//   };

//   console.log("products", products);
//   const array = [...Array(products.length / 10)];
//   console.log("array", array);
//   //   OUTPUT
//   // array (10) [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
//   // 0:undefined
//   // 1: undefined
//   // 2: undefined
//   // 3: undefined
//   // 4: undefined
//   // 5: undefined
//   // 6: undefined
//   // 7: undefined
//   // 8: undefined
//   // 9: undefined
//   // runs one time only when component is rendered;
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const selectedPageHandler = (selectedPage) => {
//     if (
//       selectedPage >= 1 &&
//       selectedPage <= products.length / 10 &&
//       selectedPage !== page
//     )
//       // console.log(page);
//       setPage(selectedPage);
//   };

//   // const prevPageHandler = (page) => {
//   //   if (page > 1) setPage(page - 1);
//   //   // else return;
//   // };
//   // const nextPageHandler = (page) => {
//   //   if (page < products.length / 10) setPage(page + 1);
//   //   // else return;
//   // };

//   return (
//     <div>
//       {products.length > 0 && (
//         <div className="products">
//           {products.slice(page * 10 - 10, page * 10).map((prod) => {
//             // setPage(page + 1);
//             return (
//               <span className="single__product" key={prod.id}>
//                 <img src={prod.thumbnail} alt={prod.title} />
//                 <p>{prod.title}</p>
//               </span>
//             );
//           })}
//         </div>
//       )}
//       {products.length > 0 && (
//         <div className="pagination">
//           {" "}
//           <img
//             // onClick={() => prevPageHandler(page)}
//             onClick={() => selectedPageHandler(page - 1)}
//             // className="arrow"
//             className={page > 1 ? "arrow" : "arrow_disable arrow"}
//             src="./arrow-left.png"
//             alt=""
//           />{" "}
//           {/* [...Array(products.length / 10)] is an array filled with undefined values.*/}
//           {/* used in pagination to display page numbers. */}
//           {/* first parameter (_) is the current element in the array, which is ignored (hence the use of _). */}
//           {/* The second parameter (i) is the index of the current element. */}
//           {[...Array(products.length / 10)].map((_, i) => {
//             return (
//               <span
//                 // className="single__pagenumber"
//                 className={
//                   page === i + 1
//                     ? "pagination__selected single__pagenumber"
//                     : "single__pagenumber"
//                 }
//                 onClick={() => selectedPageHandler(i + 1)}
//                 key={i}
//               >
//                 {i + 1}
//               </span>
//             );
//           })}
//           <span>
//             {" "}
//             <img
//               // onClick={() => nextPageHandler(page)}
//               onClick={() => selectedPageHandler(page + 1)}
//               // className="arrow"
//               className={
//                 page < products.length / 10 ? "arrow" : "arrow_disable arrow"
//               }
//               style={{ marginTop: "7px" }}
//               src="./arrow-right.png"
//               alt=""
//             />
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// // https://dummyjson.com/products
// // https://dummyjson.com/products?limit=10
// // limit parameter is to display the limited amount of products

import { useEffect, useState } from "react";
import "./App.css";
//backend driven, we don't the number of products or the limit of the products fetched from the backend

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    console.log("data", data);
    if (data && data.products) {
      setProducts(data.products);
      // data.total tells the total number of products
      setTotalPages(Math.ceil(data.total / 10));
    }
  };

  console.log("products", products);

  // now whenever we change the page we need to call the fetchproduct

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="single__product" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <p>{prod.title}</p>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          {" "}
          <img
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? "arrow" : "arrow_disable arrow"}
            src="./arrow-left.png"
            alt=""
          />{" "}
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={
                  page === i + 1
                    ? "pagination__selected single__pagenumber"
                    : "single__pagenumber"
                }
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span>
            {" "}
            <img
              onClick={() => selectedPageHandler(page + 1)}
              className={page < totalPages ? "arrow" : "arrow_disable arrow"}
              style={{ marginTop: "7px" }}
              src="./arrow-right.png"
              alt=""
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
