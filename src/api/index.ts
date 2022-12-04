export const API_BASE = "http://localhost:8080";

export const getUrl = (
    endpoint: "/" | "/student" | "/discipline",
    path: string,
    url_parameter?: string
) => {
    let url = `${API_BASE}${endpoint}${path}`;
    if (url_parameter) {
        url = `${url}/${url_parameter}`;
    }
    return url;
};

export type Discipline = {
    name: string;
    workload: number;
};

export type Student = {
    name: string;
    email: string;
    phone: string;
    birthday: Date;
    disciplines: Array<Discipline>;
};
