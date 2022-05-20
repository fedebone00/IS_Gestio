import React, { Component } from "react";
import {
  MdSearch,
  MdMenu,
  MdOutlineFace,
  MdChevronRight,
} from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import DatePicker from "sassy-datepicker"; //Calendar component
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from 'next/link'
import cookieCutter from 'cookie-cutter'

function cleanCookies(){

  console.log("Dentro Funzione");

  //cookieCutter.set('jwt', '', { expires: new Date(0) });
  //cookieCutter.set('rt', '', { expires: new Date(0) });

  //console.log(cookieCutter.get('jwt'));
  //console.log(cookieCutter.get('rt'));
}


export function TopBar({ title }) {
  return (
    <div className="container flex flex-wrap justify-between items-center ml-56 m-0 font-semibold text-2xl gap-0">
      <h1 className="relative flex items-center">{title}</h1>
      <div className="flex flex-row text-gray-400 gap-5 items-center">
        <MdSearch fontSize={25} />
        <BsBellFill fontSize={23} />
        <>|</>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-lg  py-2 text-sm font-medium  ">
              <MdMenu fontSize={30} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute text-gray-700 text-lg items-center  py-2 right-0 mt-2 w-64 font-normal origin-top-right divide-y divide-gray-100 rounded-md bg-white  focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  <h1 className="group flex w-full items-center rounded-md px-3 py-3 ">
                    {" "}
                    Informazioni dipendente <MdChevronRight />
                  </h1>
                </Menu.Item>
                <Menu.Item>
                  <h1 className="group flex w-full items-center rounded-md px-3 py-3 ">
                    {" "}
                    Sito aziendale <MdChevronRight />
                  </h1>
                </Menu.Item>
                <Menu.Item>
                  <h1 className="group flex w-full items-center rounded-md px-3 py-3 ">
                    {" "}
                    Link utile 1 <MdChevronRight />
                  </h1>
                </Menu.Item>
                <Menu.Item>
                  <h1 className="group flex w-full items-center rounded-md px-3 py-3 ">
                    {" "}
                    link utile 2 <MdChevronRight />
                  </h1>
                </Menu.Item>
                <Menu.Item disabled>
                  <h1 className="group flex w-full items-center bg-gray-600 text-white justify-center rounded-md px-3 py-3 ">
                    <a href="/" onClick={cleanCookies()}>
                      LOGOUT
                    </a>
                    {" "}
                  </h1>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <MdOutlineFace fontSize={45} />
      </div>
    </div>
  );
}

export default TopBar;
