import { ApiConfigGlobally } from '@/ApiConfig';
import { apiMethod } from '@/app/helper/Api/apiMethod';
import { roadMapApi } from '@/app/helper/Api/roadMapApi/roadMapApi';

export interface mainResponse<T> {
    data: T;
    code: string;
}

export interface searchResponse<T> {
    highest_count: number;
    next: string;
    overall_total: number;
    previous: any;
    results: T
}


export const getSearchHome = (search: string) => apiMethod.get<searchResponse<{ Software: any[], Lab: any[], Field: any[] }>>(`${ApiConfigGlobally}/${roadMapApi.search}/?search=${search}`,{responseType:'json'});