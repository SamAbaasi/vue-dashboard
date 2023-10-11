export interface Toast {
    id: string;
    show: boolean;
    message: string;
    variant?: string;
    boldMessage?: string;
    timerId: number | null;
}