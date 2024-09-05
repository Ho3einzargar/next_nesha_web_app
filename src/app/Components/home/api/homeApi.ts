import { ApiConfigGlobally } from '@/ApiConfig';
import { apiMethod } from '@/app/helper/Api/apiMethod';
import { roadMapApi } from '@/app/helper/Api/roadMapApi/roadMapApi';

export interface mainResponse<T> {
    count: number,
    next: any,
    previous: any,
    results: T
}
export interface responseModelRecentFields {
    id: number,
    name: string,
    number_of_labs: number,
    number_of_softwares: number
}

export interface searchResponse<T> {
    highest_count: number;
    next: string;
    overall_total: number;
    previous: any;
    results: T
}



export const getSearchHome = (search: string) => apiMethod.get<searchResponse<{ Software: any[], Lab: any[], Field: any[] }>>(`${ApiConfigGlobally}/${roadMapApi.search}/?search=${search}`, { responseType: 'json' });
export const getFavoriteSoftwares = () => apiMethod.get<mainResponse<any[]>>(`${ApiConfigGlobally}/${roadMapApi.softwares.favorite_softwares}`, { responseType: 'json' });
export const getRecentFields = () => apiMethod.get<mainResponse<responseModelRecentFields[]>>(`${ApiConfigGlobally}/${roadMapApi.softwares.recent_fields}`, { responseType: 'json' });