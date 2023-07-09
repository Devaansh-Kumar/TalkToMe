import React from "react";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="px-4 py-16 mx-auto w-full md:px-24 lg:px-8 lg:py-16 bg-gray-200">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl container">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern
                        id="e77df901-b9d7-4b9b-822e-16b2d410795b"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7"></circle>
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#e77df901-b9d7-4b9b-822e-16b2d410795b)"
                      width="52"
                      height="24"
                    ></rect>
                  </svg>
                </span>
                Future way to interact with your files
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                You don't have to be a programmer or sound engineer to make use
                of TalkToMe. Just upload files and start using it!
              </p>
            </div>
            <div>
              <a
                href="/"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-500 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                draggable="false"
              >
                Start talking now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-16 mx-auto bg-gray-100 w-full md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            Make your pdfs and audio files come to life.
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            You can upload your PDFs, Audio files or Text documents and talk to
            them like a real person.
          </p>
        </div>
        <div className="grid max-w-screen-lg gap-8 row-gap-10 mx-auto lg:grid-cols-2">
          <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
            <div className="mr-4">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100">
                <svg
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                  className="w-10 h-10 text-indigo-500"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div>
              <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
                Create interactive conversations with PDFs.
              </h6>
              <p className="mb-3 text-sm text-gray-700">
                For example, you could create an interactive conversation with
                the customer service documentation for a product that will help
                reduce support tickets by 80%.
              </p>
            </div>
          </div>
          <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
            <div className="mr-4">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100">
                <svg
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                  className="w-10 h-10 text-indigo-500"
                >
                  <polygon
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div>
              <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
                Combine real-world information with your files.
              </h6>
              <p className="mb-3 text-sm text-gray-700">
              Harness the power of AI for fact checking and merging real-world information with your files. Unlock accurate insights, enhance credibility, and gain a comprehensive understanding. 
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}

      <div class="px-4 py-16 mx-auto w-full bg-gray-100 md:px-24 lg:px-8 lg:py-20">
        <div class="grid gap-6 row-gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
          <div class="lg:py-6 lg:pr-16">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            How TalkToMe Works
          </h2>
            <div class="flex">
              <div class="flex flex-col items-center mr-4">
                <div>
                  <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 24 24"
                      class="w-4 text-indigo-500"
                    >
                      <line
                        fill="none"
                        stroke-miterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      ></line>
                      <polyline
                        fill="none"
                        stroke-miterlimit="10"
                        points="19,15 12,22 5,15"
                      ></polyline>
                    </svg>
                  </div>
                </div>
                <div class="w-px h-full bg-gray-300"></div>
              </div>
              <div class="pt-1 pb-8">
                <p class="text-gray-900 mb-2 text-lg font-bold">
                  Upload your files
                </p>
                <p class="text-gray-700">
                  From podcasts to research papers, we got you covered
                </p>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col items-center mr-4">
                <div>
                  <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 24 24"
                      class="w-4 text-indigo-500"
                    >
                      <line
                        fill="none"
                        stroke-miterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      ></line>
                      <polyline
                        fill="none"
                        stroke-miterlimit="10"
                        points="19,15 12,22 5,15"
                      ></polyline>
                    </svg>
                  </div>
                </div>
                <div class="w-px h-full bg-gray-300"></div>
              </div>
              <div class="pt-1 pb-8">
                <p class="text-gray-900 mb-2 text-lg font-bold">
                  Wait for the AI model to transcribe and understand the file.
                </p>
                <p class="text-gray-700">
                  No need to download any software, just upload and wait a few
                  minutes for your files to be processed by our server.
                </p>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col items-center mr-4">
                <div>
                  <div>
                    <div class="flex items-start justify-center w-10 h-10 border rounded-full">
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        class="mt-2 w-6 text-indigo-500"
                      >
                        <polyline
                          fill="none"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          points="6,12 10,16 18,8"
                        ></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-1 pb-8">
                <p class="text-gray-900 mb-2 text-lg font-bold">
                  Talk to your file like a normal person.
                </p>
                <p class="text-gray-700">
                  Once it's done processing, you can talk with your document as
                  if you were talking with someone in person.
                </p>
              </div>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
              class="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Footer */}

<footer class="bg-white dark:bg-gray-800">
    <div class="w-full mx-auto max-w-full p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">TalkToMe™</a>. All Rights Reserved.
    </span>
    </div>
</footer>
    </>
  );
};

export default Home;
