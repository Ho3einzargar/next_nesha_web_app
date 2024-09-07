import { ApiConfigGlobally } from "@/ApiConfig";
import { responseModelRecentFields } from "@/app/Components/home/api/homeApi";
import { apiMethod } from "@/app/helper/Api/apiMethod";
import { roadMapApi } from "@/app/helper/Api/roadMapApi/roadMapApi";

export const getFields_search = () => apiMethod.get<responseModelRecentFields[]>(`${ApiConfigGlobally}/${roadMapApi.softwares.fields_search}`, { responseType: 'json' });