"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
    const scrollToSection = (id: any) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };
    return (
        <div id="home" className="py-[100px] max-w-screen-xl mx-auto bg-light-bg">
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h1 className="text-4xl text-red-400 font-semibold mb-6">
                            Delicious Food <span className="text-green-400 block">Delivered To Your Door</span>
                        </h1>
                        <p className="mb-8 text-lg text-light-text text-justify">
                            Experience restaurant-quality meals prepared by top chefs, delivered fresh to your doorstep. Choose from weekly changing menus, customize your meal plans, and enjoy hassle-free cooking.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/meals">
                            <div  className="border-2 border-red-400 rounded p-3 text-red-400 hover:scale-105 duration-1000">Explore Meals</div>
                            </Link>
                           <div onClick={() => scrollToSection("how-it-works")}>
                           <p className="border-2 border-green-400 rounded p-3 text-green-400 hover:scale-105 duration-1000">How It Works</p>
                           </div>
                        </div>
                    </div>
                    <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                        <Image 
                            src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                            alt="Delicious food plate" 
                            layout="responsive" 
                            width={1170} 
                            height={780}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
