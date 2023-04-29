import { twMerge } from 'tailwind-merge'

export const classNames = (...classes) => twMerge(classes.filter(Boolean).join(' '))