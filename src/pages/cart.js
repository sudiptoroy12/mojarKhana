import { CartContext } from "@/utils/ContextReducer";
import React, { useContext } from "react";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const handleCheckout =async () => {
    const email = localStorage.getItem("myemail")
    const order_data = state
    const order_date = new Date().toDateString()
    const data = {email,order_data,order_date}
    const res = await fetch("api/orderData",{method:"POST",
        headers:{
       "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
       })
       let response=await res.json()

       console.log(response)
       if(response.success){
        
 dispatch({ case: "DROP" });
       }
      
   
  };
  let totalPrice = state.reduce((total, data) => total + data.price, 0);
  return (
    <div
      style={{ minHeight: "90vh" }}
      className="flex items-center mx-10 justify-center"
    >
      <div className="container mx-auto flex items-center p-8 flex-col  text-black dark:text-white box">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="min-w-full text-left text-md  border-gradient  bg-gray-200 dark:bg-black rounded-lg ">
            {state.length >= 1 ? (
              <>
                
                <table className="">
                  <thead className="border-b border-black dark:border-lime-400 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">#</div>
                      </th>
                      <th scope="col" className=" py-3">
                        <div className="flex items-center">Product name</div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">Size</div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">Quantity</div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">Price</div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.map((data, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row" className="px-6 py-4 ">
                            {index + 1}
                          </th>
                          <td className="py-4">{data.name}</td>
                          <td className="px-6 py-4">{data.size}</td>
                          <td className="px-6 py-4 flex items-center justify-center">
                            <svg
                              onClick={() => {
                                if (data.qty >= 1) {
                                  dispatch({
                                    case: "DECREMENT",
                                    tempId: data.tempId,
                                    unitPrice: data.price / data.qty,
                                  });
                                }
                                if (data.qty <= 1) {
                                  dispatch({
                                    case: "DELETE",
                                    index: index,
                                  });
                                }
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            {data.qty}
                            <svg
                              onClick={() => {
                                dispatch({
                                  case: "INCREMENT",
                                  tempId: data.tempId,
                                  unitPrice: data.price / data.qty,
                                });
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </td>
                          <td className="px-6 py-4">{data.price} ৳</td>
                          <td className="px-6 py-4">
                            <a className="font-medium text-red-700 hover:underline">
                              <svg
                                onClick={() => {
                                  dispatch({
                                    case: "DELETE",
                                    index: index,
                                  });
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                />
                              </svg>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  
                    
                </table>
                <div className="flex flex-col ">
                <p className="my-6 p-2 mx-auto font-bold text-green-700">
                      Total price: {totalPrice} ৳{" "}
                    </p>
                    <button
                      onClick={handleCheckout}
                      className=" text-black hover:font-bold font-semibold   border-2 border-black  rounded-lg bg-gradient-to-r from-teal-400  via-lime-500 to-lime-400 px-1 py-1 mb-4 mx-6  hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400"
                    >
                      Checkout
                    </button>
                </div>
              </>
            ) : (
              <div className="border-gradient p-10 bg-gray-200 text-black rounded-lg dark:bg-slate-950 dark:text-white">
                EMPTY CART!!!!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
