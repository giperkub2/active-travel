
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Destination, Weather } from '../types';
import { Clock, Mountain, ChevronLeft, ChevronRight, CheckCircle, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onBook: (id: string) => void;
}

interface DailyForecast {
  date: string; // ISO string
  dayOfWeek: string;
  dayNumber: string;
  tempMax: number;
  code: number;
}

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const VKIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.624 20.374c-5.786 0-9.096-4.072-9.256-10.974h2.894c.106 5.044 2.278 7.189 4.022 7.63V12.78c-2.484-.282-3.69-2.115-4.29-4.07h2.78c.459 1.957 1.764 3.753 3.385 3.753h.53V9.4h2.646v1.94c0.812-.088 1.677-1.11 2.277-2.63h2.647c-0.67 2.646-3.033 4.886-3.563 5.345 2.152.6 3.652 2.91 4.146 5.32h-2.91c-0.847-2.61-2.928-4.053-4.322-4.14v4.14h-1.006z"/>
  </svg>
);

// Weather Effect Components
const SnowEffect = () => {
  const flakes = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      left: Math.random() * 100,
      size: Math.random() * 12 + 10, // Font size for snowflake (10px to 22px)
      delay: Math.random() * 5,
      duration: (Math.random() * 3 + 4) * 1.5 // Increased duration (slower)
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
       {flakes.map((flake, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`
          }}
        >❄</div>
      ))}
    </div>
  );
};

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onBook }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax State
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  
  // Determine current weather condition code
  // Priority: 1. API Forecast for today (index 0), 2. Static Data
  const currentWeatherCode = useMemo(() => {
    if (forecast.length > 0) return forecast[0].code;
    
    // Fallback mapping from string description to approx code if API failed
    const cond = destination.weather.condition.toLowerCase();
    if (cond.includes('дождь')) return 61;
    if (cond.includes('снег')) return 71;
    if (cond.includes('ясно') || cond.includes('солнечно')) return 0;
    if (cond.includes('облачно')) return 3;
    return 0; // Default clear
  }, [forecast, destination.weather.condition]);

  // Determine Animation Mode
  const animationMode = useMemo(() => {
    const code = currentWeatherCode;
    // Snow: 71-77, 85-86
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
    
    // Default to parallax (clear weather behavior) for everything else, including rain
    return 'parallax';
  }, [currentWeatherCode]);

  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch real-time weather forecast (10 days)
  useEffect(() => {
    if (destination.coordinates) {
      const fetchWeather = async () => {
        try {
          // Fetching daily forecast for 10 days
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${destination.coordinates.lat}&longitude=${destination.coordinates.lng}&daily=weathercode,temperature_2m_max&timezone=auto&forecast_days=10`
          );
          if (!res.ok) throw new Error('Failed to fetch weather');
          const data = await res.json();
          
          if (data.daily) {
            const dailyData: DailyForecast[] = data.daily.time.map((dateStr: string, index: number) => {
              const date = new Date(dateStr);
              return {
                date: dateStr,
                dayOfWeek: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
                dayNumber: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' }),
                tempMax: Math.round(data.daily.temperature_2m_max[index]),
                code: data.daily.weathercode[index]
              };
            });
            setForecast(dailyData);
          }
        } catch (error) {
          console.error('Error fetching weather:', error);
        }
      };
      
      fetchWeather();
    }
  }, [destination.coordinates]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (animationMode !== 'parallax') return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Move image opposite to mouse
    setParallaxOffset({
      x: x * -20, // max move 10px
      y: y * -20
    });
  };

  const handleMouseLeave = () => {
    if (animationMode === 'parallax') {
      setParallaxOffset({ x: 0, y: 0 });
    }
  };

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + destination.images.length) % destination.images.length);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const handleShare = (platform: 'telegram' | 'whatsapp' | 'vk') => {
    const url = window.location.origin + window.location.pathname + '#' + destination.id;
    const text = `Посмотрите этот тур: ${destination.title} - ${destination.price.toLocaleString('ru-RU')}₽!`;
    
    if (platform === 'vk') {
      window.open('https://vk.com/activetravel_krd', '_blank');
      return;
    }

    let shareUrl = '';
    if (platform === 'telegram') {
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else {
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
    }
    
    window.open(shareUrl, '_blank');
  };

  const getWeatherIcon = (code: number, className: string = "w-4 h-4") => {
    if (code === 0 || code === 1) return <Sun className={`${className} text-amber-400`} />;
    if (code === 2 || code === 3) return <Cloud className={`${className} text-slate-400`} />;
    if (code === 45 || code === 48) return <Cloud className={`${className} text-slate-400`} />;
    if (code >= 51 && code <= 67) return <CloudRain className={`${className} text-blue-400`} />;
    if (code >= 71 && code <= 77) return <CloudSnow className={`${className} text-sky-200`} />;
    if (code >= 80 && code <= 82) return <CloudRain className={`${className} text-blue-400`} />;
    if (code >= 85 && code <= 86) return <CloudSnow className={`${className} text-sky-200`} />;
    if (code >= 95) return <CloudRain className={`${className} text-purple-400`} />;
    return <Sun className={`${className} text-amber-400`} />;
  };

  return (
    <div 
      id={destination.id}
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} h-full`}
    >
      <div className="group bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-slate-100 flex flex-col h-full">
        {/* Image Gallery Area */}
        <div 
          className="relative h-64 sm:h-72 overflow-hidden bg-slate-200 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Weather Specific Overlay Animations */}
          {animationMode === 'snow' && <SnowEffect />}

          <img 
            src={destination.images[currentImageIdx]} 
            alt={destination.title}
            className={`w-full h-full object-cover transition-transform duration-700 select-none ${animationMode === 'parallax' ? 'scale-110 ease-out' : 'group-hover:scale-105'}`}
            style={animationMode === 'parallax' ? {
              transform: `scale(1.1) translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              transition: 'transform 0.1s ease-out'
            } : {}}
            draggable="false"
          />
          
          {/* Image Controls */}
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block z-30"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block z-30"
          >
            <ChevronRight size={20} />
          </button>

          {/* 10-Day Weather Forecast Widget (Volumetric Glass Style) */}
          {forecast.length > 0 ? (
             <div 
                className="absolute top-4 left-1/2 -translate-x-1/2 max-w-[90%] sm:max-w-[200px] flex gap-2 overflow-x-auto hide-scrollbar pointer-events-auto z-30 p-2.5 rounded-[2rem] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-[inset_0_4px_8px_rgba(255,255,255,0.6),inset_0_-4px_8px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.2)]"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
             >
                {forecast.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-between min-w-[34px] text-center">
                    <span className="text-[9px] uppercase font-bold text-slate-600 leading-none mb-0.5">{day.dayOfWeek}</span>
                    <span className="text-[8px] text-slate-500 leading-none mb-0.5">{day.dayNumber}</span>
                    <div className="my-0.5">
                      {getWeatherIcon(day.code, "w-3.5 h-3.5")}
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-none">{day.tempMax > 0 ? '+' : ''}{day.tempMax}°</span>
                  </div>
                ))}
             </div>
          ) : (
            // Fallback
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none z-30 px-5 py-2.5 rounded-[2rem] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-[inset_0_4px_8px_rgba(255,255,255,0.6),inset_0_-4px_8px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.2)] text-xs font-bold text-slate-800">
              {getWeatherIcon(0)} 
              <span className="text-sm">{destination.weather.temp > 0 ? '+' : ''}{destination.weather.temp}°C</span>
              <span className="hidden sm:inline-block text-slate-600 font-normal border-l border-slate-400 pl-2 ml-0.5">
                {destination.weather.condition}
              </span>
            </div>
          )}
          
          {/* Dots indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 pointer-events-none z-30">
              {destination.images.map((_, idx) => (
                  <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                  />
              ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-serif font-bold text-slate-800">{destination.title}</h3>
          </div>

          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {destination.duration}
            </div>
            <div className="flex items-center text-sky-600 font-semibold">
              {destination.price.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          <p className="text-slate-600 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
            {destination.description}
          </p>

          {/* Features Mini List */}
          <div className="mb-6 space-y-1">
              {destination.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs text-slate-500">
                      <CheckCircle className="w-3 h-3 mr-2 text-sky-500" />
                      {feature}
                  </div>
              ))}
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => onBook(destination.id)}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-sky-600 transition-colors duration-300 flex items-center justify-center shadow-lg shadow-slate-900/10"
            >
              <Mountain className="w-4 h-4 mr-2" />
              Забронировать место
            </button>

            <div className="flex items-center justify-center space-x-4 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">Поделиться:</span>
              <button 
                onClick={() => handleShare('vk')}
                className="p-2 rounded-full text-slate-400 hover:text-[#0077FF] hover:bg-[#0077FF]/10 transition-colors duration-200"
                aria-label="ВКонтакте"
              >
                <VKIcon />
              </button>
              <button 
                onClick={() => handleShare('telegram')}
                className="p-2 rounded-full text-slate-400 hover:text-[#0088cc] hover:bg-[#0088cc]/10 transition-colors duration-200"
                aria-label="Share on Telegram"
              >
                <TelegramIcon />
              </button>
              <button 
                onClick={() => handleShare('whatsapp')}
                className="p-2 rounded-full text-slate-400 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-colors duration-200"
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
