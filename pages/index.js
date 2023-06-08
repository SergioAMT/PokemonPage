import React from 'react'
import { useGlobalContext } from '../content/global';

export default function Home() {
  const g = useGlobalContext()
  console.log(g)
  return (
    <>
      <main></main>
    </>
  )
}
