import { ApiConfigGlobally } from "@/ApiConfig";
import { mainResponse } from "@/app/Components/home/api/homeApi";
import { apiMethod } from "@/app/helper/Api/apiMethod";
import { roadMapApi } from "@/app/helper/Api/roadMapApi/roadMapApi";

export const getLicenses = () => apiMethod.get<mainResponse<any[]>>(`${ApiConfigGlobally}/${roadMapApi.search_pro.licenses}/`, { responseType: 'json' });
export const getLabSearchPro = () => apiMethod.get<any[]>(`${ApiConfigGlobally}/${roadMapApi.search_pro.lab_search}`, { responseType: 'json' });
export const getPlatforms = () => apiMethod.get<mainResponse<any[]>>(`${ApiConfigGlobally}/${roadMapApi.search_pro.platforms}/`, { responseType: 'json' });
export const getSearchResult = () => apiMethod.get<any[]>(`${ApiConfigGlobally}/${roadMapApi.search_pro.result}/`, { responseType: 'json' });