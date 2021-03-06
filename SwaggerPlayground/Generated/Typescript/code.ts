/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.4.2.0 (NJsonSchema v10.1.11.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

export class AnimalClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl ? baseUrl : "https://localhost:44326";
    }

    get(type: string | null | undefined): Promise<Animal> {
        let url_ = this.baseUrl + "/api/Animal?";
        if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: Response): Promise<Animal> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = Animal.fromJS(resultData200);
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Animal>(<any>null);
    }
}

export class Animal implements IAnimal {
    age!: number;

    protected _discriminator: string;

    constructor(data?: IAnimal) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        this._discriminator = "Animal";
    }

    init(_data?: any) {
        if (_data) {
            this.age = _data["age"];
        }
    }

    static fromJS(data: any): Animal {
        data = typeof data === 'object' ? data : {};
        if (data["discriminator"] === "Dog") {
            let result = new Dog();
            result.init(data);
            return result;
        }
        let result = new Animal();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["discriminator"] = this._discriminator;
        data["age"] = this.age;
        return data;
    }
}

export interface IAnimal {
    age: number;
}

export class Dog extends Animal implements IDog {
    bark?: string | undefined;

    constructor(data?: IDog) {
        super(data);
        this._discriminator = "Dog";
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.bark = _data["bark"];
        }
    }

    static fromJS(data: any): Dog {
        data = typeof data === 'object' ? data : {};
        let result = new Dog();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["bark"] = this.bark;
        super.toJSON(data);
        return data;
    }
}

export interface IDog extends IAnimal {
    bark?: string | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}