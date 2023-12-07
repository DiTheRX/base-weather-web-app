export interface IAxiosResult {
    error?: object,
    temp_c: number,
    status: number
}
export interface AxiosService {
    send(city: string, language: string): Promise<IAxiosResult>;
}
