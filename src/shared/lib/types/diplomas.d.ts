export interface IDiploma {
    id: string;
    title: string;
    description: string;
    image: string;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IDiplomasListMetadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IDiplomasPayload {
    data: IDiploma[];
    metadata: IDiplomasListMetadata;
}

export interface IDiplomasResponse {
    status: boolean;
    code: number;
    payload: IDiplomasPayload;
}
