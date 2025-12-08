
import { Destination } from './types';

// Ссылка на логотип из конкретного коммита (3e57e7f), чтобы избежать кэширования и использовать актуальную версию
export const LOGO_URL = 'https://raw.githubusercontent.com/giperkub2/active-travel/3e57e7f/122740-removebg-preview.png';

export const DESTINATIONS: Destination[] = [
  {
    id: 'dombay',
    title: 'Домбай: Сердце Гор',
    description: 'Домбай — это легендарный курорт, окруженный ледниками и пихтовыми лесами. Вас ждут захватывающие виды с горы Мусса-Ачитара, древние аланские храмы и мощные водопады. Идеально для тех, кто хочет увидеть "классический" Кавказ.',
    price: 15000,
    duration: '3 дня / 2 ночи',
    images: [
      'https://sun9-54.userapi.com/s/v1/ig2/AyL4af2V1T4aeSgv0ea3AVFGwQ5ZHCysy4VumIHyebTiEHHA2Ux-JoJ9VfwuAFMvzIn4JC3E3xmLqE34I3WPOSD2.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1218x1624&from=bu&cs=1218x0',
      'https://sun9-70.userapi.com/s/v1/ig1/8TRsKy87ZhJ4IVSdscBlfX5OpkxQIbW-lre2Y-KSlOrKdjAeME7rIQcpzLaovDWrTG4VhFWy.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1218x1624&from=bu&cs=1218x0',
      'https://sun9-14.userapi.com/s/v1/ig1/AY4Bow2U9eoU3_-yRZwumNF0YxWf5puI7W0D0y85KsFzbqR1xL0sdP2bxu-z0r0Jrz45CJgW.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1218x1624&from=bu&cs=1218x0'
    ],
    features: ['Канатная дорога', 'Озеро Туманлы-Кель', 'Тебердинский заповедник'],
    weather: { temp: 8, condition: 'Облачно' },
    coordinates: { lat: 43.2925, lng: 41.6258 }
  },
  {
    id: 'arkhyz',
    title: 'Архыз: Звездное Небо',
    description: 'Архыз славится своим кристально чистым воздухом и крупнейшей обсерваторией. Это место силы с Софийскими водопадами и высокогорными озерами невероятной бирюзы.',
    price: 16500,
    duration: '3 дня / 2 ночи',
    images: [
      'https://sun9-68.userapi.com/s/v1/ig2/lNSYKGZvomJWqbKQC6buDM1iEazFRFmuPc2sIGA4hcQyBlVVPn7EMFe9xOgeN2h5qhSLQwx9v6wl8UhBdTaZ8BSI.jpg?quality=95&as=32x23,48x34,72x51,108x77,160x113,240x170,360x255,480x340,540x383,640x454,720x511,1080x766,1280x908,1440x1021,1600x1135&from=bu&cs=1600x0',
      'https://sun9-45.userapi.com/s/v1/ig2/x_QVVp9zZXKgS-CD6RwxOtcPn-HZuplsLfnqPNF70v3vvncG7Jm75_J0d_lD1lLT9nn4RrHLWldz5w8KHlVh7ZUA.jpg?quality=96&as=32x31,48x47,72x71,108x106,160x157,240x236,360x354,480x472,540x531,640x630,720x709,1080x1063&from=bu&cs=1080x0',
      'https://sun9-77.userapi.com/s/v1/ig2/-dYUUfI03C28MndDGnJko1hd2NVu678szqDVdaCtqMKjeiXoGSEpsSzPoY5WP5O921ggW3_e24GHEKYUhk_WLuUD.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,682x682&from=bu&cs=682x0'
    ],
    features: ['Софийские водопады', 'Лик Христа', 'Рафтинг'],
    weather: { temp: 15, condition: 'Солнечно' },
    coordinates: { lat: 43.5619, lng: 41.2825 }
  },
  {
    id: 'elbrus',
    title: 'Приэльбрусье: Крыша Европы',
    description: 'Почувствуйте величие самой высокой горы Европы. Мы поднимемся на канатной дороге до станции Гара-Баши (3847м), увидим водопад Девичьи Косы и насладимся нарзанами.',
    price: 18000,
    duration: '3 дня / 2 ночи',
    images: [
      'https://sun9-9.userapi.com/s/v1/ig2/NZXrxSUxd4P8G6WJcG6XNczLPIKSIefZ7tgxh7b0JR5yvY2-VDOV9zznW0cil6KVWNIFTtf6Rz