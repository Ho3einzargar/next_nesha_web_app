import { ApiConfigGlobally } from "@/ApiConfig";
import { apiMethod } from "@/app/helper/Api/apiMethod";
import { roadMapApi } from "@/app/helper/Api/roadMapApi/roadMapApi";
import { responseModelFieldDetailLab } from "@/app/lab/[labID]/api/labApi";

export const getLabs_search = () => apiMethod.get<responseModelFieldDetailLab[]>(`${ApiConfigGlobally}/${roadMapApi.softwares.labs_search}`, { responseType: 'json' });