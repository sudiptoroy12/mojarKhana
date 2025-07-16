import localFont from "next/font/local";
import Carouselpic from "@/components/home/Carousel";
import Card from "@/components/home/Card";

import { useState } from "react";
import Login from "./login";
import { baseUrl } from "../utils/baseUrl";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home(props) {
  let catagories = new Set();
  const foodData = [];
  const handleData = () => {
    props.datas?.map((data) => {
      return foodData.push(data), catagories.add(data.category);
    });
  };
  handleData()
// export default function Home(props) {
//   let catagories = new Set();
//   const foodData = [];

  
//     props.datas.map((data,index) => {
//       return <li key={index}>{foodData.push(data)}</li> 
//     });

  
//     props.datas.map((data,index) => {
//       return <li key={index}>{catagories.add(data.category)}</li>  ;
//     });


  const cataArray = [...catagories];
  const [filter, setFilter] = useState(false);

  return (
    <>
      <Head>
        <title>MojarKhana</title>
      </Head>
      <Carouselpic />
      <div className="container mx-auto">
        <div className="text-white my-6 mx-14 space-x-6">
          <button
            onClick={() => {
              setFilter(false);
            }}
            className={`border border-white rounded-lg py-2 px-2 ${
              !filter && "bg-gray-400  text-black font-bold"
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilter("Veg");
            }}
            className={`border border-white rounded-lg py-2 px-2 ${
              filter === "Veg" && "bg-gray-400  text-black font-bold "
            }`}
          >
            Veg
          </button>
          <button
            onClick={() => {
              setFilter("Non-Veg");
            }}
            className={`border border-white rounded-lg py-2 px-2 ${
              filter == "Non-Veg" && "bg-gray-400 text-black font-bold "
            }`}
          >
            Non-Veg
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        {cataArray.map((category) => {
          return (
            <>
              <div
                key={category}
                className="text-4xl mt-8 font-extrabold uppercase mb-4 text-gray-100 mx-14"
              >
                {category}
              </div>
              <hr className="border-gray-700 border-1 mx-14" />
              <div className="flex flex-col items-center justify-center ">
                <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                  {foodData
                    .filter((food) => category === food.category)
                    .filter((food) =>
                      filter ? filter === food.foodType : food
                    )
                    .map((data) => {
                      return <Card key={data.name} food={data} />;
                    })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let datas;
  try {
    let foodData = await fetch(baseUrl + "api/data", { method: "GET" })
      .then((foodData) => foodData.json())
      .catch((error) => error.message);
    datas = await JSON.parse(JSON.stringify(foodData));
  } catch (error) {
    console.log(error.message);
  }
  return {
    props: { datas: datas.data || null },
  };
}
