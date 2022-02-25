import {MilitaryModel} from "../models/military.model";
import {MilitaryEnum} from "../enums/military.enum";

export const militaryObjects: Record<string, MilitaryModel> = {
  soldiers: {
    icon: 'https://img.icons8.com/external-soft-fill-juicy-fish/50/000000/external-soldier-avatars-soft-fill-soft-fill-juicy-fish-2.png',
    name: MilitaryEnum.soldiers,
    title: 'Солдати'
  },
  militaryVehicle: {
    icon: 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/50/000000/external-military-vehicle-vehicles-icongeek26-linear-colour-icongeek26.png',
    name: MilitaryEnum.militaryVehicle,
    title: 'Воєнний транспорт'
  },
  tank: {
    icon: 'https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/50/000000/external-tank-military-photo3ideastudio-lineal-color-photo3ideastudio.png',
    name: MilitaryEnum.tank,
    title: 'Танки'
  },
  airCraft: {
    icon: 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/50/000000/external-jet-war-icongeek26-linear-colour-icongeek26.png',
    name: MilitaryEnum.airCraft,
    title: 'Літаки / авіація'
  },
  helicopter: {
    icon: 'https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/50/000000/external-helicopter-military-photo3ideastudio-lineal-color-photo3ideastudio.png',
    name: MilitaryEnum.helicopter,
    title: 'Гелікоптери'
  },
  missiles: {
    icon: 'https://img.icons8.com/external-microdots-premium-microdot-graphic/50/000000/external-missile-transportation-vol2-microdots-premium-microdot-graphic.png',
    name: MilitaryEnum.missiles,
    title: 'Гради / Артилерія'
  }
};
