export type Station = {
  site: string;
  stationId: string;
  stationName: string;
  distance: string;
};

export const stations: Station[] = [
  { site: 'BOURG',           stationId: '01072001', stationName: 'CEYZERIAT_SAPC',           distance: '5,8 km' },
  { site: 'BOURG-ASOTRANS',  stationId: '01072001', stationName: 'CEYZERIAT_SAPC',           distance: '5,6 km' },
  { site: 'TENDE',           stationId: '06163001', stationName: 'TENDE-OBS',                distance: '1,3 km' },
  { site: 'DOLOMIEU',        stationId: '38162001', stationName: 'FAVERGES',                 distance: '3,6 km' },
  { site: 'ST-SORLIN',       stationId: '38162001', stationName: 'FAVERGES',                 distance: '5,2 km' },
  { site: 'BOURGOIN',        stationId: '38053003', stationName: 'BOURGOIN',                 distance: '5,4 km' },
  { site: 'VENISSIEUX',      stationId: '69029001', stationName: 'LYON-BRON',                distance: '5,4 km' },
  { site: 'AIGUESBLANCHE',   stationId: '73187006', stationName: 'LA LECHERE_SAPC',          distance: '3,4 km' },
  { site: 'CRUSEILLES',      stationId: '74137001', stationName: 'GROISY_SAPC',              distance: '5,4 km' },
  { site: 'BARJOLS',         stationId: '83145001', stationName: 'VARAGES',                  distance: '5,0 km' },
  { site: 'PUGET',           stationId: '83061001', stationName: 'FREJUS',                   distance: '4,4 km' },
  { site: 'MONACO',          stationId: '06091003', stationName: 'PEILLE',                   distance: '4,4 km' },
  { site: 'ST-ANDREE',       stationId: '06088007', stationName: 'NICE-RIMIEZ',              distance: '1,3 km' },
  { site: 'CARROS',          stationId: '06033002', stationName: 'CARROS_SAPC',              distance: '0,2 km' },
  { site: 'MANDELIEU',       stationId: '06029001', stationName: 'CANNES',                   distance: '0,4 km' },
  { site: 'ST-ETIENNE',      stationId: '42218011', stationName: 'SAINT-ETIENNE',            distance: '6 km'   },
  { site: 'BRIGNOLES',       stationId: '83083001', stationName: 'MONTFORT-SUR-ARGENS_SAPC', distance: '10,2 km'},
  { site: 'PASTOR ST-ROMAIN',stationId: '69123002', stationName: "LYON TETE D'OR",           distance: '7 km'   },
  { site: 'MARSEILLE MENET', stationId: '13055029', stationName: 'MARSEILLE',                distance: '3,2 km' },
  { site: 'THEIZE',          stationId: '69114001', stationName: 'LIERGUES_SAPC',            distance: '4,5 km' },
  { site: 'MENTON',          stationId: '06083005', stationName: 'MENTON',                   distance: '0,7 km' },
  { site: 'THONON',          stationId: '74119002', stationName: 'EVIAN',                    distance: '4,5 km' },
];
