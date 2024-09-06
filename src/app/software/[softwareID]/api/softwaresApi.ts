import { ApiConfigGlobally } from "@/ApiConfig";
import { apiMethod } from "@/app/helper/Api/apiMethod";
import { roadMapApi } from "@/app/helper/Api/roadMapApi/roadMapApi";

export const getSoftwareDetail = (softID: any) => apiMethod.get<any>(`${ApiConfigGlobally}/${roadMapApi.softwares.software_detail}/${softID}`, { responseType: 'json' });
export const getCommentSoftware = (softID: any) => apiMethod.get<any>(`${ApiConfigGlobally}/${softID}/${roadMapApi.softwares.comment}`, { responseType: 'json' });