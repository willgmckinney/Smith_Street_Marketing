import { useState } from 'react';
import { Link } from "@tanstack/react-router";
import headerImage from "../../assets/offeringPeopleHoldingGears.jpg"

export const OfferingsPage = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const serviceDescriptions = [
    { title: 'Full stack application MVP accelerator', content: 'Launch your MVP fast with our full-stack team, covering design, development, and deployment.' },
    { title: 'Start-up booster package', content: 'Strategy, technology, and support to accelerate your startup’s early growth.' },
    { title: 'Data analytics jumpstart package', content: 'Get dashboards, KPIs, and insight pipelines running in weeks, not months.' },
    { title: 'Enterprise data analytics transformation', content: 'Modernize your enterprise data stack with secure, scalable solutions.' },
    { title: 'Customizable retainer model', content: 'Ongoing support for evolving tech needs on a flexible monthly basis.' }
  ]

  const handleClick = (title: string, index: number) => {
    setActiveService(index);
    return title
  };

  return (
    <div className="bg-neutral-color-2">
      <div className="relative z-[1] min-h-screen">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row container mx-auto my-16 items-end">
          <div className=" w-[100vw] lg:w-1/2 text-black pt-20">
            <h1 className="text-5xl font-bold mb-12">Connecting the dots</h1>
            <div className='flex lg:hidden w-[100vw] lg:w-1/2'>
              <img src={headerImage} alt="People holding gears" />
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-normal mb-6 max-w-xl">
                Smith Ave was built to help businesses of all sizes achieve more in a rapidly changing world. From realizing your MVP to building out core analytics, Smith Ave has your business covered.
              </h2>
              <Link
                to="/demo"
                className="bg-[#bbbbbb] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-gradient-to-r hover:from-[#00d8ff] hover:to-[#00c484]"
              >
                Book a consultation
              </Link>
            </div>
          </div>
          <div className='hidden lg:flex w-[100vw] lg:w-1/2'>
            <img src={headerImage} alt="People holding gears" />
          </div>
        </div>

        {/* Services Section */}
        <div className="container mx-auto gap-4 px-4 py-16">
          <h1 className="text-4xl font-bold mb-12">Services</h1>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mx-auto">
            {serviceDescriptions.map((services, index) => (
              <div >
                <button onClick={() => handleClick(services.title, index)} className={` w-[90%] lg:w-[500px] min-w-[290px] bg-[#bbbbbb] text-white font-semibold py-[70px] px-8 text-xl rounded-lg shadow-md transition duration-300 hover:bg-gradient-to-r hover:from-[#00d8ff] hover:to-[#00c484] ${activeService === index ? 'ring-4 ring-[#00d8ff]' : ''
                  }`}>
                  <span>{services.title}</span>
                </button>
                {activeService === index && (
                  <div className="overflow-hidden">
                    <div className="pb-5 text-sm text-slate-500 w-[100%] h-[100%]">
                      {services.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

