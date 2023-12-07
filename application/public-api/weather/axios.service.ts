import {AxiosService as AS, IAxiosResult} from "../../../component/weather/axios.service";
import axios from 'axios';

export class AxiosService implements AS {
    private readonly token: string;
    private readonly url: string;
    constructor(url: string, token: string) {
        this.token = token;
        this.url = url;
    }
    async send(city: string, language: string): Promise<IAxiosResult> {
        const params = {
            q: city,
            key: this.token,
            lang: language
        };

        return await axios.get(this.url, { params })
            .then(response => {
                return {
                    temp_c:response.data.current.temp_c,
                    status:response.status
                }
            })
            .catch(error => {
                return {
                    error: error.response.data,
                    status: error.response.status,
                    temp_c: null
                }
            });

    }
}
