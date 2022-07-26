export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    birthday: string
    age: number
}


export interface Support {
    url: string
    text: string
}

export interface ResponseUsers {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
    support: Support
}