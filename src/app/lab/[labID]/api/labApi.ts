import { ApiConfigGlobally } from "@/ApiConfig";
import { apiMethod } from "@/app/helper/Api/apiMethod";
import { roadMapApi } from "@/app/helper/Api/roadMapApi/roadMapApi";

export class responseModelDetailLab {
    fields: responseModelFieldDetailLab[];
    lab_id: number
    lab_name: string
    number_of_softwares: number
    softwares: any[]
    constructor() {
        this.softwares = []
        this.lab_name = ''
        this.lab_id = 0
        this.number_of_softwares = 0
        this.fields = []
    }
}

export interface responseModelFieldDetailLab {
    id: number,
    name: string,
    number_of_softwares: number
}



export const getLabDetailList = (labID: any) => apiMethod.get<responseModelDetailLab>(`${ApiConfigGlobally}/${roadMapApi.labs.detail_lab}/${labID}`, { responseType: 'json' });