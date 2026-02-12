export interface Terminal {
  id: string;
  name: string;
  city: string;
  address: string;
}

export const lpExpressTerminals: Terminal[] = [
  // Vilnius
  { id: "LP-VLN-01", name: "Vilnius, Ozo g. 25", city: "Vilnius", address: "Ozo g. 25, Vilnius" },
  { id: "LP-VLN-02", name: "Vilnius, Kalvarijų g. 206", city: "Vilnius", address: "Kalvarijų g. 206, Vilnius" },
  { id: "LP-VLN-03", name: "Vilnius, Ukmergės g. 369", city: "Vilnius", address: "Ukmergės g. 369, Vilnius" },
  { id: "LP-VLN-04", name: "Vilnius, Pilaitės pr. 31", city: "Vilnius", address: "Pilaitės pr. 31, Vilnius" },
  { id: "LP-VLN-05", name: "Vilnius, Savanorių pr. 62", city: "Vilnius", address: "Savanorių pr. 62, Vilnius" },
  { id: "LP-VLN-06", name: "Vilnius, Žirmūnų g. 64", city: "Vilnius", address: "Žirmūnų g. 64, Vilnius" },
  { id: "LP-VLN-07", name: "Vilnius, Laisvės pr. 75", city: "Vilnius", address: "Laisvės pr. 75, Vilnius" },
  { id: "LP-VLN-08", name: "Vilnius, Ateities g. 10", city: "Vilnius", address: "Ateities g. 10, Vilnius" },
  { id: "LP-VLN-09", name: "Vilnius, Mindaugo g. 11", city: "Vilnius", address: "Mindaugo g. 11, Vilnius" },
  { id: "LP-VLN-10", name: "Vilnius, Justiniškių g. 62", city: "Vilnius", address: "Justiniškių g. 62, Vilnius" },
  { id: "LP-VLN-11", name: "Vilnius, Šeškinės g. 32", city: "Vilnius", address: "Šeškinės g. 32, Vilnius" },
  { id: "LP-VLN-12", name: "Vilnius, Geležinio Vilko g. 18", city: "Vilnius", address: "Geležinio Vilko g. 18, Vilnius" },
  // Kaunas
  { id: "LP-KNS-01", name: "Kaunas, Savanorių pr. 346", city: "Kaunas", address: "Savanorių pr. 346, Kaunas" },
  { id: "LP-KNS-02", name: "Kaunas, Pramonės pr. 4", city: "Kaunas", address: "Pramonės pr. 4, Kaunas" },
  { id: "LP-KNS-03", name: "Kaunas, Karaliaus Mindaugo pr. 49", city: "Kaunas", address: "Karaliaus Mindaugo pr. 49, Kaunas" },
  { id: "LP-KNS-04", name: "Kaunas, Baltų pr. 18", city: "Kaunas", address: "Baltų pr. 18, Kaunas" },
  { id: "LP-KNS-05", name: "Kaunas, Jonavos g. 60", city: "Kaunas", address: "Jonavos g. 60, Kaunas" },
  { id: "LP-KNS-06", name: "Kaunas, Islandijos pl. 32", city: "Kaunas", address: "Islandijos pl. 32, Kaunas" },
  // Klaipėda
  { id: "LP-KLP-01", name: "Klaipėda, Taikos pr. 61", city: "Klaipėda", address: "Taikos pr. 61, Klaipėda" },
  { id: "LP-KLP-02", name: "Klaipėda, Baltijos pr. 71", city: "Klaipėda", address: "Baltijos pr. 71, Klaipėda" },
  { id: "LP-KLP-03", name: "Klaipėda, Šilutės pl. 29", city: "Klaipėda", address: "Šilutės pl. 29, Klaipėda" },
  { id: "LP-KLP-04", name: "Klaipėda, Minijos g. 1", city: "Klaipėda", address: "Minijos g. 1, Klaipėda" },
  // Šiauliai
  { id: "LP-SIA-01", name: "Šiauliai, Tilžės g. 109", city: "Šiauliai", address: "Tilžės g. 109, Šiauliai" },
  { id: "LP-SIA-02", name: "Šiauliai, Aido g. 8", city: "Šiauliai", address: "Aido g. 8, Šiauliai" },
  { id: "LP-SIA-03", name: "Šiauliai, Vilniaus g. 226", city: "Šiauliai", address: "Vilniaus g. 226, Šiauliai" },
  // Panevėžys
  { id: "LP-PAN-01", name: "Panevėžys, Savanorių a. 1", city: "Panevėžys", address: "Savanorių a. 1, Panevėžys" },
  { id: "LP-PAN-02", name: "Panevėžys, Klaipėdos g. 86", city: "Panevėžys", address: "Klaipėdos g. 86, Panevėžys" },
  // Alytus
  { id: "LP-ALY-01", name: "Alytus, Naujoji g. 7", city: "Alytus", address: "Naujoji g. 7, Alytus" },
  { id: "LP-ALY-02", name: "Alytus, Pulko g. 53", city: "Alytus", address: "Pulko g. 53, Alytus" },
  // Marijampolė
  { id: "LP-MAR-01", name: "Marijampolė, Kauno g. 59", city: "Marijampolė", address: "Kauno g. 59, Marijampolė" },
  // Utena
  { id: "LP-UTE-01", name: "Utena, J. Basanavičiaus g. 112", city: "Utena", address: "J. Basanavičiaus g. 112, Utena" },
  // Telšiai
  { id: "LP-TEL-01", name: "Telšiai, Respublikos g. 28", city: "Telšiai", address: "Respublikos g. 28, Telšiai" },
  // Tauragė
  { id: "LP-TAU-01", name: "Tauragė, Vytauto g. 81", city: "Tauragė", address: "Vytauto g. 81, Tauragė" },
  // Mažeikiai
  { id: "LP-MAZ-01", name: "Mažeikiai, Laisvės g. 5", city: "Mažeikiai", address: "Laisvės g. 5, Mažeikiai" },
  // Jonava
  { id: "LP-JON-01", name: "Jonava, Žeimių g. 13", city: "Jonava", address: "Žeimių g. 13, Jonava" },
  // Kėdainiai
  { id: "LP-KED-01", name: "Kėdainiai, Basanavičiaus g. 49", city: "Kėdainiai", address: "Basanavičiaus g. 49, Kėdainiai" },
  // Ukmergė
  { id: "LP-UKM-01", name: "Ukmergė, Vytauto g. 49", city: "Ukmergė", address: "Vytauto g. 49, Ukmergė" },
  // Druskininkai
  { id: "LP-DRU-01", name: "Druskininkai, M. K. Čiurlionio g. 97", city: "Druskininkai", address: "M. K. Čiurlionio g. 97, Druskininkai" },
  // Palanga
  { id: "LP-PAL-01", name: "Palanga, Ganyklų g. 22", city: "Palanga", address: "Ganyklų g. 22, Palanga" },
  // Elektrėnai
  { id: "LP-ELE-01", name: "Elektrėnai, Draugystės g. 2", city: "Elektrėnai", address: "Draugystės g. 2, Elektrėnai" },
  // Visaginas
  { id: "LP-VIS-01", name: "Visaginas, Parko g. 26", city: "Visaginas", address: "Parko g. 26, Visaginas" },
];
