import { ApiConfigGlobally } from "@/ApiConfig";
import { apiMethod } from "@/app/helper/Api/apiMethod";
import { roadMapApi } from "@/app/helper/Api/roadMapApi/roadMapApi";




export class responseModelFieldDetail {
    field_id: number;
    field_name: string;
    number_of_labs: number;
    number_of_softwares: number;
    labs: responseModelFieldDetailLab[];
    constructor() {
        this.field_id = 0
        this.field_name = ''
        this.number_of_labs = 0
        this.number_of_softwares = 0
        this.labs = []
    }
}

export interface responseModelFieldDetailLab {
    id: number,
    name: string,
    number_of_softwares: number
}

export const getFieldDetailLabs = (fieldID: any) => apiMethod.get<responseModelFieldDetail>(`${ApiConfigGlobally}/${roadMapApi.softwares.recent_fields}${fieldID}`, { responseType: 'json' });