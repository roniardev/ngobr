import { useState } from 'react'
import tw from 'twin.macro'
import { Button, Modal } from '@/components/'
import Head from 'next/head'
import { If, Else, Then } from 'react-if'
import { createClient } from '@supabase/supabase-js'
import create from 'zustand'

const useStore = create((set) => ({
  visMain: true,
  visModal: false,
  isClose: true,
  toggleMain: () => set((state) => ({ visMain: !state.visMain })),
  toggleClose: () => set((state) => ({ isClose: !state.isClose })),
  toggleModal: () => set((state) => ({ visModal: !state.visModal }))
}))

export async function getServerSideProps() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = await createClient(supabaseUrl, supabaseKey)

  const data = await supabase.from('ngobrolin_data').select('quote')

  let post = data
  return {
    props: {
      post
    }
  }
}

const App = ({ post }) => {
  const visMain = useStore((state) => state.visMain)
  const visModal = useStore((state) => state.visModal)
  const isClose = useStore((state) => state.isClose)

  const toggleClose = useStore((state) => state.toggleClose)
  const toggleModal = useStore((state) => state.toggleModal)
  const toggleMain = useStore((state) => state.toggleMain)

  const [quoteIndex, setIndex] = useState(0)

  const nextQuote = () => {
    let index = post.data.length - 1
    setIndex(Math.floor(Math.random() * index))
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <If condition={visMain && isClose}>
        <Then>
          {' '}
          <div
            css={[tw`flex flex-col items-center justify-center h-screen`]}
            className="font-public"
          >
            <div tw="flex flex-col justify-center h-full space-y-8 items-center w-3/5 ">
              <section tw="flex flex-row space-x-4 items-center">
                <div tw="capitalize font-semibold text-xl md:text-3xl border-2 py-4 px-2 border-green-600 shadow-md">
                  "{post.data[quoteIndex].quote}"
                </div>
                <Button onClick={toggleMain}>+</Button>
              </section>
              <Button isPrimary onClick={() => nextQuote()}>
                <span tw="text-lg md:text-xl py-2 font-medium">Ganti</span>
              </Button>
            </div>
          </div>
        </Then>
        <Else>
          <Modal
            visMain={visMain}
            visModal={visModal}
            close={isClose}
            toggleModal={toggleModal}
            toggleClose={toggleClose}
            toggleMain={toggleMain}
          />
        </Else>
      </If>
    </>
  )
}

export default App
