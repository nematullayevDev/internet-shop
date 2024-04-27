import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { GrAppsRounded } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";

//
function Products() {
  const [price, setPrice] = useState(1000);
  const [shipping, setShipping] = useState(false);
  const [data, setData] = useState([]);
  //
  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const componyRef = useRef(null);
  const sortRef = useRef(null);

  async function getData(
    url = "https://strapi-store-server.onrender.com/api/products"
  ) {
    try {
      const res = await fetch(url);
      const responseData = await res.json();
      setData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //
  function handleFilter() {}

  function handleClear() {
    searchRef.current.value = null;
    categoryRef.current.value = null;
    componyRef.current.value = null;
    sortRef.current.value = null;
    setPrice(1000);
    setShipping(false);
  }

  return (
    <div className="w-3/5 mx-auto mt-20">
      <div className="filter p-4 bg-primary-content rounded-md ">
        <div className="filter-top flex justify-between gap-3">
          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="search" className="cursor-pointer">
              Search Product
            </label>
            <input
              type="search"
              className="input input-bordered w-full  input-sm"
              id="search"
              ref={searchRef}
            />
          </div>

          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="search" className="cursor-pointer">
              Select Category
            </label>
            <select
              ref={categoryRef}
              className="select select-bordered w-full max-w-xs select-sm"
            >
              <option value={"all"}>all</option>
              <option value={"Tables"}>Tables</option>
              <option value={"Chairs"}>Chairs</option>
              <option value={"Kids"}>Kids</option>
              <option value={"Sofa"}>Sofas</option>
              <option value={"Bads"}>Bads</option>
            </select>
          </div>

          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="search" className="cursor-pointer">
              Search Compony
            </label>
            <select
              ref={componyRef}
              className="select select-bordered w-full max-w-xs select-sm"
            >
              <option selected value={"all"}>
                all
              </option>
              <option value={"Modenza"}>Modenza</option>
              <option value={"Luxora"}>Luxora</option>
              <option value={"Artifex"}>Artifex</option>
              <option value={"Comfore"}>Comfora</option>
              <option value={"Homestrad"}>Homestead</option>
            </select>
          </div>

          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="search" className="cursor-pointer">
              Sort By
            </label>
            <select
              ref={sortRef}
              className="select select-bordered w-full max-w-xs select-sm"
            >
              <option selected value={"a-z"}>
                a-z
              </option>
              <option value={"z-a"}>z-a</option>
              <option value={"high"}>high</option>
              <option value={"low"}>low</option>
            </select>
          </div>
        </div>

        <div className="filter-bottom flex justify-between gap-3 mt-10 items-center">
          <div className="range-inputs  w-1/4">
            <div className="range-title flex justify-between items-center mb-2">
              <p>Select Price</p>
              <p>${price}</p>
            </div>

            <div className="range-field">
              {" "}
              <input
                type="range"
                min={0}
                max="1000"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="range range-primary"
              />
            </div>

            <div className="range-maximin flex justify-between items-center mb-2">
              <span className="font-bold">0</span>
              <span className="font-bold">Max : $1,000.00</span>
            </div>
          </div>

          <div className="shipping">
            <label className="label cursor-pointer cursor-pointer flex flex-col gap-2">
              <span className="label-text">Free Shipping</span>
              <input
                checked={shipping}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
                onChange={(e) => {
                  setShipping(e.target.checked);
                }}
              />
            </label>
          </div>
          <div className="search w-1/4">
            <button onClick={handleFilter} className="btn btn-primary w-full">
              SEARCH
            </button>
          </div>
          <div className="reset w-1/4">
            <button onClick={handleClear} className="btn btn-secondary w-full">
              RESET
            </button>
          </div>
        </div>
      </div>

      <div className=" card header border-b border-base-300 pb-5 pt-5 mt-5 flex justify-between items-end gap-3">
        <p>22 products</p>
        <div className="icon flex gap-4">
          <span className="cursor-pointer">
            <GrAppsRounded className="text-3xl"></GrAppsRounded>
          </span>
          <span className="cursor-pointer">
            <IoIosMenu className="text-3xl"></IoIosMenu>
          </span>
        </div>
      </div>

      <div className="product flex gap-3 mb-20 flex-wrap mt-20">
        {data.length > 0 &&
          data.map((el, index) => {
            return <Card key={index} data={el}></Card>;
          })}
      </div>
    </div>
  );
}

export default Products;
