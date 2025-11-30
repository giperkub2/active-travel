
import React from 'react';
import { ArrowDown, MapPin } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 w-full">
        <div className="animate-fade-in-up flex flex-col items-center w-full max-w-5xl">
          <div className="flex items-center justify-center space-x-2 text-sky-400 font-medium tracking-wider uppercase text-sm sm:text-base mb-2">
            <MapPin className="w-5 h-5" />
            <span>Выезд из Краснодара</span>
          </div>
          
          <div className="w-full px-4 mb-4 flex justify-center">
            <img 
              src="https://sun9-84.userapi.com/s/v1/ig2/sO06I8kDb8j63jDF8y5xTwK3xxr2KuFmVHJSnghSR20lApJh6nIb1KGjCLIRYloFa54Rb-4WPe-Cgts8KR1l4_sb.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,2560x1280&from=bu&cs=2560x0"
              alt="Active Travel"
              className="w-full max-w-md h-auto object-contain mix-blend-screen rounded-full contrast-125 brightness-110"
            />
          </div>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-100 font-light leading-relaxed drop-shadow-md mt-4">
            Авторские туры в горы. Открой для себя величие вершин, чистоту рек и древнюю историю.
          </p>

          <div className="pt-8">
            <button 
              onClick={onExplore}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-sky-600 rounded-full hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 shadow-lg hover:shadow-sky-500/30"
            >
              Выбрать путешествие
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDown className="w-8 h-8" />
      </div>
    </div>
  );
};
