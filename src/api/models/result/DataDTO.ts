export interface DataDTO<T> {
    current: string,
    result: Partial<T>;
    results: Record<string, Partial<T>>;
}