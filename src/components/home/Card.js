import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/utils/ContextReducer";
import Link from "next/link";

//const sizelist=["regular", "medium", "large"]

const Card = (props) => {
  const foodData = props.food;
  const sizelist = Object.keys(foodData.price);
  const { state, dispatch } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(sizelist[0]);
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  let finalPrice = qty * parseInt(foodData.price[size]);
  const handleAddToCart =async () => {
    const updateData =await state.find((data) => data.tempId === foodData['_id']+ size);

    if (!updateData) {
      dispatch({
        case: "ADD",
        id: foodData['_id'],
        tempId: foodData['_id'] + size,
        name: foodData.name,
        price: finalPrice,
        qty: qty,
        sizelist: size,
        img: foodData.img,
      });
    }
    if (updateData) {
      dispatch({
        case: "UPDATE",
        
        tempId: foodData['_id'] + size,

        price: finalPrice,
        qty: qty,
      });
    }
  };
  return (
    <div className="box">
      <div className="w-80 rounded-lg bg-gray-100 text-black  dark:bg-black dark:text-white border-gradient overflow-hidden p-0.5 ">
        <Link href={{pathname:"Slug/[slug"}} as={`Slug/${foodData["_id"]}`}>
        <div className="relative w-full h-80 border-2 border-black dark:border-none  ">
          <Image
            src={foodData.img}
            alt="burger"
            fill
          sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw"
          />
        </div></Link>
        <div className="p-4">
          <div className="uppercase font-bold text-xl font-serif ">
            {foodData.name}
          </div>
          <p className="font-light short_description">
            {foodData.description}
          </p>
        </div>
        <div className="flex justify-between ">
          <select
            onChange={handleQty}
            className="h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-white border-2 border-black dark:border-gray-400 rounded mx-2"
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            onChange={handleSize}
            className="h-100 uppercase p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-white border-2 border-black dark:border-gray-400 rounded mx-2"
          >
            {sizelist.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleAddToCart}
            className=" text-black hover:font-bold font-semibold    px-2 py-1 my-6 border-2 border-black  rounded-md bg-gradient-to-r from-teal-400  via-lime-500 to-lime-400 mx-2  hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 hover:scale-110"
          >
            AddCart
          </button>
          <p className="my-6 p-2 mx-2 text-black font-semibold dark:text-white"> {finalPrice}৳</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
