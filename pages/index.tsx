import type { NextPage, GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

const Home: NextPage = ({ data }: any) => {
  useEffect(() => {
    document.body.className = "h-full";
    document.documentElement.className = "h-full bg-white";
  }, []);

  console.log(data);
  const animatedComponents = makeAnimated();

  const getActors = async (query: string) => {
    const res = await fetch(`http://localhost:3001/api/names?search=${query}`);
    return await res.json();
  };
  return (
    <>
      <Head>
        <title>Actor Search</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Actors Degree&apos;s of Seperation
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Actor 1
                    </label>
                    <div className="mt-1">
                      <AsyncSelect
                        id="actor-one-select"
                        instanceId="actor-one-select"
                        cacheOptions
                        defaultOptions
                        components={animatedComponents}
                        loadOptions={getActors}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <AsyncSelect
                        id="actor-two-select"
                        instanceId="actor-two-select"
                        cacheOptions
                        defaultOptions
                        components={animatedComponents}
                        loadOptions={getActors}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Find Path
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="hidden lg:block relative w-0 flex-1"> */}
        {/* <div className="absolute inset-0 h-full w-full object-cover"> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3001/api/names/graph");
  const data = await res.json();

  // console.log(data);

  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default Home;
