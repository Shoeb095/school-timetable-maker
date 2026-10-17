// Real school data parsed from SP_TT_wef_1-7-26.xlsx (Insight International School, Shaikpet, Hyderabad)
import type { Teacher, ClassInfo, SlotsMap, AppSettings } from '../types';

export const DEFAULT_SETTINGS: AppSettings = {
  month: 'June',
  year: 2026,
  days: 6,
  periodsPerDay: [7, 7, 7, 7, 7, 5], // Mon-Fri 7 periods, Sat 5 periods
  maxLoad: 30, // Hard rule: Max 30 periods per teacher per week
  times: [
    '9:10–9:55',
    '9:55–10:40',
    '10:50–11:35',
    '11:35–12:20',
    '12:20–1:05',
    '1:40–2:25',
    '2:25–3:10'
  ]
};

export const DEFAULT_TEACHERS: Teacher[] = [
  {
    "id": 1,
    "name": "Ms. Nazia",
    "subj": "HRT",
    "allottedClasses": "EYP1A (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity,Nazera)",
    "maxLoad": 30,
    "workloadTotal": 0
  },
  {
    "id": 2,
    "name": "Ms. Ayesha",
    "subj": "HRT",
    "allottedClasses": "EYP1B (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 3,
    "name": "Ms. Sameera",
    "subj": "HRT",
    "allottedClasses": "EYP2A (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 4,
    "name": "Ms. Farah Bavazeer",
    "subj": "HRT",
    "allottedClasses": "EYP2B (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 5,
    "name": "Ms. Sara",
    "subj": "HRT",
    "allottedClasses": "EYP2C (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 6,
    "name": "Ms. Shahjahan",
    "subj": "HRT",
    "allottedClasses": "EYP3A (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 7,
    "name": "Ms. Ayesha",
    "subj": "HRT",
    "allottedClasses": "EYP3B (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 8,
    "name": "Ms. Tayyaba",
    "subj": "HRT",
    "allottedClasses": "EYP3C (Literacy Skills, Numeracy Skills, General Awareness, Free Play, Islamic, Story Time, A/C, Rhymes, Activity)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 9,
    "name": "Ms. Asma Jabeen",
    "subj": "Asst Teacher",
    "allottedClasses": "Asst Teacher (Check Hindi/Urdu column)",
    "maxLoad": 30,
    "workloadTotal": 0
  },
  {
    "id": 10,
    "name": "Ms. Abeer",
    "subj": "Asst Teacher",
    "allottedClasses": "Asst Teacher",
    "maxLoad": 30,
    "workloadTotal": 0
  },
  {
    "id": 11,
    "name": "Ms Zaina",
    "subj": "Asst Teacher",
    "allottedClasses": "Asst Teacher",
    "maxLoad": 30,
    "workloadTotal": 0
  },
  {
    "id": 12,
    "name": "Ms. Sumiya Aman",
    "subj": "HRT",
    "allottedClasses": "1A (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 29
  },
  {
    "id": 13,
    "name": "Ms. Uzma",
    "subj": "HRT",
    "allottedClasses": "1B (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 29
  },
  {
    "id": 14,
    "name": "Ms. Rabia",
    "subj": "HRT",
    "allottedClasses": "1C (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 29
  },
  {
    "id": 15,
    "name": "Ms. Juveria",
    "subj": "HRT",
    "allottedClasses": "1D (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 29
  },
  {
    "id": 16,
    "name": "Ms. Arshia Anjum",
    "subj": "HRT",
    "allottedClasses": "2A (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 17,
    "name": "Ms. Nousheen",
    "subj": "HRT",
    "allottedClasses": "2B (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 18,
    "name": "Ms Kauser",
    "subj": "HRT",
    "allottedClasses": "2C (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 19,
    "name": "Ms. Maimoona",
    "subj": "HRT",
    "allottedClasses": "2D (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 20,
    "name": "Ms. Misbah",
    "subj": "HRT",
    "allottedClasses": "2E (Eng, Math, Sci, Comp, A/C, GK, olym,V.E, Lib)+PE",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 21,
    "name": "Ms. Heeba",
    "subj": "Nazera",
    "allottedClasses": "EY1B,1A,1B, 1C, 1D, 2A, 2B, 2C, 2D, 2E",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 22,
    "name": "Ms Batool",
    "subj": "Asst Teacher",
    "allottedClasses": "Asst Teacher Grade 1",
    "maxLoad": 30,
    "workloadTotal": 0
  },
  {
    "id": 23,
    "name": "Ms. Saima (Soc.3 A & C)",
    "subj": "Asst Teacher",
    "allottedClasses": "Asst Teacher Grade 2 & (Social 3 A&C)",
    "maxLoad": 30,
    "workloadTotal": 6
  },
  {
    "id": 24,
    "name": "Ms. Fatima Butool",
    "subj": "English",
    "allottedClasses": "3A,3B,3C,3D,3E",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 25,
    "name": "Ms Nabeela",
    "subj": "",
    "allottedClasses": "3F,4A,4B, 4C, 4D",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 26,
    "name": "Ms. Aamna (Eng + comp.)",
    "subj": "",
    "allottedClasses": "Eng (5A, 5B,5C,5D); Comp(3A,3B)",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 27,
    "name": "Ms. Salma",
    "subj": "",
    "allottedClasses": "6A, 6B, 6C, 6D,7A",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 28,
    "name": "Ms.Nadera",
    "subj": "",
    "allottedClasses": "7B, 7C, 7D, 8A,8C",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 29,
    "name": "Ms. Ruhi",
    "subj": "",
    "allottedClasses": "8B, 9D",
    "maxLoad": 30,
    "workloadTotal": 12
  },
  {
    "id": 30,
    "name": "Ms. Zarina",
    "subj": "",
    "allottedClasses": "9A, 9B, 9C,8D",
    "maxLoad": 30,
    "workloadTotal": 24
  },
  {
    "id": 31,
    "name": "Ms Najia",
    "subj": "MATH",
    "allottedClasses": "3A,3B,3C,3D,3E",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 32,
    "name": "Ms. Shireen",
    "subj": "",
    "allottedClasses": "4A,4B, 4C, 4D, 8A",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 33,
    "name": "Ms Qudsia",
    "subj": "",
    "allottedClasses": "5A,5B,5C, 5D, 6A",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 34,
    "name": "Mr. Wadood",
    "subj": "",
    "allottedClasses": "6B,6C, 6D",
    "maxLoad": 30,
    "workloadTotal": 18
  },
  {
    "id": 35,
    "name": "Ms. Husna",
    "subj": "",
    "allottedClasses": "3F,7A,7B,7C, 7D",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 36,
    "name": "Ms. Mujeeb",
    "subj": "",
    "allottedClasses": "9C,9D,10A,10B,10C",
    "maxLoad": 30,
    "workloadTotal": 27
  },
  {
    "id": 37,
    "name": "Ms. Saleha",
    "subj": "",
    "allottedClasses": "8B,8C,8D,9A",
    "maxLoad": 30,
    "workloadTotal": 24
  },
  {
    "id": 38,
    "name": "Ms. Farheen",
    "subj": "COMPUTERS & ROBOTICS",
    "allottedClasses": "9B,10A, 10B,10C",
    "maxLoad": 30,
    "workloadTotal": 27
  },
  {
    "id": 39,
    "name": "Ms. Ummul Khair",
    "subj": "",
    "allottedClasses": "3C,3D,3E,3F,4A,4B,4C,4D,5A,5B",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 40,
    "name": "Ms. Azmath",
    "subj": "",
    "allottedClasses": "5C,5D,6A, 6B,6C,6D, 7A,7B,7C,7D",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 41,
    "name": "Ms. Ayesha Munawwar (Sci)",
    "subj": "SCIENCE, BIOLOGY, PHYSICS & CHEMISTRY",
    "allottedClasses": "3A, 3B, 3C, 3D, 3E,3F",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 42,
    "name": "Ms. Surayya (Sci)",
    "subj": "",
    "allottedClasses": "4A,4B,4C, 4D, 6B, 6D",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 43,
    "name": "Ms. Maria (Sci)",
    "subj": "",
    "allottedClasses": "6A, 6C",
    "maxLoad": 30,
    "workloadTotal": 10
  },
  {
    "id": 44,
    "name": "Ms. Sabiha Azmath (Sci)",
    "subj": "",
    "allottedClasses": "5A,5B,5C, 5D,7B",
    "maxLoad": 30,
    "workloadTotal": 25
  },
  {
    "id": 45,
    "name": "Ms. Fatima (Bio + GK)",
    "subj": "",
    "allottedClasses": "8A, 8B, 8C, 8D,9A,9B; GK (6A,6B, 6C, 6D)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 46,
    "name": "Ms. Sabiha Banu (Bio)",
    "subj": "",
    "allottedClasses": "9C,9D 10A, 10B,10C",
    "maxLoad": 30,
    "workloadTotal": 24
  },
  {
    "id": 47,
    "name": "Mr Mujahed(Phy)",
    "subj": "",
    "allottedClasses": "7A,8A,8B,8C,8D;GK (7A,7B,7C,7D);SH 10A, 10B, 10C",
    "maxLoad": 30,
    "workloadTotal": 24
  },
  {
    "id": 48,
    "name": "Mr. Javeed (Phy)",
    "subj": "",
    "allottedClasses": "9A,9B, 9C,9D 10A, 10B,10C",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 49,
    "name": "Ms Taliya",
    "subj": "",
    "allottedClasses": "7C,7D,8A,8B,8C,8D,9A;GK(5A,5B,5C,5D)",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 50,
    "name": "Ms. Kareemunnisa (Chem)",
    "subj": "",
    "allottedClasses": "9B, 9C,9D 10A, 10B,10C",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 51,
    "name": "Ms. Hajera (Soc)",
    "subj": "SOCIAL, GK & BUSINESS",
    "allottedClasses": "3B, 3D,3E,3F, 4A, 4B,4C,4D,5C",
    "maxLoad": 30,
    "workloadTotal": 27
  },
  {
    "id": 52,
    "name": "Ms. Safoora (Soc)",
    "subj": "",
    "allottedClasses": "5A,5B,5D, 6A, 6B, 6C, 6D, 7A,7B",
    "maxLoad": 30,
    "workloadTotal": 27
  },
  {
    "id": 53,
    "name": "Ms. Farhath (Soc + GK + Busi)",
    "subj": "",
    "allottedClasses": "Soc (7C, 7D); Busi (8A, 8B,8C, 8D)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 54,
    "name": "Mr. Viqar (Busi + VE)",
    "subj": "",
    "allottedClasses": "9A, 9B, 9C,9D;VE(8BC,9BC,10BC)",
    "maxLoad": 30,
    "workloadTotal": 23
  },
  {
    "id": 55,
    "name": "Ms. Fatima Ansari",
    "subj": "ISLAMIC",
    "allottedClasses": "1A,1B,1C,1D,3C,3D,3E,3F",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 56,
    "name": "Ms. Summaiya",
    "subj": "",
    "allottedClasses": "2A, 2B, 2C, 2D, 2E,3A, 3B;VE(8A,8D)",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 57,
    "name": "Ms. Asiya",
    "subj": "",
    "allottedClasses": "4A, 4B, 4C, 4D, 5A, 5B, 5D",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 58,
    "name": "Ms. Arshi",
    "subj": "",
    "allottedClasses": "5C, 6A, 6B, 7A, 7B, 7C, 7D;VE(9D)",
    "maxLoad": 30,
    "workloadTotal": 29
  },
  {
    "id": 59,
    "name": "Ms. Arshiya",
    "subj": "",
    "allottedClasses": "6C, 6D, 8A, 8B,8C, 8D ; VE(9A)",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 60,
    "name": "Ms. Fareena",
    "subj": "",
    "allottedClasses": "8C, 9A, 9B, 9C,9D;VE(10A)",
    "maxLoad": 30,
    "workloadTotal": 24
  },
  {
    "id": 61,
    "name": "Ms. Razia (Tel)",
    "subj": "ARABIC & TELUGU",
    "allottedClasses": "Grade 1 & 2 All Sections, 3A, 3B,3C,4A,4D, 7AD, 7BC, 8AD(Basics),8BC (Basics)",
    "maxLoad": 30,
    "workloadTotal": 22
  },
  {
    "id": 62,
    "name": "Ms. Farah (Arabic)",
    "subj": "",
    "allottedClasses": "4A,4B,4C,4D, 5AD, 5BC, 6AD, 6BC, 7AD, 7BC",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 63,
    "name": "Mr.Iftekhar Ahmed- (Arabic+Nazera)",
    "subj": "",
    "allottedClasses": "Nazera(EY2A,EY2B,EY2C,EY3C);Arabic(3A,3B,3C,3D,3E,3F)",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 64,
    "name": "Mr. Ramesh (Tel)",
    "subj": "",
    "allottedClasses": "3D, 3E,3F, 4B,4C, 5AD, 5BC, 6AD, 6BC, 8AD(Advance),8BC (Advance)",
    "maxLoad": 30,
    "workloadTotal": 19
  },
  {
    "id": 65,
    "name": "Ms. Tuba (Urdu)",
    "subj": "URDU & HINDI",
    "allottedClasses": "1B, 1CD, 2C, 2DE, 3C,3D,3EF",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 66,
    "name": "Ms. Farzana (Hindi)",
    "subj": "",
    "allottedClasses": "1A,2A, 2B, 2DE, 3A, 3B,3EF",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 67,
    "name": "Ms Asma Jabeen(Hindi)",
    "subj": "",
    "allottedClasses": "1CD, Support in 5BC class",
    "maxLoad": 30,
    "workloadTotal": 8
  },
  {
    "id": 68,
    "name": "Ms. Parveen (Urdu)",
    "subj": "",
    "allottedClasses": "4AD, 4BC, 5AD, 5BC, 6AD, 6BC;Nazera(EYP3A, EYP3B)",
    "maxLoad": 30,
    "workloadTotal": 29
  },
  {
    "id": 69,
    "name": "Ms. Raheema (Hindi)",
    "subj": "",
    "allottedClasses": "4AD, 4BC, 5AD, 5BC, 6AD, 6BC, 7AD, 7BC",
    "maxLoad": 30,
    "workloadTotal": 28
  },
  {
    "id": 70,
    "name": "Ms. Nusrath (Urdu)",
    "subj": "",
    "allottedClasses": "7AD, 7BC, 8AD, 8BC, 9D, 9BC",
    "maxLoad": 30,
    "workloadTotal": 23
  },
  {
    "id": 71,
    "name": "Ms. Meraj (Hindi)",
    "subj": "",
    "allottedClasses": "7AD,8AD, 8BC, 9A, 9BC, 10A, 10BC",
    "maxLoad": 30,
    "workloadTotal": 26
  },
  {
    "id": 72,
    "name": "Ms Shaheen (PE)",
    "subj": "P.E. KARATE SWIMMING",
    "allottedClasses": "2B, 2C, 2D, 2E 3A, 3B, 3C, 3D, 3E,5AD, 6AD, 7AD, 8AD, 9AD, 10A",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 73,
    "name": "Mr. Imran (PE)",
    "subj": "",
    "allottedClasses": "3F,4A, 4B, 4C, 4D, 5BC, 6B,6C, 7B,7C, 8B,8C, 9B,9C, 10BC",
    "maxLoad": 30,
    "workloadTotal": 30
  },
  {
    "id": 74,
    "name": "Ms. Afshan (Karate + PE)",
    "subj": "",
    "allottedClasses": "Karate (1A, 1B, 1C, 1D, 2A, 2B, 2C, 2D, 2E, 6A, 6D, 7A, 7D); PE (1A,1B,1C,1D,2A )",
    "maxLoad": 30,
    "workloadTotal": 23
  },
  {
    "id": 75,
    "name": "Mr. Sandeep (Karate)",
    "subj": "",
    "allottedClasses": "3A, 3B, 3C, 3D,3E,3F, 4A, 4B, 4C, 4D, 5A, 5B, 5C, 5D, 6B, 6C, 7B, 7C",
    "maxLoad": 30,
    "workloadTotal": 18
  },
  {
    "id": 76,
    "name": "Ms. Ramsha",
    "subj": "ART & CRAFT",
    "allottedClasses": "A&C/GK(3A, 3B, 3C, 3D, 3E,3F,4A, 4B, 4C, 4D); A& C (5A, 5B, 5C, 5D, 6A,  6B, 6C, 6D, 7A, 7B, 7C, 7D)",
    "maxLoad": 30,
    "workloadTotal": 22
  },
  {
    "id": 77,
    "name": "Ms Naseem (Public Speaking)",
    "subj": "PUBLIC SPEAKING",
    "allottedClasses": "3A, 3B, 3C, 3D, 3E,3F,4A, 4B, 4C, 4D, 5A, 5B, 5C, 5D, 6A, 6B, 6C, 6D, 7A, 7B, 7C, 7D",
    "maxLoad": 30,
    "workloadTotal": 22
  },
  {
    "id": 78,
    "name": "Ms Saadia",
    "subj": "",
    "allottedClasses": "10A,10B,10C",
    "maxLoad": 30,
    "workloadTotal": 6
  },
  {
    "id": 79,
    "name": "Ms. Nashra",
    "subj": "LIBRARY",
    "allottedClasses": "Urdu students Lib period 10A,10BC; Social corrections(3B,5A,5B,5C)",
    "maxLoad": 30,
    "workloadTotal": 8
  }
];

export const DEFAULT_CLASSES: ClassInfo[] = [
  {
    "name": "10A",
    "subs": "General:21\nAsst Teacher:8\nCOMPUTERS & ROBOTICS:7\nLIBRARY:4\nP.E. KARATE SWIMMING:2\nSH:1\nVE:1"
  },
  {
    "name": "10B",
    "subs": "General:16\nAsst Teacher:8\nCOMPUTERS & ROBOTICS:7\nSH:1"
  },
  {
    "name": "10BC",
    "subs": "General:6\nLIBRARY:4\nVE:1"
  },
  {
    "name": "10C",
    "subs": "General:16\nAsst Teacher:8\nCOMPUTERS & ROBOTICS:7\nSH:1"
  },
  {
    "name": "1A",
    "subs": "HRT:26\nGeneral:5\nPE:4\nAsst Teacher:3\nEnglish:3\nARABIC & TELUGU:1"
  },
  {
    "name": "1B",
    "subs": "HRT:26\nPE:4\nURDU & HINDI:4\nAsst Teacher:3\nEnglish:3\nARABIC & TELUGU:1\nGeneral:1"
  },
  {
    "name": "1C",
    "subs": "Asst Teacher:29\nPE:4\nEnglish:3\nARABIC & TELUGU:1\nGeneral:1"
  },
  {
    "name": "1CD",
    "subs": "URDU & HINDI:4\nAsst Teacher:4"
  },
  {
    "name": "1D",
    "subs": "HRT:26\nPE:4\nAsst Teacher:3\nEnglish:3\nARABIC & TELUGU:1\nGeneral:1"
  },
  {
    "name": "2A",
    "subs": "HRT:25\nAsst Teacher:7\nGeneral:5\nPE:4\nARABIC & TELUGU:1"
  },
  {
    "name": "2B",
    "subs": "HRT:25\nAsst Teacher:7\nGeneral:5\nPE:2\nP.E. KARATE SWIMMING:2\nARABIC & TELUGU:1"
  },
  {
    "name": "2C",
    "subs": "Asst Teacher:32\nURDU & HINDI:4\nPE:2\nP.E. KARATE SWIMMING:2\nARABIC & TELUGU:1\nGeneral:1"
  },
  {
    "name": "2D",
    "subs": "HRT:25\nAsst Teacher:7\nPE:2\nP.E. KARATE SWIMMING:2\nARABIC & TELUGU:1\nGeneral:1"
  },
  {
    "name": "2DE",
    "subs": "URDU & HINDI:4\nGeneral:4"
  },
  {
    "name": "2E",
    "subs": "HRT:25\nAsst Teacher:7\nPE:2\nP.E. KARATE SWIMMING:2\nARABIC & TELUGU:1\nGeneral:1"
  },
  {
    "name": "3A",
    "subs": "General:8\nAsst Teacher:7\nEnglish:6\nMATH:6\nHRT:5\nComputers:3\nP.E. KARATE SWIMMING:2\nARABIC & TELUGU:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "3B",
    "subs": "General:8\nEnglish:6\nMATH:6\nHRT:5\nAsst Teacher:4\nComputers:3\nSOCIAL, GK & BUSINESS:3\nP.E. KARATE SWIMMING:2\nARABIC & TELUGU:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "3C",
    "subs": "English:10\nAsst Teacher:6\nMATH:6\nHRT:5\nGeneral:4\nURDU & HINDI:4\nP.E. KARATE SWIMMING:2\nARABIC & TELUGU:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "3D",
    "subs": "English:10\nMATH:6\nHRT:5\nGeneral:5\nURDU & HINDI:4\nAsst Teacher:3\nSOCIAL, GK & BUSINESS:3\nP.E. KARATE SWIMMING:2\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "3E",
    "subs": "English:10\nMATH:6\nHRT:5\nGeneral:5\nAsst Teacher:3\nSOCIAL, GK & BUSINESS:3\nP.E. KARATE SWIMMING:2\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "3EF",
    "subs": "URDU & HINDI:4\nGeneral:4"
  },
  {
    "name": "3F",
    "subs": "General:19\nHRT:5\nEnglish:4\nAsst Teacher:3\nSOCIAL, GK & BUSINESS:3\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "4A",
    "subs": "General:19\nAsst Teacher:11\nSOCIAL, GK & BUSINESS:3\nARABIC & TELUGU:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "4AD",
    "subs": "General:4\nAsst Teacher:4"
  },
  {
    "name": "4B",
    "subs": "General:20\nAsst Teacher:11\nSOCIAL, GK & BUSINESS:3\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "4BC",
    "subs": "General:4\nAsst Teacher:4"
  },
  {
    "name": "4C",
    "subs": "General:20\nAsst Teacher:11\nSOCIAL, GK & BUSINESS:3\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "4D",
    "subs": "General:19\nAsst Teacher:11\nSOCIAL, GK & BUSINESS:3\nARABIC & TELUGU:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "5A",
    "subs": "General:25\nAsst Teacher:3\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "5AD",
    "subs": "Asst Teacher:7\nGeneral:7\nP.E. KARATE SWIMMING:2"
  },
  {
    "name": "5B",
    "subs": "General:25\nAsst Teacher:3\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "5BC",
    "subs": "Asst Teacher:11\nGeneral:9"
  },
  {
    "name": "5C",
    "subs": "General:25\nSOCIAL, GK & BUSINESS:3\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "5D",
    "subs": "General:28\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "6A",
    "subs": "General:28\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "6AD",
    "subs": "Asst Teacher:7\nGeneral:7\nP.E. KARATE SWIMMING:2"
  },
  {
    "name": "6B",
    "subs": "General:25\nAsst Teacher:5\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "6BC",
    "subs": "Asst Teacher:6\nGeneral:6"
  },
  {
    "name": "6C",
    "subs": "General:26\nAsst Teacher:4\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "6D",
    "subs": "General:19\nAsst Teacher:9\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "7A",
    "subs": "General:28\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "7AD",
    "subs": "General:6\nAsst Teacher:5\nARABIC & TELUGU:3\nP.E. KARATE SWIMMING:2"
  },
  {
    "name": "7B",
    "subs": "General:30\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "7BC",
    "subs": "Asst Teacher:6\nARABIC & TELUGU:3\nGeneral:3"
  },
  {
    "name": "7C",
    "subs": "General:30\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "7D",
    "subs": "General:28\nGK:1\nART & CRAFT:1\nPUBLIC SPEAKING:1"
  },
  {
    "name": "8A",
    "subs": "General:23\nAsst Teacher:5\nEnglish:4\nVE:1"
  },
  {
    "name": "8AD",
    "subs": "General:8\nP.E. KARATE SWIMMING:2\nBasic:1\nAdv:1"
  },
  {
    "name": "8B",
    "subs": "General:25\nAsst Teacher:5\nEnglish:3"
  },
  {
    "name": "8BC",
    "subs": "General:8\nVE:1\nBasic:1\nAdv:1"
  },
  {
    "name": "8C",
    "subs": "General:28\nEnglish:3\nAsst Teacher:2"
  },
  {
    "name": "8D",
    "subs": "General:23\nAsst Teacher:5\nEnglish:4\nVE:1"
  },
  {
    "name": "9A",
    "subs": "General:33\nEnglish:4\nVE:1"
  },
  {
    "name": "9AD",
    "subs": "P.E. KARATE SWIMMING:2"
  },
  {
    "name": "9B",
    "subs": "General:21\nCOMPUTERS & ROBOTICS:6\nEnglish:4\nAsst Teacher:3"
  },
  {
    "name": "9BC",
    "subs": "General:8\nVE:1"
  },
  {
    "name": "9C",
    "subs": "General:31\nAsst Teacher:3"
  },
  {
    "name": "9D",
    "subs": "General:33\nAsst Teacher:4\nVE:1"
  },
  {
    "name": "EYP1B",
    "subs": "Asst Teacher:3"
  },
  {
    "name": "EYP2A",
    "subs": "General:3"
  },
  {
    "name": "EYP2B",
    "subs": "General:3"
  },
  {
    "name": "EYP2C",
    "subs": "General:3"
  },
  {
    "name": "EYP3A",
    "subs": "General:3"
  },
  {
    "name": "EYP3B",
    "subs": "General:3"
  },
  {
    "name": "EYP3C",
    "subs": "General:3"
  }
];

export const DEFAULT_SLOTS: SlotsMap = {
  "1A|0|0": {
    "t": 12,
    "s": "HRT"
  },
  "1A|0|1": {
    "t": 12,
    "s": "HRT"
  },
  "1A|0|2": {
    "t": 12,
    "s": "HRT"
  },
  "1A|0|4": {
    "t": 12,
    "s": "HRT"
  },
  "1A|0|6": {
    "t": 12,
    "s": "HRT"
  },
  "1A|1|0": {
    "t": 12,
    "s": "HRT"
  },
  "1A|1|2": {
    "t": 12,
    "s": "HRT"
  },
  "1A|1|4": {
    "t": 12,
    "s": "HRT"
  },
  "1A|1|6": {
    "t": 12,
    "s": "HRT"
  },
  "1A|2|0": {
    "t": 12,
    "s": "HRT"
  },
  "1A|2|1": {
    "t": 12,
    "s": "HRT"
  },
  "1A|2|2": {
    "t": 74,
    "s": "PE"
  },
  "1A|2|3": {
    "t": 12,
    "s": "HRT"
  },
  "1A|2|4": {
    "t": 12,
    "s": "HRT"
  },
  "1A|2|6": {
    "t": 12,
    "s": "HRT"
  },
  "1A|3|1": {
    "t": 12,
    "s": "HRT"
  },
  "1A|3|2": {
    "t": 12,
    "s": "HRT"
  },
  "1A|3|3": {
    "t": 12,
    "s": "HRT"
  },
  "1A|3|4": {
    "t": 74,
    "s": "PE"
  },
  "1A|3|6": {
    "t": 12,
    "s": "HRT"
  },
  "1A|4|1": {
    "t": 12,
    "s": "HRT"
  },
  "1A|4|2": {
    "t": 12,
    "s": "HRT"
  },
  "1A|4|4": {
    "t": 12,
    "s": "HRT"
  },
  "1A|4|5": {
    "t": 12,
    "s": "HRT"
  },
  "1A|4|6": {
    "t": 12,
    "s": "HRT"
  },
  "1A|5|0": {
    "t": 12,
    "s": "HRT"
  },
  "1A|5|1": {
    "t": 12,
    "s": "HRT"
  },
  "1A|5|4": {
    "t": 12,
    "s": "HRT"
  },
  "1B|0|0": {
    "t": 13,
    "s": "HRT"
  },
  "1B|0|2": {
    "t": 13,
    "s": "HRT"
  },
  "1B|0|3": {
    "t": 13,
    "s": "HRT"
  },
  "1B|0|5": {
    "t": 13,
    "s": "HRT"
  },
  "1B|0|6": {
    "t": 13,
    "s": "HRT"
  },
  "1B|1|1": {
    "t": 74,
    "s": "PE"
  },
  "1B|1|2": {
    "t": 13,
    "s": "HRT"
  },
  "1B|1|4": {
    "t": 13,
    "s": "HRT"
  },
  "1B|1|5": {
    "t": 13,
    "s": "HRT"
  },
  "1B|1|6": {
    "t": 13,
    "s": "HRT"
  },
  "1B|2|0": {
    "t": 13,
    "s": "HRT"
  },
  "1B|2|2": {
    "t": 13,
    "s": "HRT"
  },
  "1B|2|3": {
    "t": 13,
    "s": "HRT"
  },
  "1B|2|4": {
    "t": 13,
    "s": "HRT"
  },
  "1B|2|6": {
    "t": 13,
    "s": "HRT"
  },
  "1B|3|0": {
    "t": 13,
    "s": "HRT"
  },
  "1B|3|2": {
    "t": 74,
    "s": "PE"
  },
  "1B|3|4": {
    "t": 13,
    "s": "HRT"
  },
  "1B|3|5": {
    "t": 13,
    "s": "HRT"
  },
  "1B|3|6": {
    "t": 13,
    "s": "HRT"
  },
  "1B|4|0": {
    "t": 13,
    "s": "HRT"
  },
  "1B|4|3": {
    "t": 13,
    "s": "HRT"
  },
  "1B|4|4": {
    "t": 13,
    "s": "HRT"
  },
  "1B|4|5": {
    "t": 13,
    "s": "HRT"
  },
  "1B|4|6": {
    "t": 13,
    "s": "HRT"
  },
  "1B|5|0": {
    "t": 13,
    "s": "HRT"
  },
  "1B|5|2": {
    "t": 13,
    "s": "HRT"
  },
  "1B|5|4": {
    "t": 13,
    "s": "HRT"
  },
  "1C|0|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|0|1": {
    "t": 74,
    "s": "PE"
  },
  "1C|0|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|0|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|1|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|1|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|1|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|2|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|2|1": {
    "t": 74,
    "s": "PE"
  },
  "1C|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|2|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|3|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|3|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|3|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|3|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|4|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|4|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|4|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|4|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|5|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|5|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1D|0|0": {
    "t": 15,
    "s": "HRT"
  },
  "1D|0|1": {
    "t": 15,
    "s": "HRT"
  },
  "1D|0|2": {
    "t": 74,
    "s": "PE"
  },
  "1D|0|4": {
    "t": 15,
    "s": "HRT"
  },
  "1D|0|6": {
    "t": 15,
    "s": "HRT"
  },
  "1D|1|0": {
    "t": 15,
    "s": "HRT"
  },
  "1D|1|3": {
    "t": 15,
    "s": "HRT"
  },
  "1D|1|4": {
    "t": 15,
    "s": "HRT"
  },
  "1D|1|5": {
    "t": 15,
    "s": "HRT"
  },
  "1D|1|6": {
    "t": 15,
    "s": "HRT"
  },
  "1D|2|1": {
    "t": 15,
    "s": "HRT"
  },
  "1D|2|3": {
    "t": 15,
    "s": "HRT"
  },
  "1D|2|4": {
    "t": 74,
    "s": "PE"
  },
  "1D|2|5": {
    "t": 15,
    "s": "HRT"
  },
  "1D|2|6": {
    "t": 15,
    "s": "HRT"
  },
  "1D|3|0": {
    "t": 15,
    "s": "HRT"
  },
  "1D|3|2": {
    "t": 15,
    "s": "HRT"
  },
  "1D|3|3": {
    "t": 15,
    "s": "HRT"
  },
  "1D|3|4": {
    "t": 15,
    "s": "HRT"
  },
  "1D|3|6": {
    "t": 15,
    "s": "HRT"
  },
  "1D|4|0": {
    "t": 15,
    "s": "HRT"
  },
  "1D|4|1": {
    "t": 15,
    "s": "HRT"
  },
  "1D|4|2": {
    "t": 15,
    "s": "HRT"
  },
  "1D|4|3": {
    "t": 15,
    "s": "HRT"
  },
  "1D|4|6": {
    "t": 15,
    "s": "HRT"
  },
  "1D|5|0": {
    "t": 15,
    "s": "HRT"
  },
  "1D|5|1": {
    "t": 15,
    "s": "HRT"
  },
  "1D|5|3": {
    "t": 15,
    "s": "HRT"
  },
  "2A|0|0": {
    "t": 16,
    "s": "HRT"
  },
  "2A|0|1": {
    "t": 16,
    "s": "HRT"
  },
  "2A|0|3": {
    "t": 16,
    "s": "HRT"
  },
  "2A|0|4": {
    "t": 74,
    "s": "PE"
  },
  "2A|0|6": {
    "t": 16,
    "s": "HRT"
  },
  "2A|1|0": {
    "t": 16,
    "s": "HRT"
  },
  "2A|1|3": {
    "t": 16,
    "s": "HRT"
  },
  "2A|1|4": {
    "t": 16,
    "s": "HRT"
  },
  "2A|1|5": {
    "t": 16,
    "s": "HRT"
  },
  "2A|1|6": {
    "t": 16,
    "s": "HRT"
  },
  "2A|2|2": {
    "t": 16,
    "s": "HRT"
  },
  "2A|2|3": {
    "t": 16,
    "s": "HRT"
  },
  "2A|2|4": {
    "t": 16,
    "s": "HRT"
  },
  "2A|2|6": {
    "t": 16,
    "s": "HRT"
  },
  "2A|3|0": {
    "t": 16,
    "s": "HRT"
  },
  "2A|3|2": {
    "t": 16,
    "s": "HRT"
  },
  "2A|3|3": {
    "t": 16,
    "s": "HRT"
  },
  "2A|3|4": {
    "t": 16,
    "s": "HRT"
  },
  "2A|3|5": {
    "t": 16,
    "s": "HRT"
  },
  "2A|4|0": {
    "t": 74,
    "s": "PE"
  },
  "2A|4|1": {
    "t": 16,
    "s": "HRT"
  },
  "2A|4|4": {
    "t": 16,
    "s": "HRT"
  },
  "2A|4|5": {
    "t": 16,
    "s": "HRT"
  },
  "2A|4|6": {
    "t": 16,
    "s": "HRT"
  },
  "2A|5|0": {
    "t": 16,
    "s": "HRT"
  },
  "2A|5|3": {
    "t": 16,
    "s": "HRT"
  },
  "2A|5|4": {
    "t": 16,
    "s": "HRT"
  },
  "2B|0|1": {
    "t": 17,
    "s": "HRT"
  },
  "2B|0|2": {
    "t": 17,
    "s": "HRT"
  },
  "2B|0|4": {
    "t": 17,
    "s": "HRT"
  },
  "2B|0|5": {
    "t": 17,
    "s": "HRT"
  },
  "2B|0|6": {
    "t": 17,
    "s": "HRT"
  },
  "2B|1|0": {
    "t": 17,
    "s": "HRT"
  },
  "2B|1|1": {
    "t": 17,
    "s": "HRT"
  },
  "2B|1|3": {
    "t": 17,
    "s": "HRT"
  },
  "2B|1|4": {
    "t": 17,
    "s": "HRT"
  },
  "2B|1|5": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2B|2|2": {
    "t": 17,
    "s": "HRT"
  },
  "2B|2|4": {
    "t": 17,
    "s": "HRT"
  },
  "2B|2|5": {
    "t": 17,
    "s": "HRT"
  },
  "2B|2|6": {
    "t": 17,
    "s": "HRT"
  },
  "2B|3|0": {
    "t": 17,
    "s": "HRT"
  },
  "2B|3|1": {
    "t": 17,
    "s": "HRT"
  },
  "2B|3|3": {
    "t": 17,
    "s": "HRT"
  },
  "2B|3|4": {
    "t": 17,
    "s": "HRT"
  },
  "2B|3|5": {
    "t": 17,
    "s": "HRT"
  },
  "2B|4|1": {
    "t": 17,
    "s": "HRT"
  },
  "2B|4|3": {
    "t": 17,
    "s": "HRT"
  },
  "2B|4|4": {
    "t": 17,
    "s": "HRT"
  },
  "2B|4|5": {
    "t": 17,
    "s": "HRT"
  },
  "2B|4|6": {
    "t": 17,
    "s": "HRT"
  },
  "2B|5|1": {
    "t": 17,
    "s": "HRT"
  },
  "2B|5|3": {
    "t": 17,
    "s": "HRT"
  },
  "2B|5|4": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2C|0|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|0|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|0|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|0|6": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2C|1|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|1|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|2|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|2|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|2|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|2|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|3|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|3|1": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2C|3|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|3|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|3|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|4|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|4|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|4|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|5|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|5|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|0|0": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2D|0|3": {
    "t": 19,
    "s": "HRT"
  },
  "2D|0|4": {
    "t": 19,
    "s": "HRT"
  },
  "2D|0|5": {
    "t": 19,
    "s": "HRT"
  },
  "2D|0|6": {
    "t": 19,
    "s": "HRT"
  },
  "2D|1|0": {
    "t": 19,
    "s": "HRT"
  },
  "2D|1|2": {
    "t": 19,
    "s": "HRT"
  },
  "2D|1|3": {
    "t": 19,
    "s": "HRT"
  },
  "2D|1|4": {
    "t": 19,
    "s": "HRT"
  },
  "2D|1|6": {
    "t": 19,
    "s": "HRT"
  },
  "2D|2|1": {
    "t": 19,
    "s": "HRT"
  },
  "2D|2|2": {
    "t": 19,
    "s": "HRT"
  },
  "2D|2|3": {
    "t": 19,
    "s": "HRT"
  },
  "2D|2|4": {
    "t": 19,
    "s": "HRT"
  },
  "2D|2|5": {
    "t": 19,
    "s": "HRT"
  },
  "2D|3|0": {
    "t": 19,
    "s": "HRT"
  },
  "2D|3|1": {
    "t": 19,
    "s": "HRT"
  },
  "2D|3|3": {
    "t": 19,
    "s": "HRT"
  },
  "2D|3|4": {
    "t": 19,
    "s": "HRT"
  },
  "2D|3|5": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2D|4|2": {
    "t": 19,
    "s": "HRT"
  },
  "2D|4|3": {
    "t": 19,
    "s": "HRT"
  },
  "2D|4|4": {
    "t": 19,
    "s": "HRT"
  },
  "2D|4|6": {
    "t": 19,
    "s": "HRT"
  },
  "2D|5|1": {
    "t": 19,
    "s": "HRT"
  },
  "2D|5|2": {
    "t": 19,
    "s": "HRT"
  },
  "2D|5|4": {
    "t": 19,
    "s": "HRT"
  },
  "2E|0|0": {
    "t": 20,
    "s": "HRT"
  },
  "2E|0|2": {
    "t": 20,
    "s": "HRT"
  },
  "2E|0|3": {
    "t": 20,
    "s": "HRT"
  },
  "2E|0|4": {
    "t": 20,
    "s": "HRT"
  },
  "2E|0|5": {
    "t": 20,
    "s": "HRT"
  },
  "2E|1|0": {
    "t": 20,
    "s": "HRT"
  },
  "2E|1|2": {
    "t": 20,
    "s": "HRT"
  },
  "2E|1|3": {
    "t": 20,
    "s": "HRT"
  },
  "2E|1|4": {
    "t": 20,
    "s": "HRT"
  },
  "2E|1|5": {
    "t": 20,
    "s": "HRT"
  },
  "2E|2|0": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2E|2|1": {
    "t": 20,
    "s": "HRT"
  },
  "2E|2|2": {
    "t": 20,
    "s": "HRT"
  },
  "2E|2|3": {
    "t": 20,
    "s": "HRT"
  },
  "2E|2|4": {
    "t": 20,
    "s": "HRT"
  },
  "2E|3|1": {
    "t": 20,
    "s": "HRT"
  },
  "2E|3|3": {
    "t": 20,
    "s": "HRT"
  },
  "2E|3|4": {
    "t": 20,
    "s": "HRT"
  },
  "2E|3|6": {
    "t": 20,
    "s": "HRT"
  },
  "2E|4|2": {
    "t": 20,
    "s": "HRT"
  },
  "2E|4|3": {
    "t": 20,
    "s": "HRT"
  },
  "2E|4|4": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "2E|4|5": {
    "t": 20,
    "s": "HRT"
  },
  "2E|4|6": {
    "t": 20,
    "s": "HRT"
  },
  "2E|5|1": {
    "t": 20,
    "s": "HRT"
  },
  "2E|5|2": {
    "t": 20,
    "s": "HRT"
  },
  "2E|5|3": {
    "t": 20,
    "s": "HRT"
  },
  "2C|0|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP1B|0|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|0|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1D|0|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2A|0|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1D|1|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1B|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1A|1|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2E|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2A|2|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1D|2|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2B|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1A|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|2|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1C|3|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP1B|3|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1B|3|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1A|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2B|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2E|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP1B|4|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2B|4|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2A|4|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|4|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|4|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|5|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|5|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1B|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2E|5|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3C|0|0": {
    "t": 23,
    "s": "Asst Teacher"
  },
  "3A|0|4": {
    "t": 23,
    "s": "Asst Teacher"
  },
  "3A|1|1": {
    "t": 23,
    "s": "Asst Teacher"
  },
  "3C|2|4": {
    "t": 23,
    "s": "Asst Teacher"
  },
  "3C|3|2": {
    "t": 23,
    "s": "Asst Teacher"
  },
  "3A|4|1": {
    "t": 23,
    "s": "Asst Teacher"
  },
  "3E|0|0": {
    "t": 24,
    "s": "English"
  },
  "3B|0|1": {
    "t": 24,
    "s": "English"
  },
  "3A|0|3": {
    "t": 24,
    "s": "English"
  },
  "3C|0|4": {
    "t": 24,
    "s": "English"
  },
  "3D|0|6": {
    "t": 24,
    "s": "English"
  },
  "3E|1|1": {
    "t": 24,
    "s": "English"
  },
  "3A|1|2": {
    "t": 24,
    "s": "English"
  },
  "3C|1|3": {
    "t": 24,
    "s": "English"
  },
  "3D|1|4": {
    "t": 24,
    "s": "English"
  },
  "3B|1|6": {
    "t": 24,
    "s": "English"
  },
  "3D|2|0": {
    "t": 24,
    "s": "English"
  },
  "3B|2|1": {
    "t": 24,
    "s": "English"
  },
  "3E|2|2": {
    "t": 24,
    "s": "English"
  },
  "3A|2|5": {
    "t": 24,
    "s": "English"
  },
  "3C|2|6": {
    "t": 24,
    "s": "English"
  },
  "3E|3|0": {
    "t": 24,
    "s": "English"
  },
  "3C|3|1": {
    "t": 24,
    "s": "English"
  },
  "3D|3|2": {
    "t": 24,
    "s": "English"
  },
  "3A|3|3": {
    "t": 24,
    "s": "English"
  },
  "3B|3|6": {
    "t": 24,
    "s": "English"
  },
  "3D|4|0": {
    "t": 24,
    "s": "English"
  },
  "3B|4|1": {
    "t": 24,
    "s": "English"
  },
  "3A|4|4": {
    "t": 24,
    "s": "English"
  },
  "3C|4|5": {
    "t": 24,
    "s": "English"
  },
  "3E|4|6": {
    "t": 24,
    "s": "English"
  },
  "3B|5|0": {
    "t": 24,
    "s": "English"
  },
  "3C|5|1": {
    "t": 24,
    "s": "English"
  },
  "3A|5|2": {
    "t": 24,
    "s": "English"
  },
  "3D|5|3": {
    "t": 24,
    "s": "English"
  },
  "3E|5|4": {
    "t": 24,
    "s": "English"
  },
  "4A|0|0": {
    "t": 25,
    "s": "General"
  },
  "3F|0|3": {
    "t": 25,
    "s": "General"
  },
  "4B|0|4": {
    "t": 25,
    "s": "General"
  },
  "4C|0|5": {
    "t": 25,
    "s": "General"
  },
  "4D|0|6": {
    "t": 25,
    "s": "General"
  },
  "4B|1|0": {
    "t": 25,
    "s": "General"
  },
  "4C|1|1": {
    "t": 25,
    "s": "General"
  },
  "4A|1|3": {
    "t": 25,
    "s": "General"
  },
  "4D|1|4": {
    "t": 25,
    "s": "General"
  },
  "3F|1|6": {
    "t": 25,
    "s": "General"
  },
  "4C|2|0": {
    "t": 25,
    "s": "General"
  },
  "4B|2|1": {
    "t": 25,
    "s": "General"
  },
  "4D|2|3": {
    "t": 25,
    "s": "General"
  },
  "3F|2|4": {
    "t": 25,
    "s": "General"
  },
  "4A|2|6": {
    "t": 25,
    "s": "General"
  },
  "4C|3|0": {
    "t": 25,
    "s": "General"
  },
  "4D|3|1": {
    "t": 25,
    "s": "General"
  },
  "3F|3|2": {
    "t": 25,
    "s": "General"
  },
  "4B|3|4": {
    "t": 25,
    "s": "General"
  },
  "4A|3|6": {
    "t": 25,
    "s": "General"
  },
  "4C|4|0": {
    "t": 25,
    "s": "General"
  },
  "4D|4|1": {
    "t": 25,
    "s": "General"
  },
  "4A|4|2": {
    "t": 25,
    "s": "General"
  },
  "4B|4|5": {
    "t": 25,
    "s": "General"
  },
  "3F|4|6": {
    "t": 25,
    "s": "General"
  },
  "4B|5|0": {
    "t": 25,
    "s": "General"
  },
  "4D|5|1": {
    "t": 25,
    "s": "General"
  },
  "4A|5|2": {
    "t": 25,
    "s": "General"
  },
  "4C|5|3": {
    "t": 25,
    "s": "General"
  },
  "3F|5|4": {
    "t": 25,
    "s": "General"
  },
  "5C|0|0": {
    "t": 26,
    "s": "General"
  },
  "5D|0|1": {
    "t": 26,
    "s": "General"
  },
  "5A|0|2": {
    "t": 26,
    "s": "General"
  },
  "5B|0|5": {
    "t": 26,
    "s": "General"
  },
  "3B|0|6": {
    "t": 26,
    "s": "Computers"
  },
  "5C|1|0": {
    "t": 26,
    "s": "General"
  },
  "3A|1|3": {
    "t": 26,
    "s": "Computers"
  },
  "5B|1|4": {
    "t": 26,
    "s": "General"
  },
  "5A|1|5": {
    "t": 26,
    "s": "General"
  },
  "5D|1|6": {
    "t": 26,
    "s": "General"
  },
  "5C|2|0": {
    "t": 26,
    "s": "General"
  },
  "5B|2|1": {
    "t": 26,
    "s": "General"
  },
  "3A|2|2": {
    "t": 26,
    "s": "Computers"
  },
  "5A|2|5": {
    "t": 26,
    "s": "General"
  },
  "5D|2|6": {
    "t": 26,
    "s": "General"
  },
  "5A|3|0": {
    "t": 26,
    "s": "General"
  },
  "5D|3|1": {
    "t": 26,
    "s": "General"
  },
  "5B|3|2": {
    "t": 26,
    "s": "General"
  },
  "3B|3|4": {
    "t": 26,
    "s": "Computers"
  },
  "5C|3|6": {
    "t": 26,
    "s": "General"
  },
  "3A|4|0": {
    "t": 26,
    "s": "Computers"
  },
  "5D|4|1": {
    "t": 26,
    "s": "General"
  },
  "5A|4|3": {
    "t": 26,
    "s": "General"
  },
  "3B|4|4": {
    "t": 26,
    "s": "Computers"
  },
  "5B|4|5": {
    "t": 26,
    "s": "General"
  },
  "5C|4|6": {
    "t": 26,
    "s": "General"
  },
  "5C|5|0": {
    "t": 26,
    "s": "General"
  },
  "5B|5|1": {
    "t": 26,
    "s": "General"
  },
  "5D|5|3": {
    "t": 26,
    "s": "General"
  },
  "5A|5|4": {
    "t": 26,
    "s": "General"
  },
  "7A|0|1": {
    "t": 27,
    "s": "General"
  },
  "6B|0|3": {
    "t": 27,
    "s": "General"
  },
  "6C|0|4": {
    "t": 27,
    "s": "General"
  },
  "6A|0|5": {
    "t": 27,
    "s": "General"
  },
  "6B|1|0": {
    "t": 27,
    "s": "General"
  },
  "7A|1|1": {
    "t": 27,
    "s": "General"
  },
  "6C|1|2": {
    "t": 27,
    "s": "General"
  },
  "6A|1|4": {
    "t": 27,
    "s": "General"
  },
  "6D|1|5": {
    "t": 27,
    "s": "General"
  },
  "6D|1|6": {
    "t": 27,
    "s": "General"
  },
  "6C|2|0": {
    "t": 27,
    "s": "General"
  },
  "6D|2|1": {
    "t": 27,
    "s": "General"
  },
  "6A|2|2": {
    "t": 27,
    "s": "General"
  },
  "7A|2|4": {
    "t": 27,
    "s": "General"
  },
  "6B|2|6": {
    "t": 27,
    "s": "General"
  },
  "7A|3|0": {
    "t": 27,
    "s": "General"
  },
  "6B|3|3": {
    "t": 27,
    "s": "General"
  },
  "6C|3|4": {
    "t": 27,
    "s": "General"
  },
  "6A|3|5": {
    "t": 27,
    "s": "General"
  },
  "6D|3|6": {
    "t": 27,
    "s": "General"
  },
  "6A|4|0": {
    "t": 27,
    "s": "General"
  },
  "6D|4|2": {
    "t": 27,
    "s": "General"
  },
  "6C|4|3": {
    "t": 27,
    "s": "General"
  },
  "7A|4|5": {
    "t": 27,
    "s": "General"
  },
  "6B|4|6": {
    "t": 27,
    "s": "General"
  },
  "7A|5|0": {
    "t": 27,
    "s": "General"
  },
  "6B|5|1": {
    "t": 27,
    "s": "General"
  },
  "6A|5|2": {
    "t": 27,
    "s": "General"
  },
  "6D|5|3": {
    "t": 27,
    "s": "General"
  },
  "6C|5|4": {
    "t": 27,
    "s": "General"
  },
  "8A|0|0": {
    "t": 28,
    "s": "General"
  },
  "8C|0|1": {
    "t": 28,
    "s": "General"
  },
  "7D|0|2": {
    "t": 28,
    "s": "General"
  },
  "8C|0|3": {
    "t": 28,
    "s": "General"
  },
  "7B|0|5": {
    "t": 28,
    "s": "General"
  },
  "7C|0|6": {
    "t": 28,
    "s": "General"
  },
  "8A|1|0": {
    "t": 28,
    "s": "General"
  },
  "8C|1|1": {
    "t": 28,
    "s": "General"
  },
  "7B|1|3": {
    "t": 28,
    "s": "General"
  },
  "7C|1|4": {
    "t": 28,
    "s": "General"
  },
  "7D|1|5": {
    "t": 28,
    "s": "General"
  },
  "8A|2|0": {
    "t": 28,
    "s": "General"
  },
  "7B|2|2": {
    "t": 28,
    "s": "General"
  },
  "7D|2|3": {
    "t": 28,
    "s": "General"
  },
  "7C|2|4": {
    "t": 28,
    "s": "General"
  },
  "8C|2|6": {
    "t": 28,
    "s": "General"
  },
  "7C|3|1": {
    "t": 28,
    "s": "General"
  },
  "8A|3|3": {
    "t": 28,
    "s": "General"
  },
  "7B|3|4": {
    "t": 28,
    "s": "General"
  },
  "7D|3|5": {
    "t": 28,
    "s": "General"
  },
  "8C|3|6": {
    "t": 28,
    "s": "General"
  },
  "8C|4|1": {
    "t": 28,
    "s": "General"
  },
  "7C|4|2": {
    "t": 28,
    "s": "General"
  },
  "7B|4|3": {
    "t": 28,
    "s": "General"
  },
  "7D|4|4": {
    "t": 28,
    "s": "General"
  },
  "8A|4|6": {
    "t": 28,
    "s": "General"
  },
  "8A|5|0": {
    "t": 28,
    "s": "General"
  },
  "7D|5|1": {
    "t": 28,
    "s": "General"
  },
  "7B|5|2": {
    "t": 28,
    "s": "General"
  },
  "7C|5|4": {
    "t": 28,
    "s": "General"
  },
  "8B|0|0": {
    "t": 29,
    "s": "General"
  },
  "9D|0|1": {
    "t": 29,
    "s": "General"
  },
  "9D|1|0": {
    "t": 29,
    "s": "General"
  },
  "8B|1|1": {
    "t": 29,
    "s": "General"
  },
  "9D|2|0": {
    "t": 29,
    "s": "General"
  },
  "8B|2|2": {
    "t": 29,
    "s": "General"
  },
  "9D|3|0": {
    "t": 29,
    "s": "General"
  },
  "8B|3|1": {
    "t": 29,
    "s": "General"
  },
  "9D|4|1": {
    "t": 29,
    "s": "General"
  },
  "8B|4|2": {
    "t": 29,
    "s": "General"
  },
  "9D|5|0": {
    "t": 29,
    "s": "General"
  },
  "8B|5|1": {
    "t": 29,
    "s": "General"
  },
  "8D|0|0": {
    "t": 30,
    "s": "General"
  },
  "9A|0|1": {
    "t": 30,
    "s": "General"
  },
  "9B|0|3": {
    "t": 30,
    "s": "General"
  },
  "9C|0|6": {
    "t": 30,
    "s": "General"
  },
  "8D|1|2": {
    "t": 30,
    "s": "General"
  },
  "9A|1|3": {
    "t": 30,
    "s": "General"
  },
  "9C|1|4": {
    "t": 30,
    "s": "General"
  },
  "9B|1|6": {
    "t": 30,
    "s": "General"
  },
  "8D|2|1": {
    "t": 30,
    "s": "General"
  },
  "9A|2|3": {
    "t": 30,
    "s": "General"
  },
  "9C|2|4": {
    "t": 30,
    "s": "General"
  },
  "9B|2|6": {
    "t": 30,
    "s": "General"
  },
  "9B|3|1": {
    "t": 30,
    "s": "General"
  },
  "9C|3|3": {
    "t": 30,
    "s": "General"
  },
  "8D|3|5": {
    "t": 30,
    "s": "General"
  },
  "9A|3|6": {
    "t": 30,
    "s": "General"
  },
  "9B|4|0": {
    "t": 30,
    "s": "General"
  },
  "9A|4|3": {
    "t": 30,
    "s": "General"
  },
  "8D|4|4": {
    "t": 30,
    "s": "General"
  },
  "9C|4|6": {
    "t": 30,
    "s": "General"
  },
  "9A|5|0": {
    "t": 30,
    "s": "General"
  },
  "8D|5|1": {
    "t": 30,
    "s": "General"
  },
  "9B|5|3": {
    "t": 30,
    "s": "General"
  },
  "9C|5|4": {
    "t": 30,
    "s": "General"
  },
  "3A|0|1": {
    "t": 31,
    "s": "MATH"
  },
  "3B|0|2": {
    "t": 31,
    "s": "MATH"
  },
  "3D|0|3": {
    "t": 31,
    "s": "MATH"
  },
  "3E|0|5": {
    "t": 31,
    "s": "MATH"
  },
  "3C|0|6": {
    "t": 31,
    "s": "MATH"
  },
  "3D|1|0": {
    "t": 31,
    "s": "MATH"
  },
  "3B|1|2": {
    "t": 31,
    "s": "MATH"
  },
  "3C|1|4": {
    "t": 31,
    "s": "MATH"
  },
  "3E|1|5": {
    "t": 31,
    "s": "MATH"
  },
  "3A|1|6": {
    "t": 31,
    "s": "MATH"
  },
  "3A|2|0": {
    "t": 31,
    "s": "MATH"
  },
  "3C|2|1": {
    "t": 31,
    "s": "MATH"
  },
  "3E|2|4": {
    "t": 31,
    "s": "MATH"
  },
  "3D|2|5": {
    "t": 31,
    "s": "MATH"
  },
  "3B|2|6": {
    "t": 31,
    "s": "MATH"
  },
  "3A|3|0": {
    "t": 31,
    "s": "MATH"
  },
  "3B|3|1": {
    "t": 31,
    "s": "MATH"
  },
  "3E|3|2": {
    "t": 31,
    "s": "MATH"
  },
  "3C|3|3": {
    "t": 31,
    "s": "MATH"
  },
  "3D|3|5": {
    "t": 31,
    "s": "MATH"
  },
  "3E|3|6": {
    "t": 31,
    "s": "MATH"
  },
  "3E|4|0": {
    "t": 31,
    "s": "MATH"
  },
  "3B|4|2": {
    "t": 31,
    "s": "MATH"
  },
  "3C|4|4": {
    "t": 31,
    "s": "MATH"
  },
  "3D|4|5": {
    "t": 31,
    "s": "MATH"
  },
  "3A|4|6": {
    "t": 31,
    "s": "MATH"
  },
  "3A|5|0": {
    "t": 31,
    "s": "MATH"
  },
  "3B|5|1": {
    "t": 31,
    "s": "MATH"
  },
  "3C|5|2": {
    "t": 31,
    "s": "MATH"
  },
  "3D|5|4": {
    "t": 31,
    "s": "MATH"
  },
  "4B|0|0": {
    "t": 32,
    "s": "General"
  },
  "4A|0|1": {
    "t": 32,
    "s": "General"
  },
  "4D|0|2": {
    "t": 32,
    "s": "General"
  },
  "8A|0|4": {
    "t": 32,
    "s": "General"
  },
  "4C|0|6": {
    "t": 32,
    "s": "General"
  },
  "4A|1|0": {
    "t": 32,
    "s": "General"
  },
  "4D|1|1": {
    "t": 32,
    "s": "General"
  },
  "4C|1|2": {
    "t": 32,
    "s": "General"
  },
  "4B|1|3": {
    "t": 32,
    "s": "General"
  },
  "8A|1|5": {
    "t": 32,
    "s": "General"
  },
  "4C|2|1": {
    "t": 32,
    "s": "General"
  },
  "4B|2|2": {
    "t": 32,
    "s": "General"
  },
  "8A|2|4": {
    "t": 32,
    "s": "General"
  },
  "4A|2|5": {
    "t": 32,
    "s": "General"
  },
  "4D|2|6": {
    "t": 32,
    "s": "General"
  },
  "4B|3|1": {
    "t": 32,
    "s": "General"
  },
  "4C|3|2": {
    "t": 32,
    "s": "General"
  },
  "4A|3|3": {
    "t": 32,
    "s": "General"
  },
  "4D|3|4": {
    "t": 32,
    "s": "General"
  },
  "8A|3|5": {
    "t": 32,
    "s": "General"
  },
  "4A|4|0": {
    "t": 32,
    "s": "General"
  },
  "4C|4|1": {
    "t": 32,
    "s": "General"
  },
  "4B|4|2": {
    "t": 32,
    "s": "General"
  },
  "8A|4|4": {
    "t": 32,
    "s": "General"
  },
  "4D|4|6": {
    "t": 32,
    "s": "General"
  },
  "4C|5|0": {
    "t": 32,
    "s": "General"
  },
  "8A|5|1": {
    "t": 32,
    "s": "General"
  },
  "4B|5|2": {
    "t": 32,
    "s": "General"
  },
  "4A|5|3": {
    "t": 32,
    "s": "General"
  },
  "4D|5|4": {
    "t": 32,
    "s": "General"
  },
  "5B|0|0": {
    "t": 33,
    "s": "General"
  },
  "5C|0|2": {
    "t": 33,
    "s": "General"
  },
  "5A|0|3": {
    "t": 33,
    "s": "General"
  },
  "5D|0|5": {
    "t": 33,
    "s": "General"
  },
  "6A|0|6": {
    "t": 33,
    "s": "General"
  },
  "5A|1|1": {
    "t": 33,
    "s": "General"
  },
  "5D|1|2": {
    "t": 33,
    "s": "General"
  },
  "5C|1|4": {
    "t": 33,
    "s": "General"
  },
  "5B|1|5": {
    "t": 33,
    "s": "General"
  },
  "6A|1|6": {
    "t": 33,
    "s": "General"
  },
  "5B|2|0": {
    "t": 33,
    "s": "General"
  },
  "6A|2|1": {
    "t": 33,
    "s": "General"
  },
  "5C|2|2": {
    "t": 33,
    "s": "General"
  },
  "5A|2|4": {
    "t": 33,
    "s": "General"
  },
  "5D|2|5": {
    "t": 33,
    "s": "General"
  },
  "5D|3|0": {
    "t": 33,
    "s": "General"
  },
  "5A|3|1": {
    "t": 33,
    "s": "General"
  },
  "6A|3|2": {
    "t": 33,
    "s": "General"
  },
  "5B|3|4": {
    "t": 33,
    "s": "General"
  },
  "5C|3|5": {
    "t": 33,
    "s": "General"
  },
  "5B|4|0": {
    "t": 33,
    "s": "General"
  },
  "5C|4|2": {
    "t": 33,
    "s": "General"
  },
  "6A|4|3": {
    "t": 33,
    "s": "General"
  },
  "5A|4|5": {
    "t": 33,
    "s": "General"
  },
  "5D|4|6": {
    "t": 33,
    "s": "General"
  },
  "6A|5|0": {
    "t": 33,
    "s": "General"
  },
  "5C|5|1": {
    "t": 33,
    "s": "General"
  },
  "5B|5|2": {
    "t": 33,
    "s": "General"
  },
  "5A|5|3": {
    "t": 33,
    "s": "General"
  },
  "5D|5|4": {
    "t": 33,
    "s": "General"
  },
  "6B|0|0": {
    "t": 34,
    "s": "General"
  },
  "6C|0|1": {
    "t": 34,
    "s": "General"
  },
  "6D|0|2": {
    "t": 34,
    "s": "General"
  },
  "6C|1|0": {
    "t": 34,
    "s": "General"
  },
  "6B|1|1": {
    "t": 34,
    "s": "General"
  },
  "6D|1|2": {
    "t": 34,
    "s": "General"
  },
  "6D|2|0": {
    "t": 34,
    "s": "General"
  },
  "6B|2|1": {
    "t": 34,
    "s": "General"
  },
  "6C|2|2": {
    "t": 34,
    "s": "General"
  },
  "6C|3|0": {
    "t": 34,
    "s": "General"
  },
  "6B|3|1": {
    "t": 34,
    "s": "General"
  },
  "6D|3|2": {
    "t": 34,
    "s": "General"
  },
  "6C|4|0": {
    "t": 34,
    "s": "General"
  },
  "6D|4|1": {
    "t": 34,
    "s": "General"
  },
  "6B|4|2": {
    "t": 34,
    "s": "General"
  },
  "6B|5|0": {
    "t": 34,
    "s": "General"
  },
  "6C|5|1": {
    "t": 34,
    "s": "General"
  },
  "6D|5|2": {
    "t": 34,
    "s": "General"
  },
  "7A|0|0": {
    "t": 35,
    "s": "General"
  },
  "7D|0|1": {
    "t": 35,
    "s": "General"
  },
  "7B|0|2": {
    "t": 35,
    "s": "General"
  },
  "3F|0|4": {
    "t": 35,
    "s": "General"
  },
  "7C|0|5": {
    "t": 35,
    "s": "General"
  },
  "7B|0|6": {
    "t": 35,
    "s": "General"
  },
  "7D|1|0": {
    "t": 35,
    "s": "General"
  },
  "3F|1|2": {
    "t": 35,
    "s": "General"
  },
  "7A|1|3": {
    "t": 35,
    "s": "General"
  },
  "7B|1|5": {
    "t": 35,
    "s": "General"
  },
  "7C|1|6": {
    "t": 35,
    "s": "General"
  },
  "7D|2|0": {
    "t": 35,
    "s": "General"
  },
  "7C|2|2": {
    "t": 35,
    "s": "General"
  },
  "7A|2|3": {
    "t": 35,
    "s": "General"
  },
  "3F|2|5": {
    "t": 35,
    "s": "General"
  },
  "7B|2|6": {
    "t": 35,
    "s": "General"
  },
  "7D|3|0": {
    "t": 35,
    "s": "General"
  },
  "7C|3|2": {
    "t": 35,
    "s": "General"
  },
  "7B|3|3": {
    "t": 35,
    "s": "General"
  },
  "3F|3|4": {
    "t": 35,
    "s": "General"
  },
  "7A|3|5": {
    "t": 35,
    "s": "General"
  },
  "7D|4|0": {
    "t": 35,
    "s": "General"
  },
  "3F|4|1": {
    "t": 35,
    "s": "General"
  },
  "7A|4|3": {
    "t": 35,
    "s": "General"
  },
  "7B|4|4": {
    "t": 35,
    "s": "General"
  },
  "7C|4|6": {
    "t": 35,
    "s": "General"
  },
  "3F|5|0": {
    "t": 35,
    "s": "General"
  },
  "7A|5|1": {
    "t": 35,
    "s": "General"
  },
  "7D|5|2": {
    "t": 35,
    "s": "General"
  },
  "7C|5|3": {
    "t": 35,
    "s": "General"
  },
  "8C|0|0": {
    "t": 37,
    "s": "General"
  },
  "8B|0|1": {
    "t": 37,
    "s": "General"
  },
  "9A|0|3": {
    "t": 37,
    "s": "General"
  },
  "8D|0|4": {
    "t": 37,
    "s": "General"
  },
  "9A|1|2": {
    "t": 37,
    "s": "General"
  },
  "8D|1|3": {
    "t": 37,
    "s": "General"
  },
  "8C|1|5": {
    "t": 37,
    "s": "General"
  },
  "8B|1|6": {
    "t": 37,
    "s": "General"
  },
  "8C|2|1": {
    "t": 37,
    "s": "General"
  },
  "8B|2|3": {
    "t": 37,
    "s": "General"
  },
  "8D|2|5": {
    "t": 37,
    "s": "General"
  },
  "9A|2|6": {
    "t": 37,
    "s": "General"
  },
  "8C|3|0": {
    "t": 37,
    "s": "General"
  },
  "8B|3|2": {
    "t": 37,
    "s": "General"
  },
  "8D|3|3": {
    "t": 37,
    "s": "General"
  },
  "9A|3|5": {
    "t": 37,
    "s": "General"
  },
  "8C|4|0": {
    "t": 37,
    "s": "General"
  },
  "8D|4|1": {
    "t": 37,
    "s": "General"
  },
  "9A|4|4": {
    "t": 37,
    "s": "General"
  },
  "8B|4|6": {
    "t": 37,
    "s": "General"
  },
  "8D|5|0": {
    "t": 37,
    "s": "General"
  },
  "8C|5|1": {
    "t": 37,
    "s": "General"
  },
  "9A|5|3": {
    "t": 37,
    "s": "General"
  },
  "8B|5|4": {
    "t": 37,
    "s": "General"
  },
  "10B|0|0": {
    "t": 36,
    "s": "General"
  },
  "10C|0|2": {
    "t": 36,
    "s": "General"
  },
  "9C|0|3": {
    "t": 36,
    "s": "General"
  },
  "9D|0|5": {
    "t": 36,
    "s": "General"
  },
  "10A|0|6": {
    "t": 36,
    "s": "General"
  },
  "9C|1|1": {
    "t": 36,
    "s": "General"
  },
  "10B|1|2": {
    "t": 36,
    "s": "General"
  },
  "9D|1|3": {
    "t": 36,
    "s": "General"
  },
  "10A|1|4": {
    "t": 36,
    "s": "General"
  },
  "10C|1|6": {
    "t": 36,
    "s": "General"
  },
  "10A|2|0": {
    "t": 36,
    "s": "General"
  },
  "9C|2|1": {
    "t": 36,
    "s": "General"
  },
  "10B|2|3": {
    "t": 36,
    "s": "General"
  },
  "9D|2|5": {
    "t": 36,
    "s": "General"
  },
  "10C|2|6": {
    "t": 36,
    "s": "General"
  },
  "9C|3|0": {
    "t": 36,
    "s": "General"
  },
  "10C|3|1": {
    "t": 36,
    "s": "General"
  },
  "10A|3|2": {
    "t": 36,
    "s": "General"
  },
  "10B|3|3": {
    "t": 36,
    "s": "General"
  },
  "9D|3|6": {
    "t": 36,
    "s": "General"
  },
  "10A|4|0": {
    "t": 36,
    "s": "General"
  },
  "9D|4|2": {
    "t": 36,
    "s": "General"
  },
  "9C|4|3": {
    "t": 36,
    "s": "General"
  },
  "10B|4|6": {
    "t": 36,
    "s": "General"
  },
  "10C|5|1": {
    "t": 36,
    "s": "General"
  },
  "9D|5|2": {
    "t": 36,
    "s": "General"
  },
  "9C|5|3": {
    "t": 36,
    "s": "General"
  },
  "10A|0|0": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "9B|0|1": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10C|0|3": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10B|0|5": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10C|0|6": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10C|1|0": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10A|1|1": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "9B|1|4": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10B|1|5": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10A|1|6": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10B|2|0": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10C|2|1": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10A|2|4": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "9B|2|5": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10B|3|0": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10B|3|1": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10C|3|3": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "9B|3|4": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10A|3|6": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10C|4|0": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10B|4|1": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "9B|4|3": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10A|4|6": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10B|5|1": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10A|5|2": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "10C|5|3": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "9B|5|4": {
    "t": 38,
    "s": "COMPUTERS & ROBOTICS"
  },
  "5A|0|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3D|0|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3C|0|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3E|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|0|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3F|1|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3E|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5B|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|1|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3D|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3C|2|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3D|2|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3F|2|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|2|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5A|2|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|3|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|3|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|3|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3E|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5B|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|4|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3F|4|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|4|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|4|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5B|5|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|5|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5A|5|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3C|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5D|0|0": {
    "t": 40,
    "s": "General"
  },
  "7C|0|1": {
    "t": 40,
    "s": "General"
  },
  "6A|0|2": {
    "t": 40,
    "s": "General"
  },
  "7B|0|4": {
    "t": 40,
    "s": "General"
  },
  "7D|0|5": {
    "t": 40,
    "s": "General"
  },
  "7A|0|6": {
    "t": 40,
    "s": "General"
  },
  "6A|1|1": {
    "t": 40,
    "s": "General"
  },
  "7A|1|2": {
    "t": 40,
    "s": "General"
  },
  "7D|1|3": {
    "t": 40,
    "s": "General"
  },
  "6C|1|4": {
    "t": 40,
    "s": "General"
  },
  "5C|1|5": {
    "t": 40,
    "s": "General"
  },
  "6B|1|6": {
    "t": 40,
    "s": "General"
  },
  "7A|2|0": {
    "t": 40,
    "s": "General"
  },
  "6C|2|1": {
    "t": 40,
    "s": "General"
  },
  "6D|2|2": {
    "t": 40,
    "s": "General"
  },
  "6B|2|4": {
    "t": 40,
    "s": "General"
  },
  "7C|2|5": {
    "t": 40,
    "s": "General"
  },
  "5C|2|6": {
    "t": 40,
    "s": "General"
  },
  "5C|3|1": {
    "t": 40,
    "s": "General"
  },
  "6D|3|3": {
    "t": 40,
    "s": "General"
  },
  "7C|3|4": {
    "t": 40,
    "s": "General"
  },
  "5D|3|5": {
    "t": 40,
    "s": "General"
  },
  "7D|3|6": {
    "t": 40,
    "s": "General"
  },
  "6D|4|0": {
    "t": 40,
    "s": "General"
  },
  "6A|4|2": {
    "t": 40,
    "s": "General"
  },
  "5D|4|3": {
    "t": 40,
    "s": "General"
  },
  "6C|4|4": {
    "t": 40,
    "s": "General"
  },
  "7B|4|6": {
    "t": 40,
    "s": "General"
  },
  "7B|5|1": {
    "t": 40,
    "s": "General"
  },
  "6B|5|3": {
    "t": 40,
    "s": "General"
  },
  "3B|0|0": {
    "t": 2,
    "s": "HRT"
  },
  "3C|0|2": {
    "t": 2,
    "s": "HRT"
  },
  "3E|0|3": {
    "t": 2,
    "s": "HRT"
  },
  "3D|0|5": {
    "t": 2,
    "s": "HRT"
  },
  "3F|0|6": {
    "t": 2,
    "s": "HRT"
  },
  "3E|1|0": {
    "t": 2,
    "s": "HRT"
  },
  "3F|1|1": {
    "t": 2,
    "s": "HRT"
  },
  "3C|1|2": {
    "t": 2,
    "s": "HRT"
  },
  "3A|1|4": {
    "t": 2,
    "s": "HRT"
  },
  "3B|1|5": {
    "t": 2,
    "s": "HRT"
  },
  "3F|2|0": {
    "t": 2,
    "s": "HRT"
  },
  "3A|2|1": {
    "t": 2,
    "s": "HRT"
  },
  "3C|2|3": {
    "t": 2,
    "s": "HRT"
  },
  "3B|2|4": {
    "t": 2,
    "s": "HRT"
  },
  "3E|2|5": {
    "t": 2,
    "s": "HRT"
  },
  "3D|2|6": {
    "t": 2,
    "s": "HRT"
  },
  "3B|3|0": {
    "t": 2,
    "s": "HRT"
  },
  "3A|3|1": {
    "t": 2,
    "s": "HRT"
  },
  "3D|3|3": {
    "t": 2,
    "s": "HRT"
  },
  "3F|3|5": {
    "t": 2,
    "s": "HRT"
  },
  "3C|3|6": {
    "t": 2,
    "s": "HRT"
  },
  "3F|4|0": {
    "t": 2,
    "s": "HRT"
  },
  "3E|4|1": {
    "t": 2,
    "s": "HRT"
  },
  "3C|4|2": {
    "t": 2,
    "s": "HRT"
  },
  "3D|4|3": {
    "t": 2,
    "s": "HRT"
  },
  "3A|4|5": {
    "t": 2,
    "s": "HRT"
  },
  "3E|5|0": {
    "t": 2,
    "s": "HRT"
  },
  "3D|5|2": {
    "t": 2,
    "s": "HRT"
  },
  "3A|5|3": {
    "t": 2,
    "s": "HRT"
  },
  "3B|5|4": {
    "t": 2,
    "s": "HRT"
  },
  "4D|0|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|0|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6B|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|0|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|0|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|1|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6B|1|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|2|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|2|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6B|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|2|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|3|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|3|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6B|3|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6B|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|4|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|4|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|4|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|4|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|4|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|5|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|5|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|5|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|5|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6C|0|0": {
    "t": 43,
    "s": "General"
  },
  "6A|0|1": {
    "t": 43,
    "s": "General"
  },
  "6A|1|0": {
    "t": 43,
    "s": "General"
  },
  "6C|1|1": {
    "t": 43,
    "s": "General"
  },
  "6A|2|0": {
    "t": 43,
    "s": "General"
  },
  "6A|3|0": {
    "t": 43,
    "s": "General"
  },
  "6C|3|1": {
    "t": 43,
    "s": "General"
  },
  "6A|4|1": {
    "t": 43,
    "s": "General"
  },
  "6C|4|2": {
    "t": 43,
    "s": "General"
  },
  "6C|5|0": {
    "t": 43,
    "s": "General"
  },
  "7B|0|0": {
    "t": 40,
    "s": "General"
  },
  "5C|0|1": {
    "t": 40,
    "s": "General"
  },
  "5B|0|2": {
    "t": 40,
    "s": "General"
  },
  "5D|0|3": {
    "t": 40,
    "s": "General"
  },
  "5A|0|5": {
    "t": 40,
    "s": "General"
  },
  "7B|1|1": {
    "t": 40,
    "s": "General"
  },
  "5B|1|2": {
    "t": 40,
    "s": "General"
  },
  "5C|1|3": {
    "t": 40,
    "s": "General"
  },
  "5D|1|5": {
    "t": 40,
    "s": "General"
  },
  "5D|2|1": {
    "t": 40,
    "s": "General"
  },
  "5A|2|2": {
    "t": 40,
    "s": "General"
  },
  "7B|2|4": {
    "t": 40,
    "s": "General"
  },
  "5B|2|5": {
    "t": 40,
    "s": "General"
  },
  "5B|3|1": {
    "t": 40,
    "s": "General"
  },
  "5C|3|2": {
    "t": 40,
    "s": "General"
  },
  "5D|3|3": {
    "t": 40,
    "s": "General"
  },
  "5A|3|5": {
    "t": 40,
    "s": "General"
  },
  "7B|3|6": {
    "t": 40,
    "s": "General"
  },
  "5D|4|0": {
    "t": 40,
    "s": "General"
  },
  "5A|4|1": {
    "t": 40,
    "s": "General"
  },
  "5B|4|3": {
    "t": 40,
    "s": "General"
  },
  "5C|4|4": {
    "t": 40,
    "s": "General"
  },
  "5A|5|0": {
    "t": 40,
    "s": "General"
  },
  "5C|5|2": {
    "t": 40,
    "s": "General"
  },
  "7B|5|3": {
    "t": 40,
    "s": "General"
  },
  "8A|0|1": {
    "t": 24,
    "s": "English"
  },
  "8C|0|2": {
    "t": 24,
    "s": "English"
  },
  "9B|0|4": {
    "t": 24,
    "s": "English"
  },
  "6C|0|5": {
    "t": 24,
    "s": "GK"
  },
  "8D|0|6": {
    "t": 24,
    "s": "English"
  },
  "9B|1|0": {
    "t": 24,
    "s": "English"
  },
  "8C|1|2": {
    "t": 24,
    "s": "English"
  },
  "8B|1|3": {
    "t": 24,
    "s": "English"
  },
  "8D|1|5": {
    "t": 24,
    "s": "English"
  },
  "9A|1|6": {
    "t": 24,
    "s": "English"
  },
  "9A|2|0": {
    "t": 24,
    "s": "English"
  },
  "8A|2|1": {
    "t": 24,
    "s": "English"
  },
  "9B|2|3": {
    "t": 24,
    "s": "English"
  },
  "8B|2|6": {
    "t": 24,
    "s": "English"
  },
  "6D|3|0": {
    "t": 24,
    "s": "GK"
  },
  "9A|3|1": {
    "t": 24,
    "s": "English"
  },
  "8C|3|3": {
    "t": 24,
    "s": "English"
  },
  "8B|3|4": {
    "t": 24,
    "s": "English"
  },
  "9B|3|6": {
    "t": 24,
    "s": "English"
  },
  "9A|4|0": {
    "t": 24,
    "s": "English"
  },
  "8A|4|2": {
    "t": 24,
    "s": "English"
  },
  "8D|4|3": {
    "t": 24,
    "s": "English"
  },
  "6A|4|6": {
    "t": 24,
    "s": "GK"
  },
  "8D|5|2": {
    "t": 24,
    "s": "English"
  },
  "8A|5|3": {
    "t": 24,
    "s": "English"
  },
  "6B|5|4": {
    "t": 24,
    "s": "GK"
  },
  "10C|0|1": {
    "t": 44,
    "s": "General"
  },
  "9D|0|2": {
    "t": 44,
    "s": "General"
  },
  "9C|0|4": {
    "t": 44,
    "s": "General"
  },
  "10A|0|5": {
    "t": 44,
    "s": "General"
  },
  "10B|0|6": {
    "t": 44,
    "s": "General"
  },
  "10A|1|3": {
    "t": 44,
    "s": "General"
  },
  "10C|1|4": {
    "t": 44,
    "s": "General"
  },
  "10B|1|6": {
    "t": 44,
    "s": "General"
  },
  "10B|2|1": {
    "t": 44,
    "s": "General"
  },
  "9D|2|3": {
    "t": 44,
    "s": "General"
  },
  "10C|2|4": {
    "t": 44,
    "s": "General"
  },
  "10A|2|5": {
    "t": 44,
    "s": "General"
  },
  "9C|2|6": {
    "t": 44,
    "s": "General"
  },
  "10C|3|0": {
    "t": 44,
    "s": "General"
  },
  "9D|3|1": {
    "t": 44,
    "s": "General"
  },
  "10A|3|4": {
    "t": 44,
    "s": "General"
  },
  "9C|3|6": {
    "t": 44,
    "s": "General"
  },
  "10C|4|1": {
    "t": 44,
    "s": "General"
  },
  "9C|4|2": {
    "t": 44,
    "s": "General"
  },
  "10B|4|4": {
    "t": 44,
    "s": "General"
  },
  "10A|4|5": {
    "t": 44,
    "s": "General"
  },
  "10B|5|0": {
    "t": 44,
    "s": "General"
  },
  "9D|5|3": {
    "t": 44,
    "s": "General"
  },
  "10A|5|4": {
    "t": 44,
    "s": "General"
  },
  "8D|0|1": {
    "t": 47,
    "s": "General"
  },
  "7A|0|2": {
    "t": 47,
    "s": "GK"
  },
  "10B|0|3": {
    "t": 47,
    "s": "SH"
  },
  "8C|0|4": {
    "t": 47,
    "s": "General"
  },
  "8B|0|6": {
    "t": 47,
    "s": "General"
  },
  "8C|1|0": {
    "t": 47,
    "s": "General"
  },
  "8B|1|2": {
    "t": 47,
    "s": "General"
  },
  "7C|1|3": {
    "t": 47,
    "s": "GK"
  },
  "7A|1|5": {
    "t": 47,
    "s": "General"
  },
  "8A|1|6": {
    "t": 47,
    "s": "General"
  },
  "8B|2|0": {
    "t": 47,
    "s": "General"
  },
  "7A|2|2": {
    "t": 47,
    "s": "General"
  },
  "7B|2|3": {
    "t": 47,
    "s": "GK"
  },
  "8A|2|5": {
    "t": 47,
    "s": "General"
  },
  "8D|2|6": {
    "t": 47,
    "s": "General"
  },
  "8A|3|0": {
    "t": 47,
    "s": "General"
  },
  "7A|3|2": {
    "t": 47,
    "s": "General"
  },
  "7D|3|3": {
    "t": 47,
    "s": "GK"
  },
  "8C|3|5": {
    "t": 47,
    "s": "General"
  },
  "8D|4|0": {
    "t": 47,
    "s": "General"
  },
  "7A|4|2": {
    "t": 47,
    "s": "General"
  },
  "10A|4|3": {
    "t": 47,
    "s": "SH"
  },
  "10C|4|6": {
    "t": 47,
    "s": "SH"
  },
  "7A|5|3": {
    "t": 47,
    "s": "General"
  },
  "9C|0|0": {
    "t": 48,
    "s": "General"
  },
  "10B|0|1": {
    "t": 48,
    "s": "General"
  },
  "9A|0|2": {
    "t": 48,
    "s": "General"
  },
  "10A|0|4": {
    "t": 48,
    "s": "General"
  },
  "10C|0|5": {
    "t": 48,
    "s": "General"
  },
  "9B|0|6": {
    "t": 48,
    "s": "General"
  },
  "10B|1|0": {
    "t": 48,
    "s": "General"
  },
  "10C|1|2": {
    "t": 48,
    "s": "General"
  },
  "9C|1|3": {
    "t": 48,
    "s": "General"
  },
  "10A|1|5": {
    "t": 48,
    "s": "General"
  },
  "9D|1|6": {
    "t": 48,
    "s": "General"
  },
  "10C|2|0": {
    "t": 48,
    "s": "General"
  },
  "9D|2|1": {
    "t": 48,
    "s": "General"
  },
  "10A|2|2": {
    "t": 48,
    "s": "General"
  },
  "9B|2|4": {
    "t": 48,
    "s": "General"
  },
  "10B|2|6": {
    "t": 48,
    "s": "General"
  },
  "9B|3|0": {
    "t": 48,
    "s": "General"
  },
  "10B|3|2": {
    "t": 48,
    "s": "General"
  },
  "9A|3|3": {
    "t": 48,
    "s": "General"
  },
  "10A|3|5": {
    "t": 48,
    "s": "General"
  },
  "10C|3|6": {
    "t": 48,
    "s": "General"
  },
  "10B|4|0": {
    "t": 48,
    "s": "General"
  },
  "10A|4|2": {
    "t": 48,
    "s": "General"
  },
  "10C|4|3": {
    "t": 48,
    "s": "General"
  },
  "9C|4|4": {
    "t": 48,
    "s": "General"
  },
  "9A|4|6": {
    "t": 48,
    "s": "General"
  },
  "10A|5|0": {
    "t": 48,
    "s": "General"
  },
  "9D|5|1": {
    "t": 48,
    "s": "General"
  },
  "10C|5|2": {
    "t": 48,
    "s": "General"
  },
  "10B|5|3": {
    "t": 48,
    "s": "General"
  },
  "7D|0|0": {
    "t": 49,
    "s": "General"
  },
  "5A|0|1": {
    "t": 49,
    "s": "GK"
  },
  "8D|0|3": {
    "t": 49,
    "s": "General"
  },
  "7C|0|4": {
    "t": 49,
    "s": "General"
  },
  "9A|0|5": {
    "t": 49,
    "s": "General"
  },
  "8A|0|6": {
    "t": 49,
    "s": "General"
  },
  "8B|1|0": {
    "t": 49,
    "s": "General"
  },
  "7D|1|1": {
    "t": 49,
    "s": "General"
  },
  "8A|1|3": {
    "t": 49,
    "s": "General"
  },
  "5D|1|4": {
    "t": 49,
    "s": "GK"
  },
  "9A|1|5": {
    "t": 49,
    "s": "General"
  },
  "8D|1|6": {
    "t": 49,
    "s": "General"
  },
  "8C|2|0": {
    "t": 49,
    "s": "General"
  },
  "8B|2|1": {
    "t": 49,
    "s": "General"
  },
  "5B|2|3": {
    "t": 49,
    "s": "GK"
  },
  "7D|2|4": {
    "t": 49,
    "s": "General"
  },
  "7C|2|6": {
    "t": 49,
    "s": "General"
  },
  "8D|3|1": {
    "t": 49,
    "s": "General"
  },
  "9A|3|2": {
    "t": 49,
    "s": "General"
  },
  "8C|3|4": {
    "t": 49,
    "s": "General"
  },
  "8B|3|5": {
    "t": 49,
    "s": "General"
  },
  "7C|3|6": {
    "t": 49,
    "s": "General"
  },
  "8A|4|1": {
    "t": 49,
    "s": "General"
  },
  "7D|4|2": {
    "t": 49,
    "s": "General"
  },
  "7C|4|3": {
    "t": 49,
    "s": "General"
  },
  "5C|4|5": {
    "t": 49,
    "s": "GK"
  },
  "8C|5|0": {
    "t": 49,
    "s": "General"
  },
  "7C|5|1": {
    "t": 49,
    "s": "General"
  },
  "7D|5|3": {
    "t": 49,
    "s": "General"
  },
  "9A|5|4": {
    "t": 49,
    "s": "General"
  },
  "10C|0|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|0|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10B|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9D|0|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|1|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9D|1|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9B|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10B|1|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10C|1|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9C|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9B|2|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10B|2|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10C|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9C|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|2|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|3|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10C|3|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9D|3|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9C|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10B|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9D|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|4|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10B|4|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10C|4|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9B|4|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10C|5|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10B|5|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3E|0|1": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3D|0|2": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "5C|0|3": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3F|0|5": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4A|0|6": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4D|1|0": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4A|1|1": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4B|1|2": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3B|1|4": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3D|1|5": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3E|2|1": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4D|2|2": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3D|2|3": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "5C|2|5": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4C|2|6": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4B|3|0": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3E|3|3": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4C|3|4": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3B|3|5": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3F|3|6": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4D|4|0": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4C|4|2": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4B|4|3": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "4A|4|4": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3B|4|5": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "3F|5|1": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "5C|5|4": {
    "t": 51,
    "s": "SOCIAL, GK & BUSINESS"
  },
  "5D|0|2": {
    "t": 52,
    "s": "General"
  },
  "7A|0|3": {
    "t": 52,
    "s": "General"
  },
  "6D|0|5": {
    "t": 52,
    "s": "General"
  },
  "6B|0|6": {
    "t": 52,
    "s": "General"
  },
  "5B|1|0": {
    "t": 52,
    "s": "General"
  },
  "5A|1|2": {
    "t": 52,
    "s": "General"
  },
  "7B|1|4": {
    "t": 52,
    "s": "General"
  },
  "6A|1|5": {
    "t": 52,
    "s": "General"
  },
  "6C|1|6": {
    "t": 52,
    "s": "General"
  },
  "6B|2|0": {
    "t": 52,
    "s": "General"
  },
  "5A|2|1": {
    "t": 52,
    "s": "General"
  },
  "5D|2|3": {
    "t": 52,
    "s": "General"
  },
  "6C|2|4": {
    "t": 52,
    "s": "General"
  },
  "7A|2|5": {
    "t": 52,
    "s": "General"
  },
  "5B|2|6": {
    "t": 52,
    "s": "General"
  },
  "7B|3|1": {
    "t": 52,
    "s": "General"
  },
  "6C|3|2": {
    "t": 52,
    "s": "General"
  },
  "6D|3|4": {
    "t": 52,
    "s": "General"
  },
  "6B|3|5": {
    "t": 52,
    "s": "General"
  },
  "6A|3|6": {
    "t": 52,
    "s": "General"
  },
  "7A|4|0": {
    "t": 52,
    "s": "General"
  },
  "7B|4|1": {
    "t": 52,
    "s": "General"
  },
  "6D|4|3": {
    "t": 52,
    "s": "General"
  },
  "5B|4|4": {
    "t": 52,
    "s": "General"
  },
  "5A|4|6": {
    "t": 52,
    "s": "General"
  },
  "5D|5|2": {
    "t": 52,
    "s": "General"
  },
  "6A|5|4": {
    "t": 52,
    "s": "General"
  },
  "7C|0|2": {
    "t": 53,
    "s": "General"
  },
  "8B|0|3": {
    "t": 53,
    "s": "General"
  },
  "8A|0|5": {
    "t": 53,
    "s": "General"
  },
  "8C|0|6": {
    "t": 53,
    "s": "General"
  },
  "8D|1|0": {
    "t": 53,
    "s": "General"
  },
  "8C|1|3": {
    "t": 53,
    "s": "General"
  },
  "8A|1|4": {
    "t": 53,
    "s": "General"
  },
  "8B|1|5": {
    "t": 53,
    "s": "General"
  },
  "7D|1|6": {
    "t": 53,
    "s": "General"
  },
  "8D|2|0": {
    "t": 53,
    "s": "General"
  },
  "8C|2|2": {
    "t": 53,
    "s": "General"
  },
  "7C|2|3": {
    "t": 53,
    "s": "General"
  },
  "7D|2|5": {
    "t": 53,
    "s": "General"
  },
  "8A|2|6": {
    "t": 53,
    "s": "General"
  },
  "8A|3|1": {
    "t": 53,
    "s": "General"
  },
  "8C|3|2": {
    "t": 53,
    "s": "General"
  },
  "8D|3|4": {
    "t": 53,
    "s": "General"
  },
  "8B|3|6": {
    "t": 53,
    "s": "General"
  },
  "8B|4|0": {
    "t": 53,
    "s": "General"
  },
  "8C|4|2": {
    "t": 53,
    "s": "General"
  },
  "8A|4|3": {
    "t": 53,
    "s": "General"
  },
  "7D|4|5": {
    "t": 53,
    "s": "General"
  },
  "8D|4|6": {
    "t": 53,
    "s": "General"
  },
  "8B|5|0": {
    "t": 53,
    "s": "General"
  },
  "7C|5|2": {
    "t": 53,
    "s": "General"
  },
  "8D|5|3": {
    "t": 53,
    "s": "General"
  },
  "9C|0|2": {
    "t": 54,
    "s": "General"
  },
  "9D|0|4": {
    "t": 54,
    "s": "General"
  },
  "8BC|0|5": {
    "t": 54,
    "s": "VE"
  },
  "9A|0|6": {
    "t": 54,
    "s": "General"
  },
  "9B|1|1": {
    "t": 54,
    "s": "General"
  },
  "9C|1|2": {
    "t": 54,
    "s": "General"
  },
  "9A|1|4": {
    "t": 54,
    "s": "General"
  },
  "9D|1|5": {
    "t": 54,
    "s": "General"
  },
  "9B|2|2": {
    "t": 54,
    "s": "General"
  },
  "9C|2|3": {
    "t": 54,
    "s": "General"
  },
  "9D|2|4": {
    "t": 54,
    "s": "General"
  },
  "9A|2|5": {
    "t": 54,
    "s": "General"
  },
  "9A|3|0": {
    "t": 54,
    "s": "General"
  },
  "9C|3|1": {
    "t": 54,
    "s": "General"
  },
  "9D|3|3": {
    "t": 54,
    "s": "General"
  },
  "9B|3|5": {
    "t": 54,
    "s": "General"
  },
  "9C|4|0": {
    "t": 54,
    "s": "General"
  },
  "9A|4|2": {
    "t": 54,
    "s": "General"
  },
  "9B|4|4": {
    "t": 54,
    "s": "General"
  },
  "9D|4|6": {
    "t": 54,
    "s": "General"
  },
  "9B|5|1": {
    "t": 54,
    "s": "General"
  },
  "9BC|5|2": {
    "t": 54,
    "s": "VE"
  },
  "10BC|5|4": {
    "t": 54,
    "s": "VE"
  },
  "3F|0|0": {
    "t": 24,
    "s": "English"
  },
  "3C|0|1": {
    "t": 24,
    "s": "English"
  },
  "1A|0|3": {
    "t": 24,
    "s": "English"
  },
  "3D|0|4": {
    "t": 24,
    "s": "English"
  },
  "1C|1|0": {
    "t": 24,
    "s": "English"
  },
  "1A|1|1": {
    "t": 24,
    "s": "English"
  },
  "3E|1|3": {
    "t": 24,
    "s": "English"
  },
  "3F|1|5": {
    "t": 24,
    "s": "English"
  },
  "3C|1|6": {
    "t": 24,
    "s": "English"
  },
  "1D|2|0": {
    "t": 24,
    "s": "English"
  },
  "1B|2|1": {
    "t": 24,
    "s": "English"
  },
  "1C|2|2": {
    "t": 24,
    "s": "English"
  },
  "3D|2|4": {
    "t": 24,
    "s": "English"
  },
  "3E|2|6": {
    "t": 24,
    "s": "English"
  },
  "1B|3|1": {
    "t": 24,
    "s": "English"
  },
  "3F|3|3": {
    "t": 24,
    "s": "English"
  },
  "3E|3|4": {
    "t": 24,
    "s": "English"
  },
  "3C|3|5": {
    "t": 24,
    "s": "English"
  },
  "3D|3|6": {
    "t": 24,
    "s": "English"
  },
  "1A|4|0": {
    "t": 24,
    "s": "English"
  },
  "1B|4|1": {
    "t": 24,
    "s": "English"
  },
  "3F|4|2": {
    "t": 24,
    "s": "English"
  },
  "3D|4|4": {
    "t": 24,
    "s": "English"
  },
  "1D|4|5": {
    "t": 24,
    "s": "English"
  },
  "1C|5|0": {
    "t": 24,
    "s": "English"
  },
  "3E|5|1": {
    "t": 24,
    "s": "English"
  },
  "1D|5|2": {
    "t": 24,
    "s": "English"
  },
  "3C|5|4": {
    "t": 24,
    "s": "English"
  },
  "2C|0|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|0|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3B|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3A|0|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2E|0|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2A|1|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2B|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3B|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3A|1|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2A|2|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2B|2|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3B|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3A|2|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2E|2|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2A|3|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2B|3|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3A|3|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2E|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2C|4|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8D|4|2": {
    "t": 11,
    "s": "VE"
  },
  "3B|4|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8A|4|5": {
    "t": 11,
    "s": "VE"
  },
  "2E|5|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2A|5|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2B|5|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "2D|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|0|0": {
    "t": 57,
    "s": "General"
  },
  "4B|0|2": {
    "t": 57,
    "s": "General"
  },
  "5B|0|3": {
    "t": 57,
    "s": "General"
  },
  "4A|0|4": {
    "t": 57,
    "s": "General"
  },
  "4D|0|5": {
    "t": 57,
    "s": "General"
  },
  "4C|1|0": {
    "t": 57,
    "s": "General"
  },
  "5D|1|1": {
    "t": 57,
    "s": "General"
  },
  "5A|1|4": {
    "t": 57,
    "s": "General"
  },
  "4A|1|5": {
    "t": 57,
    "s": "General"
  },
  "4D|1|6": {
    "t": 57,
    "s": "General"
  },
  "4B|2|0": {
    "t": 57,
    "s": "General"
  },
  "5D|2|2": {
    "t": 57,
    "s": "General"
  },
  "5A|2|3": {
    "t": 57,
    "s": "General"
  },
  "4C|2|5": {
    "t": 57,
    "s": "General"
  },
  "4D|3|0": {
    "t": 57,
    "s": "General"
  },
  "4A|3|2": {
    "t": 57,
    "s": "General"
  },
  "5A|3|3": {
    "t": 57,
    "s": "General"
  },
  "5B|3|5": {
    "t": 57,
    "s": "General"
  },
  "4B|3|6": {
    "t": 57,
    "s": "General"
  },
  "5A|4|0": {
    "t": 57,
    "s": "General"
  },
  "4B|4|1": {
    "t": 57,
    "s": "General"
  },
  "5B|4|2": {
    "t": 57,
    "s": "General"
  },
  "4D|4|4": {
    "t": 57,
    "s": "General"
  },
  "5D|4|5": {
    "t": 57,
    "s": "General"
  },
  "5D|5|0": {
    "t": 57,
    "s": "General"
  },
  "4A|5|1": {
    "t": 57,
    "s": "General"
  },
  "4C|5|2": {
    "t": 57,
    "s": "General"
  },
  "5B|5|4": {
    "t": 57,
    "s": "General"
  },
  "6B|0|1": {
    "t": 58,
    "s": "General"
  },
  "7B|0|3": {
    "t": 58,
    "s": "General"
  },
  "6A|0|4": {
    "t": 58,
    "s": "General"
  },
  "7A|0|5": {
    "t": 58,
    "s": "General"
  },
  "7D|0|6": {
    "t": 58,
    "s": "General"
  },
  "7A|1|0": {
    "t": 58,
    "s": "General"
  },
  "5C|1|2": {
    "t": 58,
    "s": "General"
  },
  "6B|1|3": {
    "t": 58,
    "s": "General"
  },
  "7C|1|5": {
    "t": 58,
    "s": "General"
  },
  "7B|1|6": {
    "t": 58,
    "s": "General"
  },
  "7C|2|0": {
    "t": 58,
    "s": "General"
  },
  "7D|2|2": {
    "t": 58,
    "s": "General"
  },
  "5C|2|3": {
    "t": 58,
    "s": "General"
  },
  "7B|2|5": {
    "t": 58,
    "s": "General"
  },
  "6A|2|6": {
    "t": 58,
    "s": "General"
  },
  "6B|3|0": {
    "t": 58,
    "s": "General"
  },
  "7D|3|2": {
    "t": 58,
    "s": "General"
  },
  "7C|3|3": {
    "t": 58,
    "s": "General"
  },
  "5C|3|4": {
    "t": 58,
    "s": "General"
  },
  "9D|3|5": {
    "t": 58,
    "s": "VE"
  },
  "7A|3|6": {
    "t": 58,
    "s": "General"
  },
  "5C|4|0": {
    "t": 58,
    "s": "General"
  },
  "7C|4|1": {
    "t": 58,
    "s": "General"
  },
  "6B|4|3": {
    "t": 58,
    "s": "General"
  },
  "6A|4|4": {
    "t": 58,
    "s": "General"
  },
  "7D|5|0": {
    "t": 58,
    "s": "General"
  },
  "7A|5|2": {
    "t": 58,
    "s": "General"
  },
  "6A|5|3": {
    "t": 58,
    "s": "General"
  },
  "7B|5|4": {
    "t": 58,
    "s": "General"
  },
  "6D|0|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8B|0|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8A|0|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8D|0|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6C|0|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|1|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8A|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6C|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8D|1|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8C|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9A|2|1": {
    "t": 11,
    "s": "VE"
  },
  "6C|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8D|2|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8B|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8D|3|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8B|3|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8A|3|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6C|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8A|4|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8B|4|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|4|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8D|4|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8C|4|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8A|5|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8B|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6D|5|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "9B|0|0": {
    "t": 60,
    "s": "General"
  },
  "9C|0|1": {
    "t": 60,
    "s": "General"
  },
  "9D|0|3": {
    "t": 60,
    "s": "General"
  },
  "9A|0|4": {
    "t": 60,
    "s": "General"
  },
  "9C|1|0": {
    "t": 60,
    "s": "General"
  },
  "9A|1|1": {
    "t": 60,
    "s": "General"
  },
  "9B|1|3": {
    "t": 60,
    "s": "General"
  },
  "9D|1|4": {
    "t": 60,
    "s": "General"
  },
  "9C|2|0": {
    "t": 60,
    "s": "General"
  },
  "9B|2|1": {
    "t": 60,
    "s": "General"
  },
  "8C|2|3": {
    "t": 60,
    "s": "General"
  },
  "9A|2|4": {
    "t": 60,
    "s": "General"
  },
  "8C|3|1": {
    "t": 60,
    "s": "General"
  },
  "9D|3|2": {
    "t": 60,
    "s": "General"
  },
  "9B|3|3": {
    "t": 60,
    "s": "General"
  },
  "9C|3|4": {
    "t": 60,
    "s": "General"
  },
  "9A|4|1": {
    "t": 60,
    "s": "General"
  },
  "9B|4|2": {
    "t": 60,
    "s": "General"
  },
  "9D|4|3": {
    "t": 60,
    "s": "General"
  },
  "10A|4|4": {
    "t": 60,
    "s": "VE"
  },
  "9C|5|0": {
    "t": 60,
    "s": "General"
  },
  "9A|5|2": {
    "t": 60,
    "s": "General"
  },
  "8C|5|3": {
    "t": 60,
    "s": "General"
  },
  "9D|5|4": {
    "t": 60,
    "s": "General"
  },
  "1B|0|1": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "2A|0|2": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "2B|0|3": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "3B|0|5": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "1D|1|2": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "2D|1|5": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "4A|1|6": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "4D|2|0": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "7BC|2|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "8AD|2|2": {
    "t": 64,
    "s": "Adv"
  },
  "1C|2|4": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "2E|2|5": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "7BC|3|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "7AD|3|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3A|3|2": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "7AD|4|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "3C|4|3": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "8BC|4|4": {
    "t": 64,
    "s": "Adv"
  },
  "2C|4|5": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "7BC|5|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "1A|5|2": {
    "t": 61,
    "s": "ARABIC & TELUGU"
  },
  "7AD|5|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6AD|0|0": {
    "t": 64,
    "s": "General"
  },
  "6BC|0|2": {
    "t": 64,
    "s": "General"
  },
  "4B|0|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5BC|0|6": {
    "t": 64,
    "s": "General"
  },
  "5AD|1|0": {
    "t": 64,
    "s": "General"
  },
  "4A|1|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4D|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6BC|1|5": {
    "t": 64,
    "s": "General"
  },
  "4C|1|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4A|2|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5BC|2|4": {
    "t": 64,
    "s": "General"
  },
  "6AD|2|5": {
    "t": 64,
    "s": "General"
  },
  "5AD|3|2": {
    "t": 64,
    "s": "General"
  },
  "5BC|3|3": {
    "t": 64,
    "s": "General"
  },
  "4A|3|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4C|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5AD|4|2": {
    "t": 64,
    "s": "General"
  },
  "4C|4|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4B|4|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6AD|5|1": {
    "t": 64,
    "s": "General"
  },
  "6BC|5|2": {
    "t": 64,
    "s": "General"
  },
  "4D|5|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP2C|0|1": {
    "t": 63,
    "s": "General"
  },
  "EYP2A|0|2": {
    "t": 63,
    "s": "General"
  },
  "EYP2B|0|3": {
    "t": 63,
    "s": "General"
  },
  "3C|0|5": {
    "t": 63,
    "s": "General"
  },
  "3E|0|6": {
    "t": 63,
    "s": "General"
  },
  "3C|1|0": {
    "t": 63,
    "s": "General"
  },
  "EYP2A|1|1": {
    "t": 63,
    "s": "General"
  },
  "EYP2C|1|3": {
    "t": 63,
    "s": "General"
  },
  "3F|1|4": {
    "t": 63,
    "s": "General"
  },
  "EYP3C|1|5": {
    "t": 63,
    "s": "General"
  },
  "3E|2|0": {
    "t": 63,
    "s": "General"
  },
  "EYP3C|2|1": {
    "t": 63,
    "s": "General"
  },
  "3D|2|2": {
    "t": 63,
    "s": "General"
  },
  "EYP2B|2|3": {
    "t": 63,
    "s": "General"
  },
  "3C|2|5": {
    "t": 63,
    "s": "General"
  },
  "3F|3|0": {
    "t": 63,
    "s": "General"
  },
  "EYP2B|3|1": {
    "t": 63,
    "s": "General"
  },
  "3B|3|2": {
    "t": 63,
    "s": "General"
  },
  "EYP2A|3|3": {
    "t": 63,
    "s": "General"
  },
  "3A|3|5": {
    "t": 63,
    "s": "General"
  },
  "EYP3C|3|6": {
    "t": 63,
    "s": "General"
  },
  "3B|4|0": {
    "t": 63,
    "s": "General"
  },
  "EYP2C|4|1": {
    "t": 63,
    "s": "General"
  },
  "3A|4|2": {
    "t": 63,
    "s": "General"
  },
  "3E|4|3": {
    "t": 63,
    "s": "General"
  },
  "3D|4|6": {
    "t": 63,
    "s": "General"
  },
  "3D|5|0": {
    "t": 63,
    "s": "General"
  },
  "3B|5|2": {
    "t": 63,
    "s": "General"
  },
  "3F|5|3": {
    "t": 63,
    "s": "General"
  },
  "3A|5|4": {
    "t": 63,
    "s": "General"
  },
  "3F|0|1": {
    "t": 64,
    "s": "General"
  },
  "3D|1|1": {
    "t": 64,
    "s": "General"
  },
  "4B|2|6": {
    "t": 64,
    "s": "General"
  },
  "3E|3|1": {
    "t": 64,
    "s": "General"
  },
  "4C|4|5": {
    "t": 64,
    "s": "General"
  },
  "3D|0|0": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "2DE|0|1": {
    "t": 66,
    "s": "General"
  },
  "3EF|0|2": {
    "t": 66,
    "s": "General"
  },
  "1B|0|4": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "1CD|0|5": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "1B|1|0": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "2DE|1|1": {
    "t": 66,
    "s": "General"
  },
  "3D|1|3": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "2C|1|4": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "3C|1|5": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "2C|2|1": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "3C|2|2": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "3EF|2|3": {
    "t": 66,
    "s": "General"
  },
  "1B|2|5": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "3D|3|0": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "2DE|3|2": {
    "t": 66,
    "s": "General"
  },
  "3C|3|4": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "1CD|3|5": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "2C|3|6": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "2DE|4|1": {
    "t": 66,
    "s": "General"
  },
  "1B|4|2": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "1CD|4|4": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "3EF|4|5": {
    "t": 66,
    "s": "General"
  },
  "3C|4|6": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "2C|5|0": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "3D|5|1": {
    "t": 65,
    "s": "URDU & HINDI"
  },
  "3EF|5|2": {
    "t": 66,
    "s": "General"
  },
  "1CD|5|4": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "3A|0|0": {
    "t": 66,
    "s": "General"
  },
  "3B|0|3": {
    "t": 66,
    "s": "General"
  },
  "1A|0|5": {
    "t": 66,
    "s": "General"
  },
  "3A|1|0": {
    "t": 66,
    "s": "General"
  },
  "2A|1|2": {
    "t": 66,
    "s": "General"
  },
  "1A|1|3": {
    "t": 66,
    "s": "General"
  },
  "2B|1|6": {
    "t": 66,
    "s": "General"
  },
  "2B|2|0": {
    "t": 66,
    "s": "General"
  },
  "3B|2|2": {
    "t": 66,
    "s": "General"
  },
  "2A|2|5": {
    "t": 66,
    "s": "General"
  },
  "3A|2|6": {
    "t": 66,
    "s": "General"
  },
  "1A|3|0": {
    "t": 66,
    "s": "General"
  },
  "3B|3|3": {
    "t": 66,
    "s": "General"
  },
  "2A|3|6": {
    "t": 66,
    "s": "General"
  },
  "2B|4|0": {
    "t": 66,
    "s": "General"
  },
  "2A|4|2": {
    "t": 66,
    "s": "General"
  },
  "1A|4|3": {
    "t": 66,
    "s": "General"
  },
  "2B|5|0": {
    "t": 66,
    "s": "General"
  },
  "3A|5|1": {
    "t": 66,
    "s": "General"
  },
  "3B|5|3": {
    "t": 66,
    "s": "General"
  },
  "4BC|0|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4AD|0|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5BC|0|4": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "5AD|0|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP3A|1|0": {
    "t": 68,
    "s": "General"
  },
  "5BC|1|1": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "6AD|1|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4BC|1|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP3B|1|5": {
    "t": 68,
    "s": "General"
  },
  "5AD|2|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP3A|2|1": {
    "t": 68,
    "s": "General"
  },
  "6AD|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4AD|2|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6BC|2|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5BC|3|0": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "6AD|3|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4BC|3|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP3B|3|4": {
    "t": 68,
    "s": "General"
  },
  "EYP3A|3|5": {
    "t": 68,
    "s": "General"
  },
  "6BC|3|6": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "EYP3B|4|0": {
    "t": 68,
    "s": "General"
  },
  "6BC|4|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4AD|4|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5AD|4|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "6AD|4|5": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "4AD|5|0": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5AD|5|1": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "5BC|5|3": {
    "t": 9,
    "s": "Asst Teacher"
  },
  "4BC|5|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "7BC|1|0": {
    "t": 70,
    "s": "General"
  },
  "7AD|2|1": {
    "t": 70,
    "s": "General"
  },
  "7AD|3|4": {
    "t": 70,
    "s": "General"
  },
  "7BC|3|5": {
    "t": 70,
    "s": "General"
  },
  "7BC|4|0": {
    "t": 70,
    "s": "General"
  },
  "9D|0|0": {
    "t": 70,
    "s": "General"
  },
  "8AD|0|2": {
    "t": 71,
    "s": "General"
  },
  "7AD|0|4": {
    "t": 71,
    "s": "General"
  },
  "9BC|0|5": {
    "t": 71,
    "s": "General"
  },
  "9D|1|2": {
    "t": 70,
    "s": "General"
  },
  "8BC|1|4": {
    "t": 71,
    "s": "General"
  },
  "9BC|1|5": {
    "t": 71,
    "s": "General"
  },
  "8AD|2|3": {
    "t": 71,
    "s": "General"
  },
  "8BC|2|4": {
    "t": 71,
    "s": "General"
  },
  "9D|2|6": {
    "t": 70,
    "s": "General"
  },
  "9BC|3|2": {
    "t": 71,
    "s": "General"
  },
  "8AD|3|6": {
    "t": 71,
    "s": "General"
  },
  "9BC|4|1": {
    "t": 71,
    "s": "General"
  },
  "8BC|4|3": {
    "t": 71,
    "s": "General"
  },
  "9D|4|4": {
    "t": 70,
    "s": "General"
  },
  "7AD|4|6": {
    "t": 71,
    "s": "General"
  },
  "8BC|5|2": {
    "t": 71,
    "s": "General"
  },
  "8AD|5|4": {
    "t": 71,
    "s": "General"
  },
  "9A|0|0": {
    "t": 71,
    "s": "General"
  },
  "10A|0|3": {
    "t": 79,
    "s": "LIBRARY"
  },
  "9A|1|0": {
    "t": 71,
    "s": "General"
  },
  "10BC|1|1": {
    "t": 79,
    "s": "LIBRARY"
  },
  "10A|1|2": {
    "t": 79,
    "s": "LIBRARY"
  },
  "10A|2|1": {
    "t": 79,
    "s": "LIBRARY"
  },
  "10BC|2|5": {
    "t": 79,
    "s": "LIBRARY"
  },
  "10A|3|1": {
    "t": 79,
    "s": "LIBRARY"
  },
  "9A|3|4": {
    "t": 71,
    "s": "General"
  },
  "10BC|3|5": {
    "t": 79,
    "s": "LIBRARY"
  },
  "10BC|4|2": {
    "t": 79,
    "s": "LIBRARY"
  },
  "9A|5|1": {
    "t": 71,
    "s": "General"
  },
  "10A|0|1": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "6AD|0|3": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "5AD|0|4": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3B|1|0": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "8AD|1|1": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3D|1|2": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "7AD|1|4": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3E|1|6": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "9AD|2|2": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3A|2|3": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "6AD|2|4": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "7AD|2|6": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "8AD|3|2": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "5AD|3|4": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3A|3|6": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3C|4|1": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3D|4|2": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "9AD|4|5": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3B|4|6": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3C|5|0": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "10A|5|1": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "3E|5|3": {
    "t": 72,
    "s": "P.E. KARATE SWIMMING"
  },
  "4D|0|1": {
    "t": 73,
    "s": "General"
  },
  "9B|0|2": {
    "t": 73,
    "s": "General"
  },
  "4C|0|3": {
    "t": 73,
    "s": "General"
  },
  "8B|0|4": {
    "t": 73,
    "s": "General"
  },
  "6B|0|5": {
    "t": 73,
    "s": "General"
  },
  "4B|0|6": {
    "t": 73,
    "s": "General"
  },
  "7C|1|1": {
    "t": 73,
    "s": "General"
  },
  "6B|1|2": {
    "t": 73,
    "s": "General"
  },
  "10BC|1|3": {
    "t": 73,
    "s": "General"
  },
  "4A|1|4": {
    "t": 73,
    "s": "General"
  },
  "5BC|1|6": {
    "t": 73,
    "s": "General"
  },
  "7B|2|0": {
    "t": 73,
    "s": "General"
  },
  "4D|2|1": {
    "t": 73,
    "s": "General"
  },
  "9C|2|2": {
    "t": 73,
    "s": "General"
  },
  "4C|2|3": {
    "t": 73,
    "s": "General"
  },
  "8C|2|5": {
    "t": 73,
    "s": "General"
  },
  "3F|2|6": {
    "t": 73,
    "s": "General"
  },
  "8B|3|0": {
    "t": 73,
    "s": "General"
  },
  "4A|3|1": {
    "t": 73,
    "s": "General"
  },
  "6C|3|3": {
    "t": 73,
    "s": "General"
  },
  "10BC|3|4": {
    "t": 73,
    "s": "General"
  },
  "4B|3|5": {
    "t": 73,
    "s": "General"
  },
  "5BC|4|1": {
    "t": 73,
    "s": "General"
  },
  "7B|4|2": {
    "t": 73,
    "s": "General"
  },
  "3F|4|3": {
    "t": 73,
    "s": "General"
  },
  "7C|4|4": {
    "t": 73,
    "s": "General"
  },
  "6C|4|6": {
    "t": 73,
    "s": "General"
  },
  "9B|5|0": {
    "t": 73,
    "s": "General"
  },
  "9C|5|1": {
    "t": 73,
    "s": "General"
  },
  "8C|5|4": {
    "t": 73,
    "s": "General"
  },
  "2B|0|0": {
    "t": 74,
    "s": "General"
  },
  "2C|1|0": {
    "t": 74,
    "s": "General"
  },
  "6A|1|2": {
    "t": 74,
    "s": "General"
  },
  "6D|1|4": {
    "t": 74,
    "s": "General"
  },
  "2D|2|0": {
    "t": 74,
    "s": "General"
  },
  "2E|3|0": {
    "t": 74,
    "s": "General"
  },
  "1D|3|1": {
    "t": 74,
    "s": "General"
  },
  "1C|4|1": {
    "t": 74,
    "s": "General"
  },
  "7D|4|3": {
    "t": 74,
    "s": "General"
  },
  "7A|4|4": {
    "t": 74,
    "s": "General"
  },
  "1B|5|1": {
    "t": 74,
    "s": "General"
  },
  "2A|5|2": {
    "t": 74,
    "s": "General"
  },
  "1A|5|3": {
    "t": 74,
    "s": "General"
  },
  "7C|0|0": {
    "t": 75,
    "s": "General"
  },
  "5B|0|1": {
    "t": 75,
    "s": "General"
  },
  "3A|0|2": {
    "t": 75,
    "s": "General"
  },
  "6C|0|3": {
    "t": 75,
    "s": "General"
  },
  "4C|0|4": {
    "t": 75,
    "s": "General"
  },
  "4B|1|1": {
    "t": 75,
    "s": "General"
  },
  "7B|1|2": {
    "t": 75,
    "s": "General"
  },
  "5A|1|3": {
    "t": 75,
    "s": "General"
  },
  "3E|1|4": {
    "t": 75,
    "s": "General"
  },
  "3B|2|0": {
    "t": 75,
    "s": "General"
  },
  "5C|2|1": {
    "t": 75,
    "s": "General"
  },
  "4A|2|2": {
    "t": 75,
    "s": "General"
  },
  "5D|2|4": {
    "t": 75,
    "s": "General"
  },
  "3C|3|0": {
    "t": 75,
    "s": "General"
  },
  "3F|3|1": {
    "t": 75,
    "s": "General"
  },
  "6B|3|2": {
    "t": 75,
    "s": "General"
  },
  "4D|3|3": {
    "t": 75,
    "s": "General"
  },
  "3D|3|4": {
    "t": 75,
    "s": "General"
  },
  "4C|0|2": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "7D|0|3": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "6D|0|4": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "3A|0|6": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "3C|1|1": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "7C|1|2": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "5D|1|3": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "4B|1|5": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "7A|1|6": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "3F|2|1": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "5B|2|2": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "3B|2|5": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "3D|3|1": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "7B|3|2": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "6A|3|3": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "4D|3|5": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "5A|3|6": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "3E|4|2": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "5C|4|3": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "6B|4|4": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "4A|4|6": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "6C|5|3": {
    "t": 76,
    "s": "ART & CRAFT"
  },
  "7B|0|1": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "7C|0|3": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "5C|0|5": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "3B|1|1": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "7D|1|2": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "3F|1|3": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "4D|1|5": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "5A|1|6": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "6B|2|2": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "4A|2|3": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "4C|2|4": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "6C|2|6": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "7A|3|3": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "6A|3|4": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "6D|3|5": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "5D|3|6": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "3C|4|0": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "3D|4|1": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "3A|4|3": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "3E|4|4": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "5B|4|6": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "4B|5|3": {
    "t": 77,
    "s": "PUBLIC SPEAKING"
  },
  "10B|0|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10C|0|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10C|2|2": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|2|3": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10B|2|4": {
    "t": 11,
    "s": "Asst Teacher"
  },
  "10A|3|3": {
    "t": 11,
    "s": "Asst Teacher"
  }
};
