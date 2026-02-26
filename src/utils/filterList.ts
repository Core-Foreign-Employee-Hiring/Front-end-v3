import { ContractEnumType } from '@/types/spec'
import {
  ApplicationMethodType,
  CarrerType,
  CompanyType,
  JobCategoryType,
  JobRoleType,
  LanguageType,
  NationalityType,
  SalaryEnumType,
  VisaType,
  WorkDayPatternType,
  WorkingDaysType,
  WorkType,
} from '@/types/job-post'

export const CONTRACT_LIST: { code: ContractEnumType | CarrerType; label: string }[] = [
  { code: 'INTERN', label: 'filter:filter.contractTypeFilter.content.INTERN' },
  { code: 'NEWCOMER', label: 'filter:filter.contractTypeFilter.content.NEWCOMER' },
  { code: 'EXPERIENCED', label: 'filter:filter.contractTypeFilter.content.EXPERIENCED' },
  { code: 'CONTRACT', label: 'filter:filter.contractTypeFilter.content.CONTRACT' },
  { code: 'REGULAR', label: 'filter:filter.contractTypeFilter.content.REGULAR' },
]

export const NATIONALITY_LIST: { code: NationalityType; label: string }[] = [
  { code: 'GHANA', label: 'signup:step2.nationalityField.content.GHANA' },
  { code: 'GABON', label: 'signup:step2.nationalityField.content.GABON' },
  { code: 'GUYANA', label: 'signup:step2.nationalityField.content.GUYANA' },
  { code: 'GAMBIA', label: 'signup:step2.nationalityField.content.GAMBIA' },
  { code: 'GUATEMALA', label: 'signup:step2.nationalityField.content.GUATEMALA' },
  { code: 'GRENADA', label: 'signup:step2.nationalityField.content.GRENADA' },
  { code: 'GREECE', label: 'signup:step2.nationalityField.content.GREECE' },
  { code: 'GUINEA', label: 'signup:step2.nationalityField.content.GUINEA' },
  { code: 'GUINEA_BISSAU', label: 'signup:step2.nationalityField.content.GUINEA_BISSAU' },
  { code: 'NAMIBIA', label: 'signup:step2.nationalityField.content.NAMIBIA' },
  { code: 'NAURU', label: 'signup:step2.nationalityField.content.NAURU' },
  { code: 'NIGERIA', label: 'signup:step2.nationalityField.content.NIGERIA' },
  { code: 'REPUBLIC_OF_SOUTH_SUDAN', label: 'signup:step2.nationalityField.content.REPUBLIC_OF_SOUTH_SUDAN' },
  { code: 'SOUTH_AFRICA', label: 'signup:step2.nationalityField.content.SOUTH_AFRICA' },
  { code: 'REPUBLIC_OF_SOUTH_OSSETIA', label: 'signup:step2.nationalityField.content.REPUBLIC_OF_SOUTH_OSSETIA' },
  { code: 'NETHERLANDS', label: 'signup:step2.nationalityField.content.NETHERLANDS' },
  { code: 'NEPAL', label: 'signup:step2.nationalityField.content.NEPAL' },
  { code: 'NORWAY', label: 'signup:step2.nationalityField.content.NORWAY' },
  { code: 'NEW_ZEALAND', label: 'signup:step2.nationalityField.content.NEW_ZEALAND' },
  { code: 'NIGER', label: 'signup:step2.nationalityField.content.NIGER' },
  { code: 'NICARAGUA', label: 'signup:step2.nationalityField.content.NICARAGUA' },
  { code: 'KOREA_REPUBLIC_OF', label: 'signup:step2.nationalityField.content.KOREA_REPUBLIC_OF' },
  { code: 'TAIWAN', label: 'signup:step2.nationalityField.content.TAIWAN' },
  { code: 'DENMARK', label: 'signup:step2.nationalityField.content.DENMARK' },
  { code: 'DOMINICAN_REPUBLIC', label: 'signup:step2.nationalityField.content.DOMINICAN_REPUBLIC' },
  { code: 'DOMINICA', label: 'signup:step2.nationalityField.content.DOMINICA' },
  { code: 'GERMANY', label: 'signup:step2.nationalityField.content.GERMANY' },
  { code: 'EAST_TIMOR', label: 'signup:step2.nationalityField.content.EAST_TIMOR' },
  {
    code: 'LAO_PEOPLE_DEMOCRATIC_REPUBLIC',
    label: 'signup:step2.nationalityField.content.LAO_PEOPLE_DEMOCRATIC_REPUBLIC',
  },
  { code: 'LIBERIA', label: 'signup:step2.nationalityField.content.LIBERIA' },
  { code: 'LATVIA', label: 'signup:step2.nationalityField.content.LATVIA' },
  { code: 'RUSSIAN_FEDERATION', label: 'signup:step2.nationalityField.content.RUSSIAN_FEDERATION' },
  { code: 'LEBANON', label: 'signup:step2.nationalityField.content.LEBANON' },
  { code: 'LESOTHO', label: 'signup:step2.nationalityField.content.LESOTHO' },
  { code: 'ROMANIA', label: 'signup:step2.nationalityField.content.ROMANIA' },
  { code: 'LUXEMBOURG', label: 'signup:step2.nationalityField.content.LUXEMBOURG' },
  { code: 'RWANDA', label: 'signup:step2.nationalityField.content.RWANDA' },
  { code: 'LIBYAN_ARAB_JAMAHIRIYA', label: 'signup:step2.nationalityField.content.LIBYAN_ARAB_JAMAHIRIYA' },
  { code: 'REPUBLIC_OF_LITHUANIA', label: 'signup:step2.nationalityField.content.REPUBLIC_OF_LITHUANIA' },
  { code: 'LIECHTENSTEIN', label: 'signup:step2.nationalityField.content.LIECHTENSTEIN' },
  { code: 'MADAGASCAR', label: 'signup:step2.nationalityField.content.MADAGASCAR' },
  { code: 'MARSHALL_ISLANDS', label: 'signup:step2.nationalityField.content.MARSHALL_ISLANDS' },
  { code: 'MALAWI', label: 'signup:step2.nationalityField.content.MALAWI' },
  { code: 'MALAYSIA', label: 'signup:step2.nationalityField.content.MALAYSIA' },
  { code: 'MALI', label: 'signup:step2.nationalityField.content.MALI' },
  { code: 'MEXICO', label: 'signup:step2.nationalityField.content.MEXICO' },
  { code: 'MONACO', label: 'signup:step2.nationalityField.content.MONACO' },
  { code: 'MOROCCO', label: 'signup:step2.nationalityField.content.MOROCCO' },
  { code: 'MAURITIUS', label: 'signUp.nationality.content.MAURITIUS' },
  { code: 'MAURITANIA', label: 'signup:step2.nationalityField.content.MAURITANIA' },
  { code: 'MOZAMBIQUE', label: 'signup:step2.nationalityField.content.MOZAMBIQUE' },
  { code: 'MONTENEGRO', label: 'signup:step2.nationalityField.content.MONTENEGRO' },
  { code: 'MOLDOVA', label: 'signup:step2.nationalityField.content.MOLDOVA' },
  { code: 'MALDIVES', label: 'signup:step2.nationalityField.content.MALDIVES' },
  { code: 'MALTA', label: 'signup:step2.nationalityField.content.MALTA' },
  { code: 'MONGOLIA', label: 'signup:step2.nationalityField.content.MONGOLIA' },
  { code: 'UNITED_STATES', label: 'signup:step2.nationalityField.content.UNITED_STATES' },
  { code: 'MYANMAR', label: 'signup:step2.nationalityField.content.MYANMAR' },
  {
    code: 'FEDERATED_STATES_OF_MICRONESIA',
    label: 'signup:step2.nationalityField.content.FEDERATED_STATES_OF_MICRONESIA',
  },
  { code: 'VANUATU', label: 'signup:step2.nationalityField.content.VANUATU' },
  { code: 'BAHRAIN', label: 'signup:step2.nationalityField.content.BAHRAIN' },
  { code: 'BARBADOS', label: 'signup:step2.nationalityField.content.BARBADOS' },
  { code: 'VATICAN_CITY', label: 'signup:step2.nationalityField.content.VATICAN_CITY' },
  { code: 'BAHAMAS', label: 'signup:step2.nationalityField.content.BAHAMAS' },
  { code: 'BANGLADESH', label: 'signup:step2.nationalityField.content.BANGLADESH' },
  { code: 'BENIN', label: 'signup:step2.nationalityField.content.BENIN' },
  { code: 'VENEZUELA', label: 'signup:step2.nationalityField.content.VENEZUELA' },
  { code: 'VIETNAM', label: 'signup:step2.nationalityField.content.VIETNAM' },
  { code: 'BELGIUM', label: 'signup:step2.nationalityField.content.BELGIUM' },
  { code: 'BELARUS', label: 'signup:step2.nationalityField.content.BELARUS' },
  { code: 'BELIZE', label: 'signup:step2.nationalityField.content.BELIZE' },
  { code: 'BOSNIA_AND_HERZEGOVINA', label: 'signup:step2.nationalityField.content.BOSNIA_AND_HERZEGOVINA' },
  { code: 'BOTSWANA', label: 'signup:step2.nationalityField.content.BOTSWANA' },
  { code: 'BOLIVIA', label: 'signup:step2.nationalityField.content.BOLIVIA' },
  { code: 'BURUNDI', label: 'signup:step2.nationalityField.content.BURUNDI' },
  { code: 'BURKINA_FASO', label: 'signup:step2.nationalityField.content.BURKINA_FASO' },
  { code: 'BHUTAN', label: 'signup:step2.nationalityField.content.BHUTAN' },
  { code: 'NORTH_MACEDONIA', label: 'signup:step2.nationalityField.content.NORTH_MACEDONIA' },
  { code: 'NORTHERN_CYPRUS', label: 'signup:step2.nationalityField.content.NORTHERN_CYPRUS' },
  { code: 'NORTH_KOREA', label: 'signup:step2.nationalityField.content.NORTH_KOREA' },
  { code: 'BULGARIA', label: 'signup:step2.nationalityField.content.BULGARIA' },
  { code: 'BRAZIL', label: 'signup:step2.nationalityField.content.BRAZIL' },
  { code: 'BRUNEI', label: 'signup:step2.nationalityField.content.BRUNEI' },
  { code: 'SAMOA', label: 'signup:step2.nationalityField.content.SAMOA' },
  { code: 'SAUDI_ARABIA', label: 'signup:step2.nationalityField.content.SAUDI_ARABIA' },
  { code: 'SAN_MARINO', label: 'signup:step2.nationalityField.content.SAN_MARINO' },
  { code: 'SAO_TOME_AND_PRINCIPE', label: 'signup:step2.nationalityField.content.SAO_TOME_AND_PRINCIPE' },
  { code: 'WESTERN_SAHARA', label: 'signup:step2.nationalityField.content.WESTERN_SAHARA' },
  { code: 'SENEGAL', label: 'signup:step2.nationalityField.content.SENEGAL' },
  { code: 'SERBIA', label: 'signup:step2.nationalityField.content.SERBIA' },
  { code: 'SEYCHELLES', label: 'signup:step2.nationalityField.content.SEYCHELLES' },
  { code: 'SAINT_LUCIA', label: 'signup:step2.nationalityField.content.SAINT_LUCIA' },
  {
    code: 'SAINT_VINCENT_AND_THE_GRENADINES',
    label: 'signup:step2.nationalityField.content.SAINT_VINCENT_AND_THE_GRENADINES',
  },
  { code: 'SAINT_KITTS_AND_NEVIS', label: 'signup:step2.nationalityField.content.SAINT_KITTS_AND_NEVIS' },
  { code: 'SOMALIA', label: 'signup:step2.nationalityField.content.SOMALIA' },
  { code: 'SOMALILAND', label: 'signup:step2.nationalityField.content.SOMALILAND' },
  { code: 'SOLOMON_ISLANDS', label: 'signup:step2.nationalityField.content.SOLOMON_ISLANDS' },
  { code: 'SUDAN', label: 'signup:step2.nationalityField.content.SUDAN' },
  { code: 'SURINAME', label: 'signup:step2.nationalityField.content.SURINAME' },
  { code: 'SRI_LANKA', label: 'signup:step2.nationalityField.content.SRI_LANKA' },
  { code: 'SWEDEN', label: 'signup:step2.nationalityField.content.SWEDEN' },
  { code: 'SWITZERLAND', label: 'signup:step2.nationalityField.content.SWITZERLAND' },
  { code: 'SPAIN', label: 'signup:step2.nationalityField.content.SPAIN' },
  { code: 'SLOVAKIA', label: 'signup:step2.nationalityField.content.SLOVAKIA' },
  { code: 'SLOVENIA', label: 'signup:step2.nationalityField.content.SLOVENIA' },
  { code: 'SYRIA', label: 'signup:step2.nationalityField.content.SYRIA' },
  { code: 'SIERRA_LEONE', label: 'signup:step2.nationalityField.content.SIERRA_LEONE' },
  { code: 'SINGAPORE', label: 'signup:step2.nationalityField.content.SINGAPORE' },
  { code: 'UNITED_ARAB_EMIRATES', label: 'signup:step2.nationalityField.content.UNITED_ARAB_EMIRATES' },
  { code: 'ARMENIA', label: 'signup:step2.nationalityField.content.ARMENIA' },
  { code: 'ARGENTINA', label: 'signup:step2.nationalityField.content.ARGENTINA' },
  { code: 'ARTSAKH', label: 'signup:step2.nationalityField.content.ARTSAKH' },
  { code: 'ICELAND', label: 'signup:step2.nationalityField.content.ICELAND' },
  { code: 'HAITI', label: 'signup:step2.nationalityField.content.HAITI' },
  { code: 'IRELAND', label: 'signup:step2.nationalityField.content.IRELAND' },
  { code: 'AZERBAIJAN', label: 'signup:step2.nationalityField.content.AZERBAIJAN' },
  { code: 'AFGHANISTAN', label: 'signup:step2.nationalityField.content.AFGHANISTAN' },
  { code: 'ANDORRA', label: 'signup:step2.nationalityField.content.ANDORRA' },
  { code: 'ALBANIA', label: 'signup:step2.nationalityField.content.ALBANIA' },
  { code: 'ALGERIA', label: 'signup:step2.nationalityField.content.ALGERIA' },
  { code: 'ABKHAZIA', label: 'signup:step2.nationalityField.content.ABKHAZIA' },
  { code: 'ANGOLA', label: 'signup:step2.nationalityField.content.ANGOLA' },
  { code: 'ANTIGUA_AND_BARBUDA', label: 'signup:step2.nationalityField.content.ANTIGUA_AND_BARBUDA' },
  { code: 'ERITREA', label: 'signup:step2.nationalityField.content.ERITREA' },
  { code: 'ESWATINI', label: 'signup:step2.nationalityField.content.ESWATINI' },
  { code: 'ESTONIA', label: 'signup:step2.nationalityField.content.ESTONIA' },
  { code: 'ECUADOR', label: 'signup:step2.nationalityField.content.ECUADOR' },
  { code: 'ETHIOPIA', label: 'signup:step2.nationalityField.content.ETHIOPIA' },
  { code: 'EL_SALVADOR', label: 'signup:step2.nationalityField.content.EL_SALVADOR' },
  { code: 'UNITED_KINGDOM', label: 'signup:step2.nationalityField.content.UNITED_KINGDOM' },
  { code: 'YEMEN', label: 'signup:step2.nationalityField.content.YEMEN' },
  { code: 'OMAN', label: 'signup:step2.nationalityField.content.OMAN' },
  { code: 'AUSTRIA', label: 'signup:step2.nationalityField.content.AUSTRIA' },
  { code: 'HONDURAS', label: 'signup:step2.nationalityField.content.HONDURAS' },
  { code: 'JORDAN', label: 'signup:step2.nationalityField.content.JORDAN' },
  { code: 'UGANDA', label: 'signup:step2.nationalityField.content.UGANDA' },
  { code: 'URUGUAY', label: 'signup:step2.nationalityField.content.URUGUAY' },
  { code: 'UZBEKISTAN', label: 'signup:step2.nationalityField.content.UZBEKISTAN' },
  { code: 'UKRAINE', label: 'signup:step2.nationalityField.content.UKRAINE' },
  { code: 'IRAQ', label: 'signup:step2.nationalityField.content.IRAQ' },
  { code: 'IRAN', label: 'signup:step2.nationalityField.content.IRAN' },
  { code: 'ISRAEL', label: 'signup:step2.nationalityField.content.ISRAEL' },
  { code: 'EGYPT', label: 'signup:step2.nationalityField.content.EGYPT' },
  { code: 'ITALY', label: 'signup:step2.nationalityField.content.ITALY' },
  { code: 'INDIA', label: 'signup:step2.nationalityField.content.INDIA' },
  { code: 'INDONESIA', label: 'signup:step2.nationalityField.content.INDONESIA' },
  { code: 'JAPAN', label: 'signup:step2.nationalityField.content.JAPAN' },
  { code: 'JAMAICA', label: 'signup:step2.nationalityField.content.JAMAICA' },
  { code: 'ZAMBIA', label: 'signup:step2.nationalityField.content.ZAMBIA' },
  { code: 'EQUATORIAL_GUINEA', label: 'signup:step2.nationalityField.content.EQUATORIAL_GUINEA' },
  { code: 'GEORGIA', label: 'signup:step2.nationalityField.content.GEORGIA' },
  { code: 'CHINA', label: 'signup:step2.nationalityField.content.CHINA' },
  { code: 'CENTRAL_AFRICAN_REPUBLIC', label: 'signup:step2.nationalityField.content.CENTRAL_AFRICAN_REPUBLIC' },
  { code: 'DJIBOUTI', label: 'signup:step2.nationalityField.content.DJIBOUTI' },
  { code: 'ZIMBABWE', label: 'signup:step2.nationalityField.content.ZIMBABWE' },
  { code: 'CHAD', label: 'signup:step2.nationalityField.content.CHAD' },
  { code: 'CZECH_REPUBLIC', label: 'signup:step2.nationalityField.content.CZECH_REPUBLIC' },
  { code: 'CHILE', label: 'signup:step2.nationalityField.content.CHILE' },
  { code: 'CAMEROON', label: 'signup:step2.nationalityField.content.CAMEROON' },
  { code: 'CABO_VERDE', label: 'signup:step2.nationalityField.content.CABO_VERDE' },
  { code: 'KAZAKHSTAN', label: 'signup:step2.nationalityField.content.KAZAKHSTAN' },
  { code: 'QATAR', label: 'signup:step2.nationalityField.content.QATAR' },
  { code: 'CAMBODIA', label: 'signup:step2.nationalityField.content.CAMBODIA' },
  { code: 'CANADA', label: 'signup:step2.nationalityField.content.CANADA' },
  { code: 'KENYA', label: 'signup:step2.nationalityField.content.KENYA' },
  { code: 'COMOROS', label: 'signup:step2.nationalityField.content.COMOROS' },
  { code: 'KOSOVO', label: 'signup:step2.nationalityField.content.KOSOVO' },
  { code: 'COSTA_RICA', label: 'signup:step2.nationalityField.content.COSTA_RICA' },
  { code: 'COTE_DIVOIRE', label: 'signup:step2.nationalityField.content.COTE_DIVOIRE' },
  { code: 'COLOMBIA', label: 'signup:step2.nationalityField.content.COLOMBIA' },
  { code: 'REPUBLIC_OF_THE_CONGO', label: 'signup:step2.nationalityField.content.REPUBLIC_OF_THE_CONGO' },
  {
    code: 'DEMOCRATIC_REPUBLIC_OF_THE_CONGO',
    label: 'signup:step2.nationalityField.content.DEMOCRATIC_REPUBLIC_OF_THE_CONGO',
  },
  { code: 'CUBA', label: 'signup:step2.nationalityField.content.CUBA' },
  { code: 'KUWAIT', label: 'signup:step2.nationalityField.content.KUWAIT' },
  { code: 'CROATIA', label: 'signup:step2.nationalityField.content.CROATIA' },
  { code: 'KYRGYZSTAN', label: 'signup:step2.nationalityField.content.KYRGYZSTAN' },
  { code: 'KIRIBATI', label: 'signup:step2.nationalityField.content.KIRIBATI' },
  { code: 'CYPRUS', label: 'signup:step2.nationalityField.content.CYPRUS' },
  { code: 'TAJIKISTAN', label: 'signup:step2.nationalityField.content.TAJIKISTAN' },
  { code: 'TANZANIA', label: 'signup:step2.nationalityField.content.TANZANIA' },
  { code: 'THAILAND', label: 'signup:step2.nationalityField.content.THAILAND' },
  { code: 'TOGO', label: 'signup:step2.nationalityField.content.TOGO' },
  { code: 'TONGA', label: 'signup:step2.nationalityField.content.TONGA' },
  { code: 'TURKMENISTAN', label: 'signup:step2.nationalityField.content.TURKMENISTAN' },
  { code: 'TUVALU', label: 'signup:step2.nationalityField.content.TUVALU' },
  { code: 'TUNISIA', label: 'signup:step2.nationalityField.content.TUNISIA' },
  { code: 'TURKIYE', label: 'signup:step2.nationalityField.content.TURKIYE' },
  { code: 'TRANSNISTRIA', label: 'signup:step2.nationalityField.content.TRANSNISTRIA' },
  { code: 'TRINIDAD_AND_TOBAGO', label: 'signup:step2.nationalityField.content.TRINIDAD_AND_TOBAGO' },
  { code: 'PANAMA', label: 'signup:step2.nationalityField.content.PANAMA' },
  { code: 'PARAGUAY', label: 'signup:step2.nationalityField.content.PARAGUAY' },
  { code: 'PAKISTAN', label: 'signup:step2.nationalityField.content.PAKISTAN' },
  { code: 'PAPUA_NEW_GUINEA', label: 'signup:step2.nationalityField.content.PAPUA_NEW_GUINEA' },
  { code: 'PALAU', label: 'signup:step2.nationalityField.content.PALAU' },
  { code: 'PALESTINE', label: 'signup:step2.nationalityField.content.PALESTINE' },
  { code: 'PERU', label: 'signup:step2.nationalityField.content.PERU' },
  { code: 'PORTUGAL', label: 'signup:step2.nationalityField.content.PORTUGAL' },
  { code: 'POLAND', label: 'signup:step2.nationalityField.content.POLAND' },
  { code: 'FRANCE', label: 'signup:step2.nationalityField.content.FRANCE' },
  { code: 'FIJI', label: 'signup:step2.nationalityField.content.FIJI' },
  { code: 'FINLAND', label: 'signup:step2.nationalityField.content.FINLAND' },
  { code: 'PHILIPPINES', label: 'signup:step2.nationalityField.content.PHILIPPINES' },
  { code: 'HUNGARY', label: 'signup:step2.nationalityField.content.HUNGARY' },
  { code: 'AUSTRALIA', label: 'signup:step2.nationalityField.content.AUSTRALIA' },
  { code: 'HONG_KONG', label: 'signup:step2.nationalityField.content.HONG_KONG' },
  { code: 'MACAU', label: 'signup:step2.nationalityField.content.MACAU' },
]

export const VISA_LIST: { code: VisaType; i18nKey: string }[] = [
  { code: 'A1', i18nKey: 'filter:filter.visaFilter.content.A1' },
  { code: 'A2', i18nKey: 'filter:filter.visaFilter.content.A2' },
  { code: 'A3', i18nKey: 'filter:filter.visaFilter.content.A3' },
  { code: 'B1', i18nKey: 'filter:filter.visaFilter.content.B1' },
  { code: 'B2', i18nKey: 'filter:filter.visaFilter.content.B2' },
  { code: 'C1', i18nKey: 'filter:filter.visaFilter.content.C1' },
  { code: 'C3', i18nKey: 'filter:filter.visaFilter.content.C3' },
  { code: 'C4', i18nKey: 'filter:filter.visaFilter.content.C4' },
  { code: 'D2', i18nKey: 'filter:filter.visaFilter.content.D2' },
  { code: 'D3', i18nKey: 'filter:filter.visaFilter.content.D3' },
  { code: 'D4', i18nKey: 'filter:filter.visaFilter.content.D4' },
  { code: 'D5', i18nKey: 'filter:filter.visaFilter.content.D5' },
  { code: 'D6', i18nKey: 'filter:filter.visaFilter.content.D6' },
  { code: 'D7', i18nKey: 'filter:filter.visaFilter.content.D7' },
  { code: 'D8', i18nKey: 'filter:filter.visaFilter.content.D8' },
  { code: 'D9', i18nKey: 'filter:filter.visaFilter.content.D9' },
  { code: 'D10', i18nKey: 'filter:filter.visaFilter.content.D10' },
  { code: 'E1', i18nKey: 'filter:filter.visaFilter.content.E1' },
  { code: 'E2', i18nKey: 'filter:filter.visaFilter.content.E2' },
  { code: 'E3', i18nKey: 'filter:filter.visaFilter.content.E3' },
  { code: 'E4', i18nKey: 'filter:filter.visaFilter.content.E4' },
  { code: 'E5', i18nKey: 'filter:filter.visaFilter.content.E5' },
  { code: 'E6', i18nKey: 'filter:filter.visaFilter.content.E6' },
  { code: 'E7', i18nKey: 'filter:filter.visaFilter.content.E7' },
  { code: 'E8', i18nKey: 'filter:filter.visaFilter.content.E8' },
  { code: 'E9', i18nKey: 'filter:filter.visaFilter.content.E9' },
  { code: 'E10', i18nKey: 'filter:filter.visaFilter.content.E10' },
  { code: 'F1', i18nKey: 'filter:filter.visaFilter.content.F1' },
  { code: 'F2', i18nKey: 'filter:filter.visaFilter.content.F2' },
  { code: 'F3', i18nKey: 'filter:filter.visaFilter.content.F3' },
  { code: 'F4', i18nKey: 'filter:filter.visaFilter.content.F4' },
  { code: 'F5', i18nKey: 'filter:filter.visaFilter.content.F5' },
  { code: 'F6', i18nKey: 'filter:filter.visaFilter.content.F6' },
  { code: 'G1', i18nKey: 'filter:filter.visaFilter.content.G1' },
  { code: 'H1', i18nKey: 'filter:filter.visaFilter.content.H1' },
  { code: 'H2', i18nKey: 'filter:filter.visaFilter.content.H2' },
  { code: 'F27', i18nKey: 'filter:filter.visaFilter.content.F27' },
] as const

export const WORK_REGIONS = [
  { code: 'SEOUL', label: 'filter:filter.regionFilter.content.SEOUL', short: '서울' },
  { code: 'GYEONGGI', label: 'filter:filter.regionFilter.content.GYEONGGI', short: '경기' },
  { code: 'INCHEON', label: 'filter:filter.regionFilter.content.INCHEON', short: '인천' },
  { code: 'BUSAN', label: 'filter:filter.regionFilter.content.BUSAN', short: '부산' },
  { code: 'DAEJEON', label: 'filter:filter.regionFilter.content.DAEJEON', short: '대전' },
  { code: 'DAEGU', label: 'filter:filter.regionFilter.content.DAEGU', short: '대꾸' },
  { code: 'ULSAN', label: 'filter:filter.regionFilter.content.ULSAN', short: '울산' },
  { code: 'GWANGJU', label: 'filter:filter.regionFilter.content.GWANGJU', short: '광주' },
  { code: 'GANGWON', label: 'filter:filter.regionFilter.content.GANGWON', short: '강원특별자치도' },
  { code: 'SEJONG', label: 'filter:filter.regionFilter.content.SEJONG', short: '세종특별자치도' },
  { code: 'CHUNGBUK', label: 'filter:filter.regionFilter.content.CHUNGBUK', short: '충북' },
  { code: 'CHUNGNAM', label: 'filter:filter.regionFilter.content.CHUNGNAM', short: '충남' },
  { code: 'GYEONGBUK', label: 'filter:filter.regionFilter.content.GYEONGBUK', short: '경북' },
  { code: 'GYEONGNAM', label: 'filter:filter.regionFilter.content.GYEONGNAM', short: '경남' },
  { code: 'JEJU', label: 'filter:filter.regionFilter.content.JEJU', short: '제주특별자치도' },
  { code: 'JEONBUK', label: 'filter:filter.regionFilter.content.JEONBUK', short: '전북특별자치도' },
  { code: 'JEONNAM', label: 'filter:filter.regionFilter.content.JEONNAM', short: '전남' },
] as const

export const LANGUAGE_LIST = [
  { code: 'ENGLISH', label: 'filter:filter.requiredLanguageFilter.content.ENGLISH' },
  { code: 'CHINESE', label: 'filter:filter.requiredLanguageFilter.content.CHINESE' },
  { code: 'HINDI', label: 'filter:filter.requiredLanguageFilter.content.HINDI' },
  { code: 'SPANISH', label: 'filter:filter.requiredLanguageFilter.content.SPANISH' },
  { code: 'FRENCH', label: 'filter:filter.requiredLanguageFilter.content.FRENCH' },
  { code: 'ARABIC', label: 'filter:filter.requiredLanguageFilter.content.ARABIC' },
  { code: 'BENGALI', label: 'filter:filter.requiredLanguageFilter.content.BENGALI' },
  { code: 'PORTUGUESE', label: 'filter:filter.requiredLanguageFilter.content.PORTUGUESE' },
  { code: 'RUSSIAN', label: 'filter:filter.requiredLanguageFilter.content.RUSSIAN' },
  { code: 'URDU', label: 'filter:filter.requiredLanguageFilter.content.URDU' },
  { code: 'INDONESIAN', label: 'filter:filter.requiredLanguageFilter.content.INDONESIAN' },
  { code: 'GERMAN', label: 'filter:filter.requiredLanguageFilter.content.GERMAN' },
  { code: 'JAPANESE', label: 'filter:filter.requiredLanguageFilter.content.JAPANESE' },
  { code: 'SWAHILI', label: 'filter:filter.requiredLanguageFilter.content.SWAHILI' },
  { code: 'MARATHI', label: 'filter:filter.requiredLanguageFilter.content.MARATHI' },
  { code: 'TELUGU', label: 'filter:filter.requiredLanguageFilter.content.TELUGU' },
  { code: 'TURKISH', label: 'filter:filter.requiredLanguageFilter.content.TURKISH' },
  { code: 'TAMIL', label: 'filter:filter.requiredLanguageFilter.content.TAMIL' },
  { code: 'VIETNAMESE', label: 'filter:filter.requiredLanguageFilter.content.VIETNAMESE' },
  { code: 'KOREAN', label: 'filter:filter.requiredLanguageFilter.content.KOREAN' },
  { code: 'ITALIAN', label: 'filter:filter.requiredLanguageFilter.content.ITALIAN' },
  { code: 'PERSIAN', label: 'filter:filter.requiredLanguageFilter.content.PERSIAN' },
  { code: 'POLISH', label: 'filter:filter.requiredLanguageFilter.content.POLISH' },
  { code: 'UKRAINIAN', label: 'filter:filter.requiredLanguageFilter.content.UKRAINIAN' },
] as const

export const JOB_CATEGORY_LIST: { code: JobCategoryType; label: string }[] = [
  { code: 'IT_DEVELOPMENT', label: 'filter:filter.jobRoleFilter.category.JOB_1.title' },
  { code: 'BUSINESS_MANAGEMENT', label: 'filter:filter.jobRoleFilter.category.JOB_2.title' },
  { code: 'MARKETING_ADVERTISING', label: 'filter:filter.jobRoleFilter.category.JOB_3.title' },
  { code: 'DESIGN', label: 'filter:filter.jobRoleFilter.category.JOB_4.title' },
  { code: 'SALES', label: 'filter:filter.jobRoleFilter.category.JOB_5.title' },
  { code: 'CUSTOMER_SERVICE_RETAIL', label: 'filter:filter.jobRoleFilter.category.JOB_6.title' },
  { code: 'TRANSLATION_INTERPRETATION', label: 'filter:filter.jobRoleFilter.category.JOB_7.title' },
  { code: 'MEDIA', label: 'filter:filter.jobRoleFilter.category.JOB_8.title' },
  { code: 'ENGINEERING_DESIGN', label: 'filter:filter.jobRoleFilter.category.JOB_9.title' },
  { code: 'HR', label: 'filter:filter.jobRoleFilter.category.JOB_10.title' },
  { code: 'GAME_PRODUCTION', label: 'filter:filter.jobRoleFilter.category.JOB_11.title' },
  { code: 'FINANCE', label: 'filter:filter.jobRoleFilter.category.JOB_12.title' },
  { code: 'MANUFACTURING_PRODUCTION', label: 'filter:filter.jobRoleFilter.category.JOB_13.title' },
  { code: 'EDUCATION', label: 'filter:filter.jobRoleFilter.category.JOB_14.title' },
  { code: 'HEALTHCARE_PHARMA_BIO', label: 'filter:filter.jobRoleFilter.category.JOB_15.title' },
  { code: 'LOGISTICS_TRADE', label: 'filter:filter.jobRoleFilter.category.JOB_16.title' },
  { code: 'FOOD_BEVERAGE', label: 'filter:filter.jobRoleFilter.category.JOB_17.title' },
  { code: 'CONSTRUCTION_FACILITIES', label: 'filter:filter.jobRoleFilter.category.JOB_18.title' },
  { code: 'ENTERTAINMENT', label: 'filter:filter.jobRoleFilter.category.JOB_19.title' },
]

export const IT_DEVELOPMENT_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'SOFTWARE_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.SOFTWARE_ENGINEER' },
  { code: 'WEB_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.WEB_DEVELOPER' },
  { code: 'BACKEND_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.BACKEND_DEVELOPER' },
  { code: 'FRONTEND_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.FRONTEND_DEVELOPER' },
  { code: 'JAVA_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.JAVA_DEVELOPER' },
  { code: 'C_CPP_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.C_CPP_DEVELOPER' },
  { code: 'PYTHON_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.PYTHON_DEVELOPER' },
  { code: 'MACHINE_LEARNING_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.MACHINE_LEARNING_ENGINEER' },
  { code: 'DEVOPS_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.DEVOPS_ENGINEER' },
  { code: 'DATA_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.DATA_ENGINEER' },
  { code: 'NODEJS_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.NODEJS_DEVELOPER' },
  { code: 'SYSTEM_NETWORK_ADMIN', label: 'filter:filter.jobRoleFilter.category.JOB_1.SYSTEM_NETWORK_ADMIN' },
  { code: 'ANDROID_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.ANDROID_DEVELOPER' },
  { code: 'IOS_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.IOS_DEVELOPER' },
  { code: 'EMBEDDED_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.EMBEDDED_DEVELOPER' },
  { code: 'TECH_SUPPORT', label: 'filter:filter.jobRoleFilter.category.JOB_1.TECH_SUPPORT' },
  { code: 'QA_TEST_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.QA_TEST_ENGINEER' },
  { code: 'DATA_SCIENTIST', label: 'filter:filter.jobRoleFilter.category.JOB_1.DATA_SCIENTIST' },
  { code: 'SECURITY_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.SECURITY_ENGINEER' },
  { code: 'BIGDATA_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.BIGDATA_ENGINEER' },
  { code: 'HARDWARE_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.HARDWARE_ENGINEER' },
  { code: 'BLOCKCHAIN_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.BLOCKCHAIN_ENGINEER' },
  {
    code: 'CROSS_PLATFORM_APP_DEVELOPER',
    label: 'filter:filter.jobRoleFilter.category.JOB_1.CROSS_PLATFORM_APP_DEVELOPER',
  },
  { code: 'DBA', label: 'filter:filter.jobRoleFilter.category.JOB_1.DBA' },
  { code: 'PHP_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.PHP_DEVELOPER' },
  { code: 'DOTNET_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.DOTNET_DEVELOPER' },
  { code: 'GRAPHICS_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.GRAPHICS_ENGINEER' },
  { code: 'AR_VR_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_1.AR_VR_ENGINEER' },
  { code: 'RUBY_ON_RAILS_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_1.RUBY_ON_RAILS_DEVELOPER' },
]

export const BUSINESS_MANAGEMENT_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'PM_PO', label: 'filter:filter.jobRoleFilter.category.JOB_2.PM_PO' },
  { code: 'PROJECT_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_2.PROJECT_MANAGER' },
  { code: 'STRATEGY_PLANNER', label: 'filter:filter.jobRoleFilter.category.JOB_2.STRATEGY_PLANNER' },
  { code: 'OPERATIONS_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_2.OPERATIONS_MANAGER' },
  { code: 'DATA_ANALYST', label: 'filter:filter.jobRoleFilter.category.JOB_2.DATA_ANALYST' },
  { code: 'BRAND_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_2.BRAND_MANAGER' },
  { code: 'GLOBAL_BUSINESS_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_2.GLOBAL_BUSINESS_DEVELOPER' },
  { code: 'CONSULTANT', label: 'filter:filter.jobRoleFilter.category.JOB_2.CONSULTANT' },
  { code: 'PURCHASING_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_2.PURCHASING_MANAGER' },
  { code: 'BUSINESS_INNOVATOR', label: 'filter:filter.jobRoleFilter.category.JOB_2.BUSINESS_INNOVATOR' },
  { code: 'AGILE_COACH', label: 'filter:filter.jobRoleFilter.category.JOB_2.AGILE_COACH' },
]

export const MARKETING_ADVERTISING_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'MARKETING_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_3.MARKETING_MANAGER' },
  { code: 'DIGITAL_MARKETER', label: 'filter:filter.jobRoleFilter.category.JOB_3.DIGITAL_MARKETER' },
  { code: 'CONTENT_MARKETER', label: 'filter:filter.jobRoleFilter.category.JOB_3.CONTENT_MARKETER' },
  { code: 'PERFORMANCE_MARKETER', label: 'filter:filter.jobRoleFilter.category.JOB_3.PERFORMANCE_MARKETER' },
  { code: 'BRAND_MARKETER', label: 'filter:filter.jobRoleFilter.category.JOB_3.BRAND_MARKETER' },
  { code: 'GLOBAL_MARKETING_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_3.GLOBAL_MARKETING_MANAGER' },
  { code: 'SNS_MARKETER', label: 'filter:filter.jobRoleFilter.category.JOB_3.SNS_MARKETER' },
  { code: 'PR_SPECIALIST', label: 'filter:filter.jobRoleFilter.category.JOB_3.PR_SPECIALIST' },
  { code: 'GROWTH_HACKER', label: 'filter:filter.jobRoleFilter.category.JOB_3.GROWTH_HACKER' },
  { code: 'MARKETING_DIRECTOR', label: 'filter:filter.jobRoleFilter.category.JOB_3.MARKETING_DIRECTOR' },
  { code: 'MARKET_RESEARCHER', label: 'filter:filter.jobRoleFilter.category.JOB_3.MARKET_RESEARCHER' },
]

export const DESIGN_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'UI_UX_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.UI_UX_DESIGNER' },
  { code: 'WEB_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.WEB_DESIGNER' },
  { code: 'GRAPHIC_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.GRAPHIC_DESIGNER' },
  { code: 'SPACE_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.SPACE_DESIGNER' },
  { code: 'MOTION_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.MOTION_DESIGNER' },
  { code: 'FASHION_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.FASHION_DESIGNER' },
  { code: 'ART_DIRECTOR', label: 'filter:filter.jobRoleFilter.category.JOB_4.ART_DIRECTOR' },
  { code: 'INDUSTRIAL_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.INDUSTRIAL_DESIGNER' },
  { code: 'FURNITURE_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.FURNITURE_DESIGNER' },
  { code: 'LANDSCAPE_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_4.LANDSCAPE_DESIGNER' },
]

export const SALE_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'INTERNATIONAL_SALES', label: 'filter:filter.jobRoleFilter.category.JOB_5.INTERNATIONAL_SALES' },
  { code: 'TECHNICAL_SALES', label: 'filter:filter.jobRoleFilter.category.JOB_5.TECHNICAL_SALES' },
  { code: 'SOLUTION_CONSULTANT', label: 'filter:filter.jobRoleFilter.category.JOB_5.SOLUTION_CONSULTANT' },
  { code: 'MEDIA_SALES', label: 'filter:filter.jobRoleFilter.category.JOB_5.MEDIA_SALES' },
  { code: 'CUSTOMER_SUCCESS_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_5.CUSTOMER_SUCCESS_MANAGER' },
  { code: 'SALES_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_5.SALES_ENGINEER' },
]
export const CUSTOMER_SERVICE_RETAIL_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'GLOBAL_CS_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_6.GLOBAL_CS_MANAGER' },
  { code: 'RETAIL_MD', label: 'filter:filter.jobRoleFilter.category.JOB_6.RETAIL_MD' },
  { code: 'CUSTOMER_SUPPORT', label: 'filter:filter.jobRoleFilter.category.JOB_6.CUSTOMER_SUPPORT' },
  { code: 'FASHION_MD', label: 'filter:filter.jobRoleFilter.category.JOB_6.FASHION_MD' },
  { code: 'CRM_SPECIALIST', label: 'filter:filter.jobRoleFilter.category.JOB_6.CRM_SPECIALIST' },
  { code: 'RECEPTIONIST', label: 'filter:filter.jobRoleFilter.category.JOB_6.RECEPTIONIST' },
  { code: 'TRAVEL_AGENT', label: 'filter:filter.jobRoleFilter.category.JOB_6.TRAVEL_AGENT' },
  { code: 'FLIGHT_ATTENDANT', label: 'filter:filter.jobRoleFilter.category.JOB_6.FLIGHT_ATTENDANT' },
  { code: 'STORE_CLERK', label: 'filter:filter.jobRoleFilter.category.JOB_6.STORE_CLERK' },
  { code: 'TOURISM_WORKER', label: 'filter:filter.jobRoleFilter.category.JOB_6.TOURISM_WORKER' },
]

export const TRANSLATION_INTERPRETATION_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'INTERPRETER', label: 'filter:filter.jobRoleFilter.category.JOB_7.INTERPRETER' },
  { code: 'TRANSLATOR', label: 'filter:filter.jobRoleFilter.category.JOB_7.TRANSLATOR' },
  { code: 'LOCALIZATION_SPECIALIST', label: 'filter:filter.jobRoleFilter.category.JOB_7.LOCALIZATION_SPECIALIST' },
]
export const MEDIA_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'CONTENT_CREATOR', label: 'filter:filter.jobRoleFilter.category.JOB_8.CONTENT_CREATOR' },
  { code: 'VIDEO_EDITOR', label: 'filter:filter.jobRoleFilter.category.JOB_8.VIDEO_EDITOR' },
  { code: 'VIDEO_PRODUCER', label: 'filter:filter.jobRoleFilter.category.JOB_8.VIDEO_PRODUCER' },
  { code: 'WRITER', label: 'filter:filter.jobRoleFilter.category.JOB_8.WRITER' },
  { code: 'PHOTOGRAPHER', label: 'filter:filter.jobRoleFilter.category.JOB_8.PHOTOGRAPHER' },
  { code: 'JOURNALIST', label: 'filter:filter.jobRoleFilter.category.JOB_8.JOURNALIST' },
  { code: 'CURATOR', label: 'filter:filter.jobRoleFilter.category.JOB_8.CURATOR' },
]
export const ENGINEERING_DESIGN_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'ELECTRICAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.ELECTRICAL_ENGINEER' },
  {
    code: 'ROBOTICS_AUTOMATION_ENGINEER',
    label: 'filter:filter.jobRoleFilter.category.JOB_9.ROBOTICS_AUTOMATION_ENGINEER',
  },
  { code: 'MECHANICAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.MECHANICAL_ENGINEER' },
  { code: 'CAD_3D_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_9.CAD_3D_DESIGNER' },
  { code: 'ELECTRIC_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.ELECTRIC_ENGINEER' },
  { code: 'CONTROL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.CONTROL_ENGINEER' },
  { code: 'PRODUCT_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.PRODUCT_ENGINEER' },
  {
    code: 'ELECTROMECHANICAL_ENGINEER',
    label: 'filter:filter.jobRoleFilter.category.JOB_9.ELECTROMECHANICAL_ENGINEER',
  },
  { code: 'EQUIPMENT_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.EQUIPMENT_ENGINEER' },
  { code: 'QA_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.QA_ENGINEER' },
  { code: 'INDUSTRIAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.INDUSTRIAL_ENGINEER' },
  { code: 'RF_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.RF_ENGINEER' },
  { code: 'CHEMICAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.CHEMICAL_ENGINEER' },
  { code: 'AEROSPACE_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.AEROSPACE_ENGINEER' },
  { code: 'IC_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.IC_ENGINEER' },
  { code: 'MATERIAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.MATERIAL_ENGINEER' },
  { code: 'PLANT_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.PLANT_ENGINEER' },
  { code: 'PLASTIC_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.PLASTIC_ENGINEER' },
  { code: 'QC_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.QC_ENGINEER' },
  { code: 'STRUCTURAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.STRUCTURAL_ENGINEER' },
  { code: 'CONSTRUCTION_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.CONSTRUCTION_ENGINEER' },
  { code: 'CIVIL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.CIVIL_ENGINEER' },
  { code: 'ENVIRONMENTAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.ENVIRONMENTAL_ENGINEER' },
  { code: 'PRODUCTION_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_9.PRODUCTION_ENGINEER' },
  { code: 'RND_RESEARCHER', label: 'filter:filter.jobRoleFilter.category.JOB_9.RND_RESEARCHER' },
]

export const HR_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'GLOBAL_HR_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_10.GLOBAL_HR_MANAGER' },
  { code: 'RECRUITER', label: 'filter:filter.jobRoleFilter.category.JOB_10.RECRUITER' },
  { code: 'HR_CONSULTANT', label: 'filter:filter.jobRoleFilter.category.JOB_10.HR_CONSULTANT' },
  { code: 'TECH_TRAINER', label: 'filter:filter.jobRoleFilter.category.JOB_10.TECH_TRAINER' },
  { code: 'INHOUSE_TRAINER', label: 'filter:filter.jobRoleFilter.category.JOB_10.INHOUSE_TRAINER' },
]

export const GAME_PRODUCTION_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'GAME_PLANNER', label: 'filter:filter.jobRoleFilter.category.JOB_11.GAME_PLANNER' },
  { code: 'GAME_ARTIST', label: 'filter:filter.jobRoleFilter.category.JOB_11.GAME_ARTIST' },
  { code: 'GAME_CLIENT_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_11.GAME_CLIENT_DEVELOPER' },
  { code: 'UNITY_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_11.UNITY_DEVELOPER' },
  { code: 'GAME_GRAPHIC_DESIGNER', label: 'filter:filter.jobRoleFilter.category.JOB_11.GAME_GRAPHIC_DESIGNER' },
  { code: 'GAME_SERVER_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_11.GAME_SERVER_DEVELOPER' },
  { code: 'MOBILE_GAME_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_11.MOBILE_GAME_DEVELOPER' },
  { code: 'UNREAL_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_11.UNREAL_DEVELOPER' },
]

export const FINANCE_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'INVESTMENT_BANKER', label: 'filter:filter.jobRoleFilter.category.JOB_12.INVESTMENT_BANKER' },
  { code: 'ASSET_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_12.ASSET_MANAGER' },
  { code: 'FINANCIAL_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_12.FINANCIAL_ENGINEER' },
]

export const MANUFACTURING_PRODUCTION_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'MACHINE_TECHNICIAN', label: 'filter.jobRoleFilter.category.JOB_13.MACHINE_TECHNICIAN' },
  { code: 'MANUFACTURING_TEST_ENGINEER', label: 'filter.jobRoleFilter.category.JOB_13.MANUFACTURING_TEST_ENGINEER' },
  { code: 'MANUFACTURING_ENGINEER', label: 'filter.jobRoleFilter.category.JOB_13.MANUFACTURING_ENGINEER' },
  { code: 'MANUFACTURING_CHEMIST', label: 'filter.jobRoleFilter.category.JOB_13.MANUFACTURING_CHEMIST' },
  {
    code: 'SEMICONDUCTOR_DISPLAY_ENGINEER',
    label: 'filter:filter.jobRoleFilter.category.JOB_13.SEMICONDUCTOR_DISPLAY_ENGINEER',
  },
  { code: 'PRODUCTION_WORKER', label: 'filter:filter.jobRoleFilter.category.JOB_13.PRODUCTION_WORKER' },
]

export const EDUCATION_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'INSTRUCTOR', label: 'filter:filter.jobRoleFilter.category.JOB_14.INSTRUCTOR' },
  { code: 'LANGUAGE_EDUCATOR', label: 'filter:filter.jobRoleFilter.category.JOB_14.LANGUAGE_EDUCATOR' },
]

export const HEALTHCARE_PHARMA_BIO_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'BIOTECH_RESEARCHER', label: 'filter:filter.jobRoleFilter.category.JOB_15.BIOTECH_RESEARCHER' },
  { code: 'CLINICAL_RESEARCHER', label: 'filter:filter.jobRoleFilter.category.JOB_15.CLINICAL_RESEARCHER' },
  { code: 'MICROBIOLOGIST', label: 'filter:filter.jobRoleFilter.category.JOB_15.MICROBIOLOGIST' },
  { code: 'HOSPITAL_COORDINATOR', label: 'filter:filter.jobRoleFilter.category.JOB_15.HOSPITAL_COORDINATOR' },
  { code: 'PHARMACEUTICAL_CHEMIST', label: 'filter:filter.jobRoleFilter.category.JOB_15.PHARMACEUTICAL_CHEMIST' },
  { code: 'GENETIC_ENGINEER', label: 'filter:filter.jobRoleFilter.category.JOB_15.GENETIC_ENGINEER' },
  { code: 'CAREGIVER', label: 'filter:filter.jobRoleFilter.category.JOB_15.CAREGIVER' },
]

export const LOGISTICS_TRADE_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'LOGISTICS_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_16.LOGISTICS_MANAGER' },
  { code: 'LOGISTICS_ANALYST', label: 'filter:filter.jobRoleFilter.category.JOB_16.LOGISTICS_ANALYST' },
  { code: 'EXPORT_IMPORT_OFFICER', label: 'filter:filter.jobRoleFilter.category.JOB_16.EXPORT_IMPORT_OFFICER' },
  { code: 'TRADE_OFFICER', label: 'filter:filter.jobRoleFilter.category.JOB_16.TRADE_OFFICER' },
  { code: 'BUYER_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_16.BUYER_MANAGER' },
  { code: 'AIR_TRANSPORT_AGENT', label: 'filter:filter.jobRoleFilter.category.JOB_16.AIR_TRANSPORT_AGENT' },
  { code: 'MARINE_TRANSPORT_AGENT', label: 'filter:filter.jobRoleFilter.category.JOB_16.MARINE_TRANSPORT_AGENT' },
  { code: 'LOGISTICS_FIELD_WORKER', label: 'filter:filter.jobRoleFilter.category.JOB_16.LOGISTICS_FIELD_WORKER' },
]

export const FOOD_SERVICE_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'FOOD_SERVICE_WORKER', label: 'filter:filter.jobRoleFilter.category.JOB_17.FOOD_SERVICE_WORKER' },
  { code: 'CHEF', label: 'filter:filter.jobRoleFilter.category.JOB_17.CHEF' },
  { code: 'MENU_DEVELOPER', label: 'filter:filter.jobRoleFilter.category.JOB_17.MENU_DEVELOPER' },
  { code: 'BARTENDER', label: 'filter:filter.jobRoleFilter.category.JOB_17.BARTENDER' },
  { code: 'SOMMELIER', label: 'filter:filter.jobRoleFilter.category.JOB_17.SOMMELIER' },
  { code: 'FOOD_STYLIST', label: 'filter:filter.jobRoleFilter.category.JOB_17.FOOD_STYLIST' },
]

export const CONSTRUCTION_FACILITIES_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'ARCHITECT', label: 'filter:filter.jobRoleFilter.category.JOB_18.ARCHITECT' },
  { code: 'CONSTRUCTION_SUPERVISOR', label: 'filter:filter.jobRoleFilter.category.JOB_18.CONSTRUCTION_SUPERVISOR' },
  { code: 'MAINTENANCE_MANAGER', label: 'filter:filter.jobRoleFilter.category.JOB_18.MAINTENANCE_MANAGER' },
  { code: 'CONSTRUCTION_WORKER', label: 'filter:filter.jobRoleFilter.category.JOB_18.CONSTRUCTION_WORKER' },
  { code: 'WELDER', label: 'filter:filter.jobRoleFilter.category.JOB_18.WELDER' },
  { code: 'CARPENTER', label: 'filter:filter.jobRoleFilter.category.JOB_18.CARPENTER' },
  {
    code: 'HEAVY_EQUIPMENT_TECHNICIAN',
    label: 'filter:filter.jobRoleFilter.category.JOB_18.HEAVY_EQUIPMENT_TECHNICIAN',
  },
]

export const ENTERTAINMENT_LIST: { code: JobRoleType; label: string }[] = [
  { code: 'MODEL', label: 'filter:filter.jobRoleFilter.category.JOB_19.MODEL' },
  { code: 'ACTOR', label: 'filter:filter.jobRoleFilter.category.JOB_19.ACTOR' },
  { code: 'SHOW_HOST', label: 'filter:filter.jobRoleFilter.category.JOB_19.SHOW_HOST' },
]

type SubCategoryMap = {
  [K in JobCategoryType]?: typeof IT_DEVELOPMENT_LIST
}

export const SUB_CATEGORY_MAP: SubCategoryMap = {
  IT_DEVELOPMENT: IT_DEVELOPMENT_LIST,
  BUSINESS_MANAGEMENT: BUSINESS_MANAGEMENT_LIST,
  MARKETING_ADVERTISING: MARKETING_ADVERTISING_LIST,
  DESIGN: DESIGN_LIST,
  SALES: SALE_LIST,
  CUSTOMER_SERVICE_RETAIL: CUSTOMER_SERVICE_RETAIL_LIST,
  TRANSLATION_INTERPRETATION: TRANSLATION_INTERPRETATION_LIST,
  MEDIA: MEDIA_LIST,
  ENGINEERING_DESIGN: ENGINEERING_DESIGN_LIST,
  HR: HR_LIST,
  GAME_PRODUCTION: GAME_PRODUCTION_LIST,
  FINANCE: FINANCE_LIST,
  MANUFACTURING_PRODUCTION: MANUFACTURING_PRODUCTION_LIST,
  EDUCATION: EDUCATION_LIST,
  HEALTHCARE_PHARMA_BIO: HEALTHCARE_PHARMA_BIO_LIST,
  LOGISTICS_TRADE: LOGISTICS_TRADE_LIST,
  FOOD_BEVERAGE: FOOD_SERVICE_LIST,
  CONSTRUCTION_FACILITIES: CONSTRUCTION_FACILITIES_LIST,
  ENTERTAINMENT: ENTERTAINMENT_LIST,
}

export const getJobRoleList = (category: JobCategoryType | undefined) => {
  if (!category) return []
  return SUB_CATEGORY_MAP[category] || []
}

export const getJobRoleLabel = (jobRole: JobRoleType | undefined | string) => {
  switch (jobRole) {
    // IT / 개발
    case 'SOFTWARE_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.SOFTWARE_ENGINEER'
    case 'WEB_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.WEB_DEVELOPER'
    case 'BACKEND_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.BACKEND_DEVELOPER'
    case 'FRONTEND_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.FRONTEND_DEVELOPER'
    case 'JAVA_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.JAVA_DEVELOPER'
    case 'C_CPP_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.C_CPP_DEVELOPER'
    case 'PYTHON_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.PYTHON_DEVELOPER'
    case 'MACHINE_LEARNING_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.MACHINE_LEARNING_ENGINEER'
    case 'DEVOPS_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.DEVOPS_ENGINEER'
    case 'DATA_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.DATA_ENGINEER'
    case 'NODEJS_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.NODEJS_DEVELOPER'
    case 'SYSTEM_NETWORK_ADMIN':
      return 'filter:filter.jobRoleFilter.category.JOB_1.SYSTEM_NETWORK_ADMIN'
    case 'ANDROID_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.ANDROID_DEVELOPER'
    case 'IOS_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.IOS_DEVELOPER'
    case 'EMBEDDED_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.EMBEDDED_DEVELOPER'
    case 'TECH_SUPPORT':
      return 'filter:filter.jobRoleFilter.category.JOB_1.TECH_SUPPORT'
    case 'QA_TEST_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.QA_TEST_ENGINEER'
    case 'DATA_SCIENTIST':
      return 'filter:filter.jobRoleFilter.category.JOB_1.DATA_SCIENTIST'
    case 'SECURITY_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.SECURITY_ENGINEER'
    case 'BIGDATA_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.BIGDATA_ENGINEER'
    case 'HARDWARE_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.HARDWARE_ENGINEER'
    case 'BLOCKCHAIN_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.BLOCKCHAIN_ENGINEER'
    case 'CROSS_PLATFORM_APP_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.CROSS_PLATFORM_APP_DEVELOPER'
    case 'DBA':
      return 'filter:filter.jobRoleFilter.category.JOB_1.DBA'
    case 'PHP_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.PHP_DEVELOPER'
    case 'DOTNET_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.DOTNET_DEVELOPER'
    case 'GRAPHICS_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.GRAPHICS_ENGINEER'
    case 'AR_VR_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.AR_VR_ENGINEER'
    case 'RUBY_ON_RAILS_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_1.RUBY_ON_RAILS_DEVELOPER'

    // 기획 / PM / 비즈니스
    case 'PM_PO':
      return 'filter:filter.jobRoleFilter.category.JOB_2.PM_PO'
    case 'PROJECT_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_2.PROJECT_MANAGER'
    case 'STRATEGY_PLANNER':
      return 'filter:filter.jobRoleFilter.category.JOB_2.STRATEGY_PLANNER'
    case 'OPERATIONS_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_2.OPERATIONS_MANAGER'
    case 'DATA_ANALYST':
      return 'filter:filter.jobRoleFilter.category.JOB_2.DATA_ANALYST'
    case 'BRAND_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_2.BRAND_MANAGER'
    case 'GLOBAL_BUSINESS_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_2.GLOBAL_BUSINESS_DEVELOPER'
    case 'CONSULTANT':
      return 'filter:filter.jobRoleFilter.category.JOB_2.CONSULTANT'
    case 'PURCHASING_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_2.PURCHASING_MANAGER'
    case 'BUSINESS_INNOVATOR':
      return 'filter:filter.jobRoleFilter.category.JOB_2.BUSINESS_INNOVATOR'
    case 'AGILE_COACH':
      return 'filter:filter.jobRoleFilter.category.JOB_2.AGILE_COACH'

    // 마케팅
    case 'MARKETING_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.MARKETING_MANAGER'
    case 'DIGITAL_MARKETER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.DIGITAL_MARKETER'
    case 'CONTENT_MARKETER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.CONTENT_MARKETER'
    case 'PERFORMANCE_MARKETER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.PERFORMANCE_MARKETER'
    case 'BRAND_MARKETER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.BRAND_MARKETER'
    case 'GLOBAL_MARKETING_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.GLOBAL_MARKETING_MANAGER'
    case 'SNS_MARKETER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.SNS_MARKETER'
    case 'PR_SPECIALIST':
      return 'filter:filter.jobRoleFilter.category.JOB_3.PR_SPECIALIST'
    case 'GROWTH_HACKER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.GROWTH_HACKER'
    case 'MARKETING_DIRECTOR':
      return 'filter:filter.jobRoleFilter.category.JOB_3.MARKETING_DIRECTOR'
    case 'MARKET_RESEARCHER':
      return 'filter:filter.jobRoleFilter.category.JOB_3.MARKET_RESEARCHER'

    // 디자인
    case 'UI_UX_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.UI_UX_DESIGNER'
    case 'WEB_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.WEB_DESIGNER'
    case 'GRAPHIC_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.GRAPHIC_DESIGNER'
    case 'SPACE_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.SPACE_DESIGNER'
    case 'MOTION_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.MOTION_DESIGNER'
    case 'FASHION_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.FASHION_DESIGNER'
    case 'ART_DIRECTOR':
      return 'filter:filter.jobRoleFilter.category.JOB_4.ART_DIRECTOR'
    case 'INDUSTRIAL_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.INDUSTRIAL_DESIGNER'
    case 'FURNITURE_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.FURNITURE_DESIGNER'
    case 'LANDSCAPE_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_4.LANDSCAPE_DESIGNER'

    // 영업 / CS / 유통
    case 'INTERNATIONAL_SALES':
      return 'filter:filter.jobRoleFilter.category.JOB_5.INTERNATIONAL_SALES'
    case 'TECHNICAL_SALES':
      return 'filter:filter.jobRoleFilter.category.JOB_5.TECHNICAL_SALES'
    case 'SOLUTION_CONSULTANT':
      return 'filter:filter.jobRoleFilter.category.JOB_5.SOLUTION_CONSULTANT'
    case 'MEDIA_SALES':
      return 'filter:filter.jobRoleFilter.category.JOB_5.MEDIA_SALES'
    case 'CUSTOMER_SUCCESS_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_5.CUSTOMER_SUCCESS_MANAGER'
    case 'SALES_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_5.SALES_ENGINEER'

    case 'GLOBAL_CS_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_6.GLOBAL_CS_MANAGER'
    case 'RETAIL_MD':
      return 'filter:filter.jobRoleFilter.category.JOB_6.RETAIL_MD'
    case 'CUSTOMER_SUPPORT':
      return 'filter:filter.jobRoleFilter.category.JOB_6.CUSTOMER_SUPPORT'
    case 'FASHION_MD':
      return 'filter:filter.jobRoleFilter.category.JOB_6.FASHION_MD'
    case 'CRM_SPECIALIST':
      return 'filter:filter.jobRoleFilter.category.JOB_6.CRM_SPECIALIST'
    case 'RECEPTIONIST':
      return 'filter:filter.jobRoleFilter.category.JOB_6.RECEPTIONIST'
    case 'TRAVEL_AGENT':
      return 'filter:filter.jobRoleFilter.category.JOB_6.TRAVEL_AGENT'
    case 'FLIGHT_ATTENDANT':
      return 'filter:filter.jobRoleFilter.category.JOB_6.FLIGHT_ATTENDANT'
    case 'STORE_CLERK':
      return 'filter:filter.jobRoleFilter.category.JOB_6.STORE_CLERK'
    case 'TOURISM_WORKER':
      return 'filter:filter.jobRoleFilter.category.JOB_6.TOURISM_WORKER'

    // 7. 통/번역
    case 'INTERPRETER':
      return 'filter:filter.jobRoleFilter.category.JOB_7.INTERPRETER'
    case 'TRANSLATOR':
      return 'filter:filter.jobRoleFilter.category.JOB_7.TRANSLATOR'
    case 'LOCALIZATION_SPECIALIST':
      return 'filter:filter.jobRoleFilter.category.JOB_7.LOCALIZATION_SPECIALIST'

    // 8. 미디어
    case 'CONTENT_CREATOR':
      return 'filter:filter.jobRoleFilter.category.JOB_8.CONTENT_CREATOR'
    case 'VIDEO_EDITOR':
      return 'filter:filter.jobRoleFilter.category.JOB_8.VIDEO_EDITOR'
    case 'VIDEO_PRODUCER':
      return 'filter:filter.jobRoleFilter.category.JOB_8.VIDEO_PRODUCER'
    case 'WRITER':
      return 'filter:filter.jobRoleFilter.category.JOB_8.WRITER'
    case 'PHOTOGRAPHER':
      return 'filter:filter.jobRoleFilter.category.JOB_8.PHOTOGRAPHER'
    case 'JOURNALIST':
      return 'filter:filter.jobRoleFilter.category.JOB_8.JOURNALIST'
    case 'CURATOR':
      return 'filter:filter.jobRoleFilter.category.JOB_8.CURATOR'

    // 9. 엔지니어링 / 설계
    case 'ELECTRICAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.ELECTRICAL_ENGINEER'
    case 'ROBOTICS_AUTOMATION_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.ROBOTICS_AUTOMATION_ENGINEER'
    case 'MECHANICAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.MECHANICAL_ENGINEER'
    case 'CAD_3D_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.CAD_3D_DESIGNER'
    case 'ELECTRIC_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.ELECTRIC_ENGINEER'
    case 'CONTROL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.CONTROL_ENGINEER'
    case 'PRODUCT_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.PRODUCT_ENGINEER'
    case 'ELECTROMECHANICAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.ELECTROMECHANICAL_ENGINEER'
    case 'EQUIPMENT_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.EQUIPMENT_ENGINEER'
    case 'QA_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.QA_ENGINEER'
    case 'INDUSTRIAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.INDUSTRIAL_ENGINEER'
    case 'RF_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.RF_ENGINEER'
    case 'CHEMICAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.CHEMICAL_ENGINEER'
    case 'AEROSPACE_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.AEROSPACE_ENGINEER'
    case 'IC_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.IC_ENGINEER'
    case 'MATERIAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.MATERIAL_ENGINEER'
    case 'PLANT_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.PLANT_ENGINEER'
    case 'PLASTIC_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.PLASTIC_ENGINEER'
    case 'QC_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.QC_ENGINEER'
    case 'STRUCTURAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.STRUCTURAL_ENGINEER'
    case 'CONSTRUCTION_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.CONSTRUCTION_ENGINEER'
    case 'CIVIL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.CIVIL_ENGINEER'
    case 'ENVIRONMENTAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.ENVIRONMENTAL_ENGINEER'
    case 'PRODUCTION_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.PRODUCTION_ENGINEER'
    case 'RND_RESEARCHER':
      return 'filter:filter.jobRoleFilter.category.JOB_9.RND_RESEARCHER'

    // 10. HR / 교육
    case 'GLOBAL_HR_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_10.GLOBAL_HR_MANAGER'
    case 'RECRUITER':
      return 'filter:filter.jobRoleFilter.category.JOB_10.RECRUITER'
    case 'HR_CONSULTANT':
      return 'filter:filter.jobRoleFilter.category.JOB_10.HR_CONSULTANT'
    case 'TECH_TRAINER':
      return 'filter:filter.jobRoleFilter.category.JOB_10.TECH_TRAINER'
    case 'INHOUSE_TRAINER':
      return 'filter:filter.jobRoleFilter.category.JOB_10.INHOUSE_TRAINER'

    // 11. 게임 제작
    case 'GAME_PLANNER':
      return 'filter:filter.jobRoleFilter.category.JOB_11.GAME_PLANNER'
    case 'GAME_ARTIST':
      return 'filter:filter.jobRoleFilter.category.JOB_11.GAME_ARTIST'
    case 'GAME_CLIENT_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_11.GAME_CLIENT_DEVELOPER'
    case 'UNITY_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_11.UNITY_DEVELOPER'
    case 'GAME_GRAPHIC_DESIGNER':
      return 'filter:filter.jobRoleFilter.category.JOB_11.GAME_GRAPHIC_DESIGNER'
    case 'GAME_SERVER_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_11.GAME_SERVER_DEVELOPER'
    case 'MOBILE_GAME_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_11.MOBILE_GAME_DEVELOPER'
    case 'UNREAL_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_11.UNREAL_DEVELOPER'

    // 12. 금융
    case 'INVESTMENT_BANKER':
      return 'filter:filter.jobRoleFilter.category.JOB_12.INVESTMENT_BANKER'
    case 'ASSET_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_12.ASSET_MANAGER'
    case 'FINANCIAL_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_12.FINANCIAL_ENGINEER'

    // 13. 제조/생산
    case 'MACHINE_TECHNICIAN':
      return 'filter:filter.jobRoleFilter.category.JOB_13.MACHINE_TECHNICIAN'
    case 'MANUFACTURING_TEST_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_13.MANUFACTURING_TEST_ENGINEER'
    case 'MANUFACTURING_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_13.MANUFACTURING_ENGINEER'
    case 'MANUFACTURING_CHEMIST':
      return 'filter:filter.jobRoleFilter.category.JOB_13.MANUFACTURING_CHEMIST'
    case 'SEMICONDUCTOR_DISPLAY_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_13.SEMICONDUCTOR_DISPLAY_ENGINEER'
    case 'PRODUCTION_WORKER':
      return 'filter:filter.jobRoleFilter.category.JOB_13.PRODUCTION_WORKER'

    // 14. 교육
    case 'INSTRUCTOR':
      return 'filter:filter.jobRoleFilter.category.JOB_14.INSTRUCTOR'
    case 'LANGUAGE_EDUCATOR':
      return 'filter:filter.jobRoleFilter.category.JOB_14.LANGUAGE_EDUCATOR'

    // 15. 의료/제약/바이오
    case 'BIOTECH_RESEARCHER':
      return 'filter:filter.jobRoleFilter.category.JOB_15.BIOTECH_RESEARCHER'
    case 'CLINICAL_RESEARCHER':
      return 'filter:filter.jobRoleFilter.category.JOB_15.CLINICAL_RESEARCHER'
    case 'MICROBIOLOGIST':
      return 'filter:filter.jobRoleFilter.category.JOB_15.MICROBIOLOGIST'
    case 'HOSPITAL_COORDINATOR':
      return 'filter:filter.jobRoleFilter.category.JOB_15.HOSPITAL_COORDINATOR'
    case 'PHARMACEUTICAL_CHEMIST':
      return 'filter:filter.jobRoleFilter.category.JOB_15.PHARMACEUTICAL_CHEMIST'
    case 'GENETIC_ENGINEER':
      return 'filter:filter.jobRoleFilter.category.JOB_15.GENETIC_ENGINEER'
    case 'CAREGIVER':
      return 'filter:filter.jobRoleFilter.category.JOB_15.CAREGIVER'

    // 16. 물류 / 무역
    case 'LOGISTICS_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_16.LOGISTICS_MANAGER'
    case 'LOGISTICS_ANALYST':
      return 'filter:filter.jobRoleFilter.category.JOB_16.LOGISTICS_ANALYST'
    case 'EXPORT_IMPORT_OFFICER':
      return 'filter:filter.jobRoleFilter.category.JOB_16.EXPORT_IMPORT_OFFICER'
    case 'TRADE_OFFICER':
      return 'filter.jobRoleFilter.category.JOB_16.TRADE_OFFICER'
    case 'BUYER_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_16.BUYER_MANAGER'
    case 'AIR_TRANSPORT_AGENT':
      return 'filter:filter.jobRoleFilter.category.JOB_16.AIR_TRANSPORT_AGENT'
    case 'MARINE_TRANSPORT_AGENT':
      return 'filter:filter.jobRoleFilter.category.JOB_16.MARINE_TRANSPORT_AGENT'
    case 'LOGISTICS_FIELD_WORKER':
      return 'filter:filter.jobRoleFilter.category.JOB_16.LOGISTICS_FIELD_WORKER'

    // 17. 외식/푸드 서비스
    case 'FOOD_SERVICE_WORKER':
      return 'filter:filter.jobRoleFilter.category.JOB_17.FOOD_SERVICE_WORKER'
    case 'CHEF':
      return 'filter:filter.jobRoleFilter.category.JOB_17.CHEF'
    case 'MENU_DEVELOPER':
      return 'filter:filter.jobRoleFilter.category.JOB_17.MENU_DEVELOPER'
    case 'BARTENDER':
      return 'filter:filter.jobRoleFilter.category.JOB_17.BARTENDER'
    case 'SOMMELIER':
      return 'filter:filter.jobRoleFilter.category.JOB_17.SOMMELIER'
    case 'FOOD_STYLIST':
      return 'filter:filter.jobRoleFilter.category.JOB_17.FOOD_STYLIST'

    // 18. 건설/시설
    case 'ARCHITECT':
      return 'filter:filter.jobRoleFilter.category.JOB_18.ARCHITECT'
    case 'CONSTRUCTION_SUPERVISOR':
      return 'filter:filter.jobRoleFilter.category.JOB_18.CONSTRUCTION_SUPERVISOR'
    case 'MAINTENANCE_MANAGER':
      return 'filter:filter.jobRoleFilter.category.JOB_18.MAINTENANCE_MANAGER'
    case 'CONSTRUCTION_WORKER':
      return 'filter:filter.jobRoleFilter.category.JOB_18.CONSTRUCTION_WORKER'
    case 'WELDER':
      return 'filter:filter.jobRoleFilter.category.JOB_18.WELDER'
    case 'CARPENTER':
      return 'filter:filter.jobRoleFilter.category.JOB_18.CARPENTER'
    case 'HEAVY_EQUIPMENT_TECHNICIAN':
      return 'filter:filter.jobRoleFilter.category.JOB_18.HEAVY_EQUIPMENT_TECHNICIAN'

    // 19. 엔터테인먼트
    case 'MODEL':
      return 'filter:filter.jobRoleFilter.category.JOB_19.MODEL'
    case 'ACTOR':
      return 'filter:filter.jobRoleFilter.category.JOB_19.ACTOR'
    case 'SHOW_HOST':
      return 'filter:filter.jobRoleFilter.category.JOB_19.SHOW_HOST'

    default:
      return 'filter:filter.jobRoleFilter.category.JOB_19.unknown'
  }
}
export function getLanguageLabel(lang: LanguageType): string {
  switch (lang) {
    case 'ENGLISH':
      return 'filter:filter.requiredLanguageFilter.content.ENGLISH'
    case 'CHINESE':
      return 'filter:filter.requiredLanguageFilter.content.CHINESE'
    case 'HINDI':
      return 'filter:filter.requiredLanguageFilter.content.HINDI'
    case 'SPANISH':
      return 'filter:filter.requiredLanguageFilter.content.SPANISH'
    case 'FRENCH':
      return 'filter:filter.requiredLanguageFilter.content.FRENCH'
    case 'ARABIC':
      return 'filter:filter.requiredLanguageFilter.content.ARABIC'
    case 'BENGALI':
      return 'filter:filter.requiredLanguageFilter.content.BENGALI'
    case 'PORTUGUESE':
      return 'filter:filter.requiredLanguageFilter.content.PORTUGUESE'
    case 'RUSSIAN':
      return 'filter:filter.requiredLanguageFilter.content.RUSSIAN'
    case 'URDU':
      return 'filter:filter.requiredLanguageFilter.content.URDU'
    case 'INDONESIAN':
      return 'filter:filter.requiredLanguageFilter.content.INDONESIAN'
    case 'GERMAN':
      return 'filter:filter.requiredLanguageFilter.content.GERMAN'
    case 'JAPANESE':
      return 'filter:filter.requiredLanguageFilter.content.JAPANESE'
    case 'SWAHILI':
      return 'filter:filter.requiredLanguageFilter.content.SWAHILI'
    case 'MARATHI':
      return 'filter:filter.requiredLanguageFilter.content.MARATHI'
    case 'TELUGU':
      return 'filter:filter.requiredLanguageFilter.content.TELUGU'
    case 'TURKISH':
      return 'filter:filter.requiredLanguageFilter.content.TURKISH'
    case 'TAMIL':
      return 'filter:filter.requiredLanguageFilter.content.TAMIL'
    case 'VIETNAMESE':
      return 'filter:filter.requiredLanguageFilter.content.VIETNAMESE'
    case 'KOREAN':
      return 'filter:filter.requiredLanguageFilter.content.KOREAN'
    case 'ITALIAN':
      return 'filter:filter.requiredLanguageFilter.content.ITALIAN'
    case 'PERSIAN':
      return 'filter:filter.requiredLanguageFilter.content.PERSIAN'
    case 'POLISH':
      return 'filter:filter.requiredLanguageFilter.content.POLISH'
    case 'UKRAINIAN':
      return 'filter:filter.requiredLanguageFilter.content.UKRAINIAN'
    default:
      return ''
  }
}

export const getApplicationMethodLabel = (applicationMethod: ApplicationMethodType | undefined | null) => {
  switch (applicationMethod) {
    case 'EMAIL':
      return 'jobPost:detail.jobDetail.applicationMethod.EMAIL'
    case 'PHONE_SMS':
      return 'jobPost:detail.jobDetail.applicationMethod.PHONE_SMS'
    default:
      return 'jobPost:detail.jobDetail.applicationMethod.WEBSITE'
  }
}

export const changeCompanyTypeEnumToKor = (companyEnumType: CompanyType | null | undefined) => {
  switch (companyEnumType) {
    case 'LARGE_CORPORATION':
      return 'jobPost:detail.companyInfo.companyType.LARGE_CORPORATION'
    case 'MIDSIZE_COMPANY':
      return 'jobPost:detail.companyInfo.companyType.MIDSIZE_COMPANY'
    case 'SMALL_MEDIUM_ENTERPRISE':
      return 'jobPost:detail.companyInfo.companyType.SMALL_MEDIUM_ENTERPRISE'
    case 'MICRO_BUSINESS':
      return 'jobPost:detail.companyInfo.companyType.MICRO_BUSINESS'
    case 'SOLE_PROPRIETOR':
      return 'jobPost:detail.companyInfo.companyType.SOLE_PROPRIETOR'
    case 'CORPORATION':
      return 'jobPost:detail.companyInfo.companyType.CORPORATION'
    case 'SOCIAL_ENTERPRISE':
      return 'jobPost:detail.companyInfo.companyType.SOCIAL_ENTERPRISE'
    case 'COOPERATIVE':
      return 'jobPost:detail.companyInfo.companyType.COOPERATIVE'
    default:
      return 'jobPost:detail.companyInfo.companyType.ETC'
  }
}

export const changeEnumToKorWorkTypeLabel = (workType: WorkType | undefined | null) => {
  switch (workType) {
    case 'ONSITE':
      return 'jobPost:detail.workConditions.workType.ONSITE'
    case 'HYBRID':
      return 'jobPost:detail.workConditions.workType.HYBRID'
    case 'REMOTE':
      return 'jobPost:detail.workConditions.workType.REMOTE'
    default:
      return 'jobPost:detail.workConditions.workType.ETC'
  }
}

export const changeEnumToKorWorkDaysTypeLabel = (
  workDaysType: WorkDayPatternType | undefined | null | WorkingDaysType
) => {
  switch (workDaysType) {
    case 'WEEKDAYS':
      return 'jobPost:detail.workConditions.workDaysType.WEEKDAYS'
    case 'WEEKENDS':
      return 'jobPost:detail.workConditions.workDaysType.WEEKENDS'
    case 'FULL_WEEK':
      return 'jobPost:detail.workConditions.workDaysType.FULL_WEEK'
    case 'SIX_DAYS':
      return 'jobPost:detail.workConditions.workDaysType.SIX_DAYS'
    case 'MONDAY':
      return 'jobPost:detail.workConditions.workDaysType.MONDAY'
    case 'TUESDAY':
      return 'jobPost:detail.workConditions.workDaysType.TUESDAY'
    case 'WEDNESDAY':
      return 'jobPost:detail.workConditions.workDaysType.WEDNESDAY'
    case 'THURSDAY':
      return 'jobPost:detail.workConditions.workDaysType.THURSDAY'
    case 'FRIDAY':
      return 'jobPost:detail.workConditions.workDaysType.FRIDAY'
    case 'SATURDAY':
      return 'jobPost:detail.workConditions.workDaysType.SATURDAY'
    case 'SUNDAY':
      return 'jobPost:detail.workConditions.workDaysType.SUNDAY'
    default:
      return 'jobPost:detail.workConditions.workDaysType.ETC'
  }
}

export const convertEnumToKorSalaryTypeLabel = (category: SalaryEnumType): string => {
  switch (category) {
    case 'ANNUAL':
      return 'jobPost:detail.workConditions.salaryType.ANNUAL'
    case 'DAILY':
      return 'jobPost:detail.workConditions.salaryType.DAILY'
    case 'WEEKLY':
      return 'jobPost:detail.workConditions.salaryType.WEEKLY'
    case 'HOURLY':
      return 'jobPost:detail.workConditions.salaryType.HOURLY'
    case 'MONTHLY':
      return 'jobPost:detail.workConditions.salaryType.MONTHLY'
    default:
      return 'jobPost:detail.workConditions.salaryType.ETC'
  }
}

export const getJobCategoryLabel = (code: string): string => {
  const category = JOB_CATEGORY_LIST.find((cat) => cat.code === code)
  return category?.label || 'filter:filter.unknown'
}

export const getVisaLabel = (code: string | undefined): string => {
  const visa = VISA_LIST.find((v) => v.code === code)
  return visa?.i18nKey || 'filter:filter.unknown'
}

export const getNationality = (code: string | undefined): string => {
  const nationality = NATIONALITY_LIST.find((v) => v.code === code)
  return nationality?.label || 'filter:filter.unknown'
}
export const getRegionLabel = (code: string): string => {
  const visa = WORK_REGIONS.find((v) => v.code === code)
  return visa?.label || '알 수 없음'
}

export const getSelectedCategoriesFromRoles = (selectedJobRoles: JobRoleType[] | undefined): JobCategoryType[] => {
  if (!selectedJobRoles || selectedJobRoles.length === 0) return []

  const selectedCategories = new Set<JobCategoryType>()

  selectedJobRoles.forEach((role) => {
    Object.entries(SUB_CATEGORY_MAP).forEach(([category, roles]) => {
      if (roles.some((r) => r.code === role)) {
        selectedCategories.add(category as JobCategoryType)
      }
    })
  })

  return Array.from(selectedCategories)
}
