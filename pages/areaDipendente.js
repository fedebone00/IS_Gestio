import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'
import React, { Component } from 'react';
import { MdFirstPage, MdOutlineLogin, MdBeachAccess, MdLocalHospital, MdContacts, MdCloud } from 'react-icons/md';
import { SidebarDip } from "../components/sidebarDip";
import DatePicker from 'sassy-datepicker'; //Calendar component



export default function HomeDip() {
  
  const onChange = (date) => {
    console.log(date.toString());
  }
  

  return (
    <div className="flex flex-nowrap">
    <div><SidebarDip /></div>
    <div className="absolute top-30 right-20">
      <DatePicker onChange={onChange} />
    </div>
    <div className="absolute top-[3px] left-[55px]">
      <h1>NON FUNZIONA!!!!!!!</h1>
    </div>
  </div>
  );
}
