import Navbar from "@/components/navbar";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const RecomendationSection = () => {
  return (
    <section className="relative w-full col-span-2">
      <Navbar>
        <div className="py-2 px-3 ">
          <form
            action=""
            className="flex items-center gap-4 text-white bg-slate-700 rounded-full pl-5"
          >
            <label className=" font-bold text-xl">
              <IoSearchOutline />
            </label>
            <input
              type="text"
              className="w-full py-5 rounded-e-full px-4 bg-slate-700 outline-none"
              placeholder="Search"
            />
          </form>
        </div>
      </Navbar>
      <div className="p-4 text-white bg-yellow-300 mt-4">Hai</div>
    </section>
  );
};

export default RecomendationSection;
