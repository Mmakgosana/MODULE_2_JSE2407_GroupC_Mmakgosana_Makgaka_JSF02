// src/stores.js
import { writable } from 'svelte/store';

export const selectedCategory = writable('');
export const searchQuery = writable('');
export const sortOption = writable('default');