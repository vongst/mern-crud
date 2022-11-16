// import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

// export function fetchArticleDetails() {
//   return function(dispatch: (arg0: any) => void) {
//     return axios.get("https://api.myjson.com/bins/19dtxc")
//       .then(({ data }) => {
//       dispatch(setArticleDetails(data));
//     });
//   };
// }
