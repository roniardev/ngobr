import tw, { css, styled, theme } from 'twin.macro'
import { useState } from 'react'
import { If, Else, Then } from 'react-if'
import { Button } from './'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const Modal = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    setError,
    clearErrors,
    reset
  } = useForm()
  const onSubmit = async (data) => {
    const quote = getValues('quote')
    const csrf = getValues('csrf')
    axios({
      method: 'post',
      url: '/api',
      data: {
        quote: quote,
        csrf: csrf
      }
    }).then(() => {
      toast.success('Topik obrolan berhasil ditambah')
    })
  }
  return (
    <>
      <If condition={props.visModal === false || props.isClose === true}>
        <Then>
          <div tw="px-2 py-4 items-center justify-center">
            <main
              tw="container items-center justify-center antialiased text-gray-900 font-sans overflow-x-auto"
              className="font-public"
            >
              <div
                tw="min-h-screen flex items-center justify-center"
                className="font-public"
              >
                <div tw="bg-gray-800 opacity-25 w-full h-full absolute z-10 inset-0"></div>
                <div tw="bg-white rounded-lg md:max-w-md md:mx-auto p-4 relative inset-x-0 bottom-0 z-50 mb-4 relative border-4 border-green-100 items-center justify-center">
                  <div tw="md:flex flex-col items-center justify-center">
                    <div tw="mt-6 md:mt-0 text-center items-center justify-center ">
                      <form
                        tw="space-y-4 flex-col flex items-center justify-center mx-4"
                        method="post"
                        action="/api"
                      >
                        <label tw="font-bold text-base text-gray-900 text-lg md:text-xl">
                          Ngobrolin...
                        </label>
                        <input
                          type="hidden"
                          name="csrf"
                          id="csrf"
                          value={props.csrf}
                          ref={register({ required: true })}
                        />
                        <input
                          name="quote"
                          id="quote"
                          type="text"
                          ref={register({ required: true })}
                          tw="shadow-lg rounded-md px-2 py-1 border-b-4 border-green-300 bg-green-200 pt-1 w-full"
                        />
                        {errors.quote && errors.quote.type == 'required' && (
                          <p tw="text-red-500 text-sm">
                            🚨 Nggak boleh kosong!
                          </p>
                        )}
                        <Button
                          isSecondary
                          type="submit"
                          onClick={handleSubmit(onSubmit)}
                        >
                          <span tw="text-base md:text-lg">Kirim</span>
                        </Button>
                      </form>{' '}
                    </div>
                  </div>
                  <div tw="text-center mt-4 flex justify-center">
                    <button
                      tw="block md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                      onClick={
                        props.toggleClose &&
                        props.toggleModal &&
                        props.toggleMain
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </main>
            <Toaster />
          </div>
        </Then>
        <Else>
          <div tw="hidden"></div>
        </Else>
      </If>
    </>
  )
}
export default Modal
