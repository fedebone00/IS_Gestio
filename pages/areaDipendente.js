import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'
import React, { Component } from 'react';
import {MdFirstPage, MdOutlineLogin , MdBeachAccess , MdLocalHospital , MdContacts , MdCloud} from 'react-icons/md';
import { SidebarDip } from "../components/sidebarDip";


export default function Home() {
  return (
    <SidebarDip/>
  )
}
